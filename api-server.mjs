// Cassie-Web/api-server.mjs
// Stats API — reads bot-published Cloudflare KV snapshots for GET /api/stats and SSE.

import { createServer } from 'http';
import { getFreshStatsSnapshot } from './server/cloudflareStats.js';

const PORT      = Number(process.env.STATS_API_PORT ?? 3001);

async function getStats() {
  return getFreshStatsSnapshot();
}

// ── SSE client registry ───────────────────────────────────────────────────────

/** @type {Set<import('http').ServerResponse>} */
const sseClients = new Set();

function broadcast(stats) {
  const payload = `data: ${JSON.stringify(stats)}\n\n`;
  for (const res of sseClients) {
    try { res.write(payload); } catch { sseClients.delete(res); }
  }
}

// ── KV polling — only active while SSE viewers are connected ─────────────────

let previousStats = null;
let streamTimer = null;

async function pollKvSnapshot() {
  try {
    const stats = await getStats();
    const payload = stats ?? { status: 'offline' };
    const serialized = JSON.stringify(payload);
    if (serialized !== previousStats) {
      previousStats = serialized;
      broadcast(payload);
    }
  } catch (err) {
    console.error('[API SERVER] Cloudflare KV stats read failed:', err.message);
  }
}

function startStreamPolling() {
  if (streamTimer) return;
  void pollKvSnapshot();
  streamTimer = setInterval(() => void pollKvSnapshot(), 60_000);
}

function stopStreamPollingIfIdle() {
  if (sseClients.size || !streamTimer) return;
  clearInterval(streamTimer);
  streamTimer = null;
}

// ── HTTP server ───────────────────────────────────────────────────────────────

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url = req.url?.split('?')[0];

  // ── One-shot JSON ──────────────────────────────────────────────────────────
  if (url === '/api/stats') {
    try {
      const stats = await getStats();
      if (!stats) {
        res.writeHead(503, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
        res.end(JSON.stringify({ status: 'offline' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=5' });
      res.end(JSON.stringify(stats));
    } catch (err) {
      console.error('[API SERVER] Error reading Cloudflare KV stats:', err.message);
      res.writeHead(503, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify({ status: 'offline' }));
    }
    return;
  }

  // ── SSE stream ─────────────────────────────────────────────────────────────
  if (url === '/api/stats/stream') {
    res.writeHead(200, {
      'Content-Type':  'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection':    'keep-alive',
      // Tell Nginx / any upstream proxy not to buffer this response.
      'X-Accel-Buffering': 'no',
    });
    res.flushHeaders();

    // Send current stats immediately so the client doesn't wait for the next change.
    try {
      const stats = await getStats();
      res.write(`data: ${JSON.stringify(stats ?? { status: 'offline' })}\n\n`);
    } catch { /* non-fatal — client will get next broadcast */ }

    // Keep-alive comment every 25 s (prevents proxy/browser timeouts).
    const keepAlive = setInterval(() => {
      try { res.write(': keep-alive\n\n'); } catch { /* client gone */ }
    }, 25_000);

    sseClients.add(res);
    startStreamPolling();

    req.on('close', () => {
      clearInterval(keepAlive);
      sseClients.delete(res);
      stopStreamPollingIfIdle();
    });
    return;
  }

  // ── Developer profile ──────────────────────────────────────────────────────
  if (url === '/api/developer') {
    try {
      const profile = await getDeveloperProfile();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(profile));
    } catch (err) {
      console.error('[API SERVER] Developer profile error:', err.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

// ── Developer profile (avatar decoration) ────────────────────────────────────

const DEV_USER_ID  = '922491166149214218';
const DEV_CACHE    = { data: null, expiresAt: 0 };   // 10-minute TTL
const DEV_CACHE_MS = 60_000; // 1 minute — so decoration changes appear quickly

async function getDeveloperProfile() {
  const now = Date.now();
  if (DEV_CACHE.data && now < DEV_CACHE.expiresAt) return DEV_CACHE.data;

  const token = process.env.DISCORD_TOKEN;
  if (!token) throw new Error('DISCORD_TOKEN not set');

  const res = await fetch(`https://discord.com/api/v10/users/${DEV_USER_ID}`, {
    headers: { Authorization: `Bot ${token}` },
  });
  if (!res.ok) throw new Error(`Discord API ${res.status}`);

  const user = await res.json();
  const profile = {
    id:              user.id,
    username:        user.username,
    avatar:          user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=256`
      : null,
    decoration:      user.avatar_decoration_data?.asset
      ? `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png`
      : null,
  };

  DEV_CACHE.data      = profile;
  DEV_CACHE.expiresAt = now + DEV_CACHE_MS;
  return profile;
}

// ── Boot ──────────────────────────────────────────────────────────────────────

async function start() {
  server.listen(PORT, () => {
    console.log(`[API SERVER] Listening on port ${PORT} — Cloudflare KV-backed /api/stats  /api/stats/stream`);
  });
}

start().catch(err => {
  console.error('[API SERVER] Failed to start:', err.message);
  process.exit(1);
});

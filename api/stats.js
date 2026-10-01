// Cassie-Web/api/stats.js
// Vercel serverless function — reads bot stats from PostgreSQL.
// Deploy alongside the website. Set DATABASE_URL and BOT_IDENTIFIER in Vercel.
// No separate server needed.

import pg from 'pg';

const DATABASE_URL = process.env.DATABASE_URL;
const BOT_ID = process.env.BOT_IDENTIFIER ?? '';

// Reuse the pool across warm Vercel invocations.
let _pool = null;

function getPool() {
  if (_pool) return _pool;
  if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');
  _pool = new pg.Pool({
    connectionString: DATABASE_URL,
    max: 1,
    connectionTimeoutMillis: 10_000,
    query_timeout: 10_000,
  });
  return _pool;
}

async function readSetting(pool, id) {
  const result = await pool.query(
    `SELECT data
     FROM public.bot_documents
     WHERE bot_id = $1 AND collection_name = 'settings' AND data->>'_id' = $2
     LIMIT 1`,
    [BOT_ID, id],
  );
  return result.rows[0]?.data ?? null;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }

  if (!DATABASE_URL) {
    return res.status(500).json({ error: 'DATABASE_URL not configured' });
  }

  try {
    const pool = getPool();
    const [botDoc, statsDoc] = await Promise.all([
      readSetting(pool, 'bot_stats'),
      readSetting(pool, 'global_stats'),
    ]);
    res.status(200).json({
      servers:          botDoc?.servers          ?? 0,
      members:          botDoc?.members          ?? 0,
      channels:         botDoc?.channels         ?? 0,
      commandsExecuted: statsDoc?.commandsExecuted ?? 0,
    });
  } catch (err) {
    _pool = null; // recreate the pool on the next invocation after connection errors
    console.error('[stats] PostgreSQL error:', err.message);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}

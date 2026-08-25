// Cassie-Web/api/developer.js
// Vercel serverless function — fetches the developer's Discord profile
// (avatar + avatar_decoration_data) and returns it to the frontend.
// Set DISCORD_TOKEN in Vercel environment variables (same token used by the bot).
// The bot and website do NOT need to be on the same host — only the token is needed.

const DEV_USER_ID = '922491166149214218';

// Module-level cache shared across warm Vercel invocations.
let _cache = null;
let _cacheExpiry = 0;
const CACHE_MS = 60_000; // 1 minute — so decoration changes appear quickly

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }

  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'DISCORD_TOKEN not configured' });
  }

  // Serve from cache if still fresh.
  const now = Date.now();
  if (_cache && now < _cacheExpiry) {
    return res.status(200).json(_cache);
  }

  try {
    const discordRes = await fetch(
      `https://discord.com/api/v10/users/${DEV_USER_ID}`,
      { headers: { Authorization: `Bot ${token}` } },
    );

    if (!discordRes.ok) {
      throw new Error(`Discord API returned ${discordRes.status}`);
    }

    const user = await discordRes.json();

    const profile = {
      id:         user.id,
      username:   user.username,
      avatar:     user.avatar
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=256`
        : null,
      decoration: user.avatar_decoration_data?.asset
        ? `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png`
        : null,
    };

    _cache       = profile;
    _cacheExpiry = now + CACHE_MS;

    res.status(200).json(profile);
  } catch (err) {
    console.error('[developer] Discord API error:', err.message);
    res.status(500).json({ error: err.message });
  }
}

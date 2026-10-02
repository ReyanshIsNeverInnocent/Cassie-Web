// Cassie-Web/api/stats.js
// Vercel serverless function — reads the latest bot-published Redis snapshot.
import { getFreshStatsSnapshot } from '../server/redisStats.js';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const snapshot = await getFreshStatsSnapshot(process.env.BOT_IDENTIFIER ?? '');
    if (!snapshot) {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(503).json({ status: 'offline', error: 'Fresh bot stats are not available' });
    }

    // Cache at the Vercel edge briefly so page visitors share Redis reads.
    res.setHeader('Cache-Control', 'public, s-maxage=25, stale-while-revalidate=30');
    return res.status(200).json(snapshot);
  } catch (err) {
    console.error('[stats] Redis error:', err.message);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ status: 'offline', error: 'Stats service is unavailable' });
  }
}

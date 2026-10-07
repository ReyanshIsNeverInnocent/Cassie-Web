// Cassie-Web/api/stats.js
// Vercel serverless function — reads the latest bot-published Supabase snapshot.
import { getWebsiteStatsSnapshot } from '../server/databaseStats.js';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const snapshot = await getWebsiteStatsSnapshot();
    if (!snapshot) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      return res.status(503).json({ status: 'offline', error: 'Fresh bot stats are not available' });
    }

    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    return res.status(200).json(snapshot);
  } catch (err) {
    console.error('[stats] Supabase error:', err.message);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    return res.status(503).json({ status: 'offline', error: 'Stats service is unavailable' });
  }
}

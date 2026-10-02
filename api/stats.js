// Cassie-Web/api/stats.js
// Vercel serverless function — reads the latest bot-published Cloudflare KV snapshot.
import { getFreshStatsSnapshot } from '../server/cloudflareStats.js';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const snapshot = await getFreshStatsSnapshot();
    if (!snapshot) {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(503).json({ status: 'offline', error: 'Fresh bot stats are not available' });
    }

    // Keep edge caching shorter than the 30-second publishing cadence.
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=5');
    return res.status(200).json(snapshot);
  } catch (err) {
    console.error('[stats] Cloudflare KV error:', err.message);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ status: 'offline', error: 'Stats service is unavailable' });
  }
}

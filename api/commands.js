import { getWebsiteCommandSnapshot } from '../server/databaseCommands.js';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const snapshot = await getWebsiteCommandSnapshot();
    if (!snapshot) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      return res.status(503).json({
        error: 'The bot has not published a command catalog yet',
      });
    }

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=300');
    return res.status(200).json(snapshot);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[commands] PostgreSQL read failed:', message);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    return res.status(503).json({ error: 'Command catalog is temporarily unavailable' });
  }
}

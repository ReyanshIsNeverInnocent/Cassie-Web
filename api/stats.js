// Cassie-Web/api/stats.js
// Vercel serverless function — reads bot stats from MongoDB.
// Deploy alongside the website. Set MONGO_URI and BOT_IDENTIFIER in Vercel.
// No separate server needed.

import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
const BOT_ID    = process.env.BOT_IDENTIFIER ?? '';
const DB_NAME   = 'CassieDiscordBot';

// Reuse the MongoClient across warm invocations (Vercel caches module scope).
let _client = null;

async function getClient() {
  if (_client) return _client;
  if (!MONGO_URI) throw new Error('MONGO_URI is not set');
  _client = new MongoClient(MONGO_URI, { tls: true, connectTimeoutMS: 10_000 });
  await _client.connect();
  return _client;
}

function col(client, name) {
  const prefixed = BOT_ID ? `${BOT_ID}_${name}` : name;
  return client.db(DB_NAME).collection(prefixed);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }

  if (!MONGO_URI) {
    return res.status(500).json({ error: 'MONGO_URI not configured' });
  }

  try {
    const client = await getClient();
    const [botDoc, statsDoc] = await Promise.all([
      col(client, 'settings').findOne({ _id: 'bot_stats'    }),
      col(client, 'settings').findOne({ _id: 'global_stats' }),
    ]);
    res.status(200).json({
      servers:          botDoc?.servers          ?? 0,
      members:          botDoc?.members          ?? 0,
      channels:         botDoc?.channels         ?? 0,
      commandsExecuted: statsDoc?.commandsExecuted ?? 0,
    });
  } catch (err) {
    _client = null; // force reconnect next time
    console.error('[stats] MongoDB error:', err.message);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}

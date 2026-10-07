import pg from 'pg';

const { Pool } = pg;
const MAX_SNAPSHOT_AGE_MS = 24 * 60 * 60_000;
const SNAPSHOT_CACHE_MS = 15_000;
let pool;
let cachedSnapshot;
let cacheExpiresAt = 0;
let pendingRead;

function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not configured');

  if (!pool) {
    pool = new Pool({
      connectionString,
      max: 2,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 5_000,
      query_timeout: 8_000,
    });
  }

  return pool;
}

export async function getWebsiteStatsSnapshot() {
  const now = Date.now();
  if (cachedSnapshot !== undefined && now < cacheExpiresAt) return cachedSnapshot;
  if (pendingRead) return pendingRead;

  pendingRead = readWebsiteStatsSnapshot();
  try {
    cachedSnapshot = await pendingRead;
    cacheExpiresAt = Date.now() + SNAPSHOT_CACHE_MS;
    return cachedSnapshot;
  } finally {
    pendingRead = undefined;
  }
}

async function readWebsiteStatsSnapshot() {
  const botId = process.env.BOT_IDENTIFIER;
  if (!botId) throw new Error('BOT_IDENTIFIER is not configured');
  const result = await getPool().query(
    `SELECT jsonb_build_object(
       'status', data->'status',
       'servers', data->'servers',
       'members', data->'members',
       'channels', data->'channels',
       'commandsExecuted', data->'commandsExecuted',
       'ping', data->'ping',
       'uptimeSecs', data->'uptimeSecs',
       'memoryMB', data->'memoryMB',
       'shards', data->'shards',
       'clusters', data->'clusters',
       'timestamp', data->'timestamp'
     ) AS data
     FROM bot_documents
     WHERE bot_id = $1
       AND collection_name = 'settings'
       AND document_id = 'website_stats_snapshot'
     LIMIT 1`,
    [botId],
  );

  const data = result.rows[0]?.data;
  if (!data || typeof data !== 'object') return null;
  const snapshot = {
    status: data.status,
    servers: data.servers,
    members: data.members,
    channels: data.channels,
    commandsExecuted: data.commandsExecuted,
    ping: data.ping,
    uptimeSecs: data.uptimeSecs,
    memoryMB: data.memoryMB,
    shards: data.shards,
    clusters: data.clusters,
    timestamp: data.timestamp,
  };
  if (!Number.isFinite(snapshot.timestamp)) return null;
  if (snapshot.timestamp > Date.now() + 30_000 || Date.now() - snapshot.timestamp > MAX_SNAPSHOT_AGE_MS) return null;
  return snapshot;
}
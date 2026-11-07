import pg from 'pg';

const { Pool } = pg;
const CACHE_TTL_MS = 5 * 60_000;
const EMPTY_CACHE_TTL_MS = 15_000;
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

export async function getWebsiteCommandSnapshot() {
  const now = Date.now();
  if (cachedSnapshot !== undefined && now < cacheExpiresAt) return cachedSnapshot;
  if (pendingRead) return pendingRead;

  pendingRead = readWebsiteCommandSnapshot();
  try {
    cachedSnapshot = await pendingRead;
    cacheExpiresAt = Date.now() + (cachedSnapshot ? CACHE_TTL_MS : EMPTY_CACHE_TTL_MS);
    return cachedSnapshot;
  } finally {
    pendingRead = undefined;
  }
}

async function readWebsiteCommandSnapshot() {
  const botId = process.env.BOT_IDENTIFIER;
  if (!botId) throw new Error('BOT_IDENTIFIER is not configured');

  const result = await getPool().query(
    `SELECT data
     FROM bot_documents
     WHERE bot_id = $1
       AND collection_name = 'settings'
       AND document_id = 'website_commands_snapshot'
     LIMIT 1`,
    [botId],
  );
  const snapshot = result.rows[0]?.data;
  if (
    !snapshot ||
    typeof snapshot !== 'object' ||
    !Number.isFinite(snapshot.updatedAt) ||
    !Array.isArray(snapshot.commands)
  ) {
    return null;
  }
  return snapshot;
}

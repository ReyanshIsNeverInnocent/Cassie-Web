import { Redis } from '@upstash/redis';

const SNAPSHOT_TTL_MS = 90_000;
const KEY_PREFIX = 'website:stats:v1';
let redis;

function getRedis() {
  if (redis) return redis;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('Upstash REST credentials are not configured');
  }
  redis = Redis.fromEnv();
  return redis;
}

export function getStatsKey(botIdentifier = '') {
  return `cassie:${encodeURIComponent(botIdentifier || 'default')}:${KEY_PREFIX}`;
}

export async function getFreshStatsSnapshot(botIdentifier = '') {
  const raw = await getRedis().get(getStatsKey(botIdentifier));
  const snapshot = typeof raw === 'string' ? JSON.parse(raw) : raw;
  if (!snapshot || typeof snapshot !== 'object' || typeof snapshot.timestamp !== 'number') return null;
  if (Date.now() - snapshot.timestamp > SNAPSHOT_TTL_MS || snapshot.timestamp > Date.now() + 30_000) return null;
  return snapshot;
}
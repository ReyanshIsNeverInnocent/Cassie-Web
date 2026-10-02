const SNAPSHOT_TTL_MS = 15 * 60_000;
const KEY_PREFIX = 'website:stats:v1';

export function getStatsKey() {
  return `cassie:${KEY_PREFIX}`;
}

export async function getFreshStatsSnapshot() {
  const accountId = process.env.CF_ACCOUNT_ID;
  const namespaceId = process.env.CF_KV_NAMESPACE_ID;
  const readToken = process.env.CF_KV_READ_TOKEN;
  if (!accountId || !namespaceId || !readToken) {
    throw new Error('Cloudflare KV read credentials are not configured');
  }

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/storage/kv/namespaces/${encodeURIComponent(namespaceId)}/values/${encodeURIComponent(getStatsKey())}`;
  const response = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${readToken}` },
    signal: AbortSignal.timeout(8_000),
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Cloudflare KV returned HTTP ${response.status}`);

  const snapshot = await response.json();
  if (!snapshot || typeof snapshot !== 'object' || typeof snapshot.timestamp !== 'number') return null;
  if (Date.now() - snapshot.timestamp > SNAPSHOT_TTL_MS || snapshot.timestamp > Date.now() + 30_000) return null;
  return snapshot;
}
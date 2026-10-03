### Structure and behavior by me, rest, most of CSS was handed over to Replit Agent 🙏🏻😭
(i still get the credit of writing exceptional 1600+ words prompt for the design, duh)

Access ts here: https://cassie-web.vercel.app/

### Vercel environment variables

- `CF_ACCOUNT_ID`: Cloudflare account ID containing the KV namespace.
- `CF_KV_NAMESPACE_ID`: ID of the stats KV namespace.
- `CF_KV_READ_TOKEN`: Cloudflare API token with read access to the stats namespace. Keep server-only; do not prefix it with `VITE_`.
- `DISCORD_TOKEN`: Used server-side by the developer profile API.

The bot publishes an aggregated stats snapshot to the fixed key `cassie:website:stats:v1` every five minutes with a 15-minute expiry, so a separate `BOT_IDENTIFIER` setting is not needed for website stats. Configure the bot host with the same `CF_ACCOUNT_ID` and `CF_KV_NAMESPACE_ID`, plus `CF_KV_WRITE_TOKEN` (write access to this namespace). `CF_KV_READ_TOKEN` should be read-only and is used by Vercel and the local `api-server.mjs`. The stats API does not need `DATABASE_URL`; Redis remains configured on the bot for its separate cache. The website refreshes every 30 seconds and the API response is edge-cached to avoid a KV read on every visitor refresh.

### Local development

Vite automatically reads `Cassie-Web/.env` for local configuration. The local API server also reads that file; use Node.js 20.6 or newer. Fill in the server-only variables listed above, then run `npm run dev` from `Cassie-Web/`; it starts both Vite and the API server. The Vite dev server proxies `/api` requests to the local API server on port 3001 (or `STATS_API_PORT` if set). Keep credentials out of `VITE_` variables because those are exposed to browser code. To run only the API server, use `npm run dev:api`.

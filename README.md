### Structure and behavior by me, rest, most of CSS was handed over to Replit Agent 🙏🏻😭
(i still get the credit of writing exceptional 1600+ words prompt for the design, duh)

Access ts here: https://cassie-web.vercel.app/

### Vercel environment variables

- `DATABASE_URL`: Supabase Postgres connection string, same value used by the bot.
- `BOT_IDENTIFIER`: Same bot identifier used by the bot so the website reads the correct snapshot.
- `DISCORD_TOKEN`: Used server-side by the developer profile API.

The bot publishes the stats snapshot to its existing Supabase `bot_documents` store every 30 seconds. The website reads the same snapshot from Postgres; Cloudflare KV is not used for stats. Redis remains configured on the bot for its separate cache. The website refreshes every 30 seconds and the API response is edge-cached.

### Local development

Vite automatically reads `Cassie-Web/.env` for local configuration. The local API server also reads that file; use Node.js 20.6 or newer. Set `DATABASE_URL`, `BOT_IDENTIFIER`, and `DISCORD_TOKEN`, then run `npm run dev` from `Cassie-Web/`; it starts both Vite and the API server. The Vite dev server proxies `/api` requests to the local API server on port 3001 (or `STATS_API_PORT` if set). Keep credentials out of `VITE_` variables because those are exposed to browser code. To run only the API server, use `npm run dev:api`.

### Structure and behavior by me, rest, most of CSS was handed over to Replit Agent 🙏🏻😭
(i still get the credit of writing exceptional 1600+ words prompt for the design, duh)

Access ts here: https://cassie-web.vercel.app/

### Vercel environment variables

- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST endpoint. Keep this server-only; do not prefix it with `VITE_`.
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST token. Keep this server-only; do not prefix it with `VITE_`.
- `BOT_IDENTIFIER`: Must exactly match the production bot's `BOT_IDENTIFIER` so the website reads its stats key.
- `DISCORD_TOKEN`: Used server-side by the developer profile API.

The bot publishes a short-lived, aggregated stats snapshot to Upstash Redis every 30 seconds. The website stats API reads that snapshot; it does not need `DATABASE_URL`. The local `api-server.mjs` uses the same Upstash REST variables. The bot itself continues to use `REDIS_URL` for its Redis connection and cache. The stats page refreshes every 30 seconds and the API response is edge-cached briefly to avoid a Redis read per visitor poll.

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CASSIE — Landing Page Config
 *  Edit this file to update any public-facing info on the site.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const botConfig = {
   /* ── Identity ─────────────────────────────────────────── */
   name: "Cassie",
   prefix: "$",
   tagline: "Your server, elevated.",
   description:
      "A moderation, antinuke, and utility Discord bot built for modern servers. Every response is crafted with Discord's Components V2 ; clean, interactive, and precise.",

   /* ── Stats ──────────────────────────────────────────────
     commandCount is auto-derived in `site.ts` from the real
     commandCategories list — don't hand-edit it here.       */
   commandCount: 0,
   uptime: "99.9%",

   /* ── Links ────────────────────────────────────────────── */
   inviteUrl:
      "https://discord.com/oauth2/authorize?client_id=956120503523889172",
   supportUrl: "https://discord.gg/YpCfcCTXdv",
   githubUrl: "https://github.com/ReyuFellOff/Cassie",

   /* ── Avatar (set to a URL or relative path; leave '' for the default fallback) ── */
   botAvatar: "https://i.ibb.co/S76nv0n3/bot-avatar-duh-square-cropped.jpg", // e.g. 'https://cdn.discordapp.com/avatars/.../avatar.png'
};

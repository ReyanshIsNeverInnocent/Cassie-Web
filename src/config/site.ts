import {
  Shield,
  Zap,
  Sparkles,
  Bell,
  Layers,
  Settings,
  MoreHorizontal,
  Hash,
  MessageSquare,
  Cake,
  Star,
  Swords,
  Users,
  Volume2,
  Heart,
  Music2,
} from "lucide-react";
import { botConfig } from "./bot";
import { developerConfig } from "./developer";

export { botConfig, developerConfig };

// Prefix-only roleplay commands are generated from the shared action registry
// in the bot. Keep their public catalog together so the website documents the
// complete family without duplicating 58 identical metadata blocks.
const roleplayCommandNames = [
  "airkiss", "angry", "angrystare", "bite", "blush", "brofist",
  "celebrate", "cheers", "comfy", "cool", "cry", "cuddle", "dance",
  "drool", "evilaugh", "headband", "hug", "huh", "kiss", "lick", "love",
  "mad", "nervous", "nom", "nosebleed", "nyah", "pat", "peek", "pinch",
  "poke", "pout", "punch", "rkick", "roll", "run", "sad", "scared",
  "shout", "shy", "sigh", "sing", "slap", "sleep", "slowclap", "smile",
  "sneeze", "sorry", "stop", "surprised", "sweat", "thumbsup", "tickle",
  "tired", "wave", "wink", "woah", "yawn", "yay",
] as const;

const roleplayCommands = roleplayCommandNames.map((name) => ({
  name: `$${name}`,
  aliases: [] as string[],
  permission: null,
  description: `Use the ${name} roleplay GIF.`,
  usage: `$${name} [user] [user2]`,
  slash: false,
}));

export const site = {
  // `bot.commandCount` is overwritten below with the real, auto-counted
  // total from `commandCategories` so it can never drift out of sync.
  bot: botConfig,
  // Update this whenever any website source or public-facing website content changes.
  lastUpdated: "Sunday, August 23, '26 at 08:54 PM (IST, UTC+05:30)",

  nav: [
    { label: "Home", href: "/" },
    { label: "Commands", href: "/commands" },
    { label: "Stats", href: "/stats" },
    { label: "About", href: "/about" },
  ],

  features: [
    {
      icon: Swords,
      title: "Antinuke Protection",
      description:
        "11 independent modules guard your server from nukers: channel/role deletion, mass bans, bot adds, dangerous permission grants, and more. Trips once a threshold is crossed, punishes the actor, and reverts the damage.",
    },
    {
      icon: Shield,
      title: "Full Moderation Suite",
      description:
        "Ban, kick, timeout, strip roles, lockdown channels, purge with 13+ filters, hackban, warnings system, slowmode, nick management, and VC controls, all with DM notifications and modlog integration.",
    },
    {
      icon: Bell,
      title: "Server Logging",
      description:
        "Seven log categories: channels, members, roles, VC, messages, server, and modlogs. Per-category channel overrides, enable/disable toggles, and exception lists. Modlogs auto-capture every moderation action.",
    },
    {
      icon: Zap,
      title: "Utility Powerhouse",
      description:
        "Sticky messages, autorole, autoresponders, AFK system, alias shortcuts, interactive embed and CV2 container builders, webhook manager, vanity role system, and more.",
    },
    {
      icon: Cake,
      title: "Birthday System",
      description:
        "Users set their birthday once and the bot announces it in every configured server on the day. Custom messages with placeholders, saved CV2 payloads, and a list command showing upcoming birthdays.",
    },
    {
      icon: Sparkles,
      title: "Fun Commands",
      description:
        "Ship compatibility, rating commands (howgay, howcute, howrizz, howsimp, howintelligent, howautistic), wanted posters, who-would-win, tic-tac-toe, rock-paper-scissors PvP, DuckDuckGo image search, and more.",
    },
    {
      icon: Sparkles,
      title: "Roleplay GIFs",
      description:
        "A 58-command prefix-only reaction library for expressive GIF actions such as hug, kiss, cuddle, dance, rkick, wave, and more.",
    },
    {
      icon: Users,
      title: "Welcomer System",
      description:
        "Greet new members with fully customisable messages: plain text, saved embeds, or interactive CV2 payloads with the complete placeholder system. Toggle bot-join greets independently.",
    },
    {
      icon: MessageSquare,
      title: "Rich Info Panels",
      description:
        "Userinfo with 4 tabs (About · Roles · Permissions · Assets), serverinfo with 5 tabs, paginated lists of roles/members/bots/emojis/channels/bans, and a detailed debug panel.",
    },
    {
      icon: Heart,
      title: "Customisation",
      description:
        "Per-server prefix, personal self-prefix, server name style, and bot profile customisation (avatar, banner, bio, username), all from within Discord.",
    },
  ],

  commandCategories: [
    {
      name: "Info",
      icon: Star,
      commands: [
        {
          name: "$help",
          aliases: ["h"],
          permission: null,
          description: "Interactive CV2 help menu with category navigation.",
          usage: "$help [category]",
        },
        {
          name: "$ping",
          aliases: [],
          permission: null,
          description: "API latency, WebSocket ping, and database ping.",
          usage: "$ping",
        },
        {
          name: "$debug",
          aliases: ["botstats"],
          permission: null,
          description:
            "Detailed bot stats: clusters, shards, memory, latency, and more.",
          usage: "$debug",
        },
        {
          name: "$uptime",
          aliases: [],
          permission: null,
          description: "Shows how long the bot has been online.",
          usage: "$uptime",
        },
        {
          name: "$commandcount",
          aliases: ["cc"],
          permission: null,
          description: "Shows the number of commands in the bot.",
          usage: "$commandcount",
          slash: false,
        },
        {
          name: "$dominant",
          aliases: [],
          permission: null,
          description: "Show the dominant color and color details for a user, server, or bot.",
          usage: "$dominant [user]\n$dominant server\n$dominant bot",
        },
        {
          name: "$invite",
          aliases: ["addbot", "botinvite", "inv"],
          permission: null,
          description:
            "Get the link to add this bot to your server and join the support server.",
          usage: "$invite",
        },
        {
          name: "$node-status",
          aliases: ["nodestatus", "ns"],
          permission: null,
          description:
            "Show which Lavalink node is connected and list all configured nodes in priority order.",
          usage: "$node-status",
        },
        {
          name: "$developer",
          aliases: ["dev", "owner", "creator"],
          permission: null,
          description: "Info about the developer behind this bot.",
          usage: "$developer",
        },
        {
          name: "$host",
          aliases: ["hosting", "hoster"],
          permission: null,
          description:
            "Shows where the bot is hosted and other technical details.",
          usage: "$host",
        },
      ],
    },
    {
      name: "Socials",
      icon: Users,
      commands: [
        {
          name: "$cinema",
          aliases: ["movie", "movies", "tvshow", "tv", "series", "show"],
          permission: null,
          description:
            "Search TMDB for a movie or TV show and show its dates, status, TMDB rating, US certification, genres, cast, synopsis, and links.",
          usage: "$cinema <movie or TV show>",
        },
        {
          name: "$github",
          aliases: ["gh"],
          permission: null,
          description: "Show a GitHub profile and recent repositories in a colour-accented CV2 panel.",
          usage: "$github <username>",
        },
        {
          name: "$youtube",
          aliases: ["yt", "ytchannel"],
          permission: null,
          description: "Fetch and display YouTube channel details.",
          usage: "$youtube <channel-name-or-id>",
        },
        {
          name: "$image",
          aliases: ["img", "imagesearch"],
          permission: null,
          description:
            "Search for an image using DuckDuckGo (safe search enforced).",
          usage: "$image <query>",
        },
        {
          name: "$periodic-table",
          aliases: ["element", "ptable", "periodictable"],
          permission: null,
          description: "Look up an element from the periodic table.",
          usage: "$periodic-table <element name|symbol|atomic number>",
        },
      ],
    },
    {
      name: "Moderation",
      icon: Shield,
      commands: [
        {
          name: "$ban",
          aliases: [],
          permission: "Ban Members",
          description: "Ban a user. DMs them first with the reason.",
          usage: "$ban <@user|ID> [reason]",
        },
        {
          name: "$kick",
          aliases: [],
          permission: "Kick Members",
          description: "Kick a member. DMs them first.",
          usage: "$kick <@user> [reason]",
        },
        {
          name: "$pin",
          aliases: [],
          permission: "Manage Messages",
          description:
            "Pin a message by replying to it, its ID, or a Discord link.",
          usage: "$pin [message ID | message link]",
        },
        {
          name: "$unpin",
          aliases: [],
          permission: "Manage Messages",
          description:
            "Unpin a message by replying to it, its ID, or a Discord link.",
          usage: "$unpin [message ID | message link]",
        },
        {
          name: "$unban",
          aliases: [],
          permission: "Ban Members",
          description: "Unban by ID. No ID = dropdown of all current bans.",
          usage: "$unban [user ID]",
        },
        {
          name: "$unbanall",
          aliases: ["unban-all"],
          permission: "Ban Members",
          description: "Unban every banned user from this server after confirmation.",
          usage: "$unbanall",
        },
        {
          name: "$hackban",
          aliases: ["forceban"],
          permission: "Ban Members",
          description:
            "Force-ban a user by ID even if they're not in the server.",
          usage: "$hackban <user ID> [reason]",
        },
        {
          name: "$warn",
          aliases: [],
          permission: "Timeout Members",
          description: "Warn a member. Stored in the database, DMs the target.",
          usage: "$warn <@user> <reason>",
        },
        {
          name: "$warnings",
          aliases: ["warns"],
          permission: null,
          description: "View a member's full warning history.",
          usage: "$warnings <@user>",
        },
        {
          name: "$clearwarnings",
          aliases: ["clearwarns"],
          permission: null,
          description: "Clear all warnings for a member (with confirmation).",
          usage: "$clearwarnings <@user>",
        },
        {
          name: "$strip",
          aliases: [],
          permission: "Manage Roles",
          description:
            "Remove all of a member's roles (skips managed/higher roles).",
          usage: "$strip <@user>",
        },
        {
          name: "$role",
          aliases: [],
          permission: "Manage Roles",
          description:
            "Add or remove a member role directly, or open the combined role manager.",
          usage:
            "$role add <user> [role]\n$role remove <user> [role]\n$role all <role>\n$role all remove <role>\n$role hoist <role> [on|off]\n$role rename <role> <name>\n$role delete <role>\n$role mentionable <role> [on|off]\n$role create <name>\n$role color <role> <#hex>\n$role <user>",
        },
        {
          name: "$nick",
          aliases: ["nickname"],
          permission: "Manage Nicknames",
          description:
            "Change a member's nickname, or reset up to 10 members at once.",
          usage:
            "$nick <@user|ID> <new nickname>\n$nick reset <user1> [user2] ... [user10]",
        },
        {
          name: "$massnick",
          aliases: ["massnickname"],
          permission: "Manage Nicknames",
          description:
            "Mass-change nicknames with prepend, append, remove, or reset. A 6-button panel lets you target All Members / Humans Only / Bots Only / Specific Role (dropdown) / Members (type them) / Cancel.",
          usage:
            "$massnick prepend <word>\n$massnick append <word>\n$massnick remove <word>\n$massnick reset",
        },
        {
          name: "$masskick",
          aliases: ["mkick"],
          permission: "Kick Members",
          description:
            "Kick all members matching criteria (with confirmation).",
          usage: "$masskick [filter]",
        },
        {
          name: "$softban",
          aliases: [],
          permission: "Ban Members",
          description:
            "Ban then unban a member from the server.",
          usage:
            "$softban <@user|ID|username> [history] [reason]\nHistory: none · 1h · 6h · 12h · 1d · 3d · 7d (default: 7d).",
        },
        {
          name: "$jail",
          aliases: [],
          permission: null,
          description:
            "Configure jail, list jailed members, or view jail access rules.",
          usage:
            "$jail setup [#allowed-channel]\n$jail remove\n$jail list\n$jail status\n$jail commands\n$jail <@user|ID|username> [reason]",
        },
        {
          name: "$unjail",
          aliases: [],
          permission: "Manage Roles",
          description: "Remove the configured Jailed role from a member.",
          usage: "$unjail <@user|ID|username> [reason]",
        },
        {
          name: "$reactionmute",
          aliases: ["rmute", "reactmute"],
          permission: "Manage Roles",
          description: "Deny Add Reactions for a member in every text channel.",
          usage: "$reactionmute <@user|ID> [reason]",
        },
        {
          name: "$reactionunmute",
          aliases: ["runmute", "reactunmute"],
          permission: "Manage Roles",
          description:
            "Reverse $reactionmute: restore a member's reaction ability.",
          usage: "$reactionunmute <@user|ID> [reason]",
        },
        {
          name: "$imagemute",
          aliases: ["imute"],
          permission: "Manage Roles",
          description:
            "Prevent a member from sending images, image links, and image stickers.",
          usage: "$imagemute <@user|ID> [reason]",
        },
        {
          name: "$imageunmute",
          aliases: ["iunmute"],
          permission: "Manage Roles",
          description: "Restore a member's ability to send images.",
          usage: "$imageunmute <@user|ID> [reason]",
        },
      ],
    },
    {
      name: "Channels",
      icon: Hash,
      commands: [
        {
          name: "$media",
          aliases: [],
          permission: "Manage Channels",
          description:
            "Configure channels that only accept messages with media attachments.",
          usage:
            "$media <#channel>\n$media set <#channel>\n$media remove <#channel>\n$media disable <#channel>\n$media list\n$media config",
        },
        {
          name: "$lock",
          aliases: ["lockchannel"],
          permission: "Manage Channels",
          description: "Lock a channel: removes Send Messages from @everyone.",
          usage: "$lock [#channel]",
        },
        {
          name: "$unlock",
          aliases: ["unlockchannel"],
          permission: "Manage Channels",
          description: "Unlock a previously locked channel.",
          usage: "$unlock [#channel]",
        },
        {
          name: "$lockdown",
          aliases: [],
          permission: "Manage Server",
          description:
            "Lock or unlock every text channel in the server. Confirmation required.",
          usage: "$lockdown\n$lockdown unlock\n$lockdown remove",
        },
        {
          name: "$slowmode",
          aliases: ["sm", "ratelimit"],
          permission: "Manage Channels",
          description: "Set channel slowmode with a human duration string.",
          usage: "$slowmode <30s|5m|2h>",
        },
        {
          name: "$hide",
          aliases: ["hidechannel"],
          permission: "Manage Channels",
          description: "Hide one or more channels from @everyone.",
          usage: "$hide [#channel ...]",
        },
        {
          name: "$unhide",
          aliases: ["unhidechannel"],
          permission: "Manage Channels",
          description: "Unhide one or more previously hidden channels.",
          usage: "$unhide [#channel ...]",
        },
        {
          name: "$nsfw",
          aliases: [],
          permission: "Manage Channels",
          description: "Toggle the NSFW flag on one or more channels.",
          usage: "$nsfw [#channel ...]",
        },
        {
          name: "$nuke",
          aliases: [],
          permission: "Manage Channels",
          description:
            "Delete and instantly recreate one or more channels with identical settings.",
          usage: "$nuke [#channel ...]",
        },
        {
          name: "$delete-channel",
          aliases: ["deletechannel", "delchannel"],
          permission: "Manage Channels",
          description: "Delete a channel after a confirmation prompt.",
          usage: "$delete-channel [#channel]",
        },
      ],
    },
    {
      name: "Security",
      icon: Swords,
      commands: [
        {
          name: "$antinuke status",
          aliases: ["an", "antinukesetup"],
          permission: "Administrator",
          description:
            "View the antinuke master toggle, module count, log channel, and quarantine role.",
          usage: "$antinuke status",
        },
        {
          name: "$antinuke enable",
          aliases: ["an", "antinukesetup"],
          permission: "Administrator",
          description: "Enable the antinuke system for this server.",
          usage: "$antinuke enable",
        },
        {
          name: "$antinuke disable",
          aliases: ["an", "antinukesetup"],
          permission: "Administrator",
          description: "Disable the antinuke system for this server.",
          usage: "$antinuke disable",
        },
        {
          name: "$antinuke modules",
          aliases: ["an", "antinukesetup"],
          permission: "Administrator",
          description: "View all 11 modules and their current config.",
          usage: "$antinuke modules",
        },
        {
          name: "$antinuke module",
          aliases: ["an", "antinukesetup"],
          permission: "Administrator",
          description:
            "Configure a specific module: enable/disable, punishment type, threshold.",
          usage:
            "$antinuke module <name> enable|disable\n$antinuke module <name> punishment <type>\n$antinuke module <name> threshold <count> <seconds>",
        },
        {
          name: "$antinuke whitelist",
          aliases: ["an", "antinukesetup"],
          permission: "Administrator",
          description:
            "Manage whitelisted users and roles exempt from punishment.",
          usage:
            "$antinuke whitelist list\n$antinuke whitelist add <user|role>\n$antinuke whitelist remove <user|role>",
        },
        {
          name: "$antinuke logs",
          aliases: ["an", "antinukesetup"],
          permission: "Administrator",
          description: "Set or disable the antinuke log channel.",
          usage: "$antinuke logs <#channel>\n$antinuke logs disable",
        },
        {
          name: "$antinuke profile",
          aliases: ["an", "antinukesetup"],
          permission: "Administrator",
          description:
            "Apply a preset: lockdown, strict, balanced, or lenient.",
          usage: "$antinuke profile <lockdown|strict|balanced|lenient>",
        },
        {
          name: "$antinuke reset",
          aliases: ["an", "antinukesetup"],
          permission: "Administrator",
          description:
            "Reset all antinuke config to defaults (with confirmation).",
          usage: "$antinuke reset",
        },
      ],
    },
    {
      name: "Utility",
      icon: Zap,
      commands: [
        {
          name: "$purge",
          aliases: ["clear"],
          permission: "Manage Messages",
          description:
            "13+ subcommands: all, bot, user, text, images, links, between, embeds, reactions, and more.",
          usage: "$purge <subcommand> [args]",
        },
        {
          name: "$purge-till",
          aliases: ["purgetill", "pt"],
          permission: "Manage Messages",
          description:
            "Delete all messages in the channel up to a specific message ID.",
          usage: "$purge-till <message ID>",
        },
        {
          name: "$remind",
          aliases: ["remindme"],
          permission: null,
          description: "Create and manage personal reminders.",
          usage: "$remind <duration> <reason>\n$remind list\n$remind delete <number>",
        },
        {
          name: "$snipe",
          aliases: ["s"],
          permission: null,
          description: "Show the last deleted message in a channel.",
          usage: "$snipe [#channel]",
        },
        {
          name: "$reactionsnipe",
          aliases: ["rs", "rsnipe"],
          permission: null,
          description: "Show the last removed reaction in a channel.",
          usage: "$reactionsnipe [#channel]",
        },
        {
          name: "$vanityrole",
          aliases: ["vr", "vanityroles"],
          permission: "Manage Server",
          description:
            "Auto-assign roles based on a status/bio keyword or the server tag.",
          usage:
            "$vanityrole\n$vanityrole status\n$vanityrole bio\n$vanityrole tag",
        },
        {
          name: "$list",
          aliases: ["ls"],
          permission: null,
          description:
            "Paginated list of roles, members, bots, emojis, stickers, channels, bans, or invites.",
          usage: "$list <type>",
        },
        {
          name: "$inrole",
          aliases: [],
          permission: null,
          description: "List members who have a role by mention, ID, or name.",
          usage: "$inrole <@role | role ID | role name>",
        },
        {
          name: "$userroles",
          aliases: [],
          permission: null,
          description: "List the roles assigned to a user.",
          usage: "$userroles [@user | user ID | username]",
        },
        {
          name: "$roleinfo",
          aliases: ["ri"],
          permission: null,
          description:
            "Show detailed information about a role using a mention, ID, or text from its name.",
          usage: "$roleinfo <@role | role ID | role name>",
        },
        {
          name: "$vanity",
          aliases: [],
          permission: null,
          description:
            "Show this server's vanity URL when used without an argument, or check whether another vanity is taken or available.",
          usage: "$vanity [url]",
        },
        {
          name: "$react",
          aliases: ["re"],
          permission: null,
          description:
            "React to a message with an emoji; targets the reply or the previous message.",
          usage: "$react <emoji name or ID>",
        },
        {
          name: "$host-image",
          aliases: ["hostimage", "imgbb", "upload-image"],
          permission: null,
          description:
            "Upload an image (attachment or URL) and get back hosted links.",
          usage: "$host-image <attachment>\n$host-image <image URL>",
        },
        {
          name: "$emoji",
          aliases: [],
          permission: "Manage Guild Expressions",
          description: "Delete or rename custom emojis in this server.",
          usage: "$emoji delete <emoji> <emoji> ...\n$emoji rename <emoji> <name>",
        },
        {
          name: "$steal",
          aliases: [],
          permission: "Manage Guild Expressions",
          description:
            "Steal one or more custom emojis or image files into this server as emojis or stickers.",
          usage:
            "$steal <emoji | emoji ID | emoji markdown | emoji name> ...\n$steal <image URL> ...\nReply to a message containing emojis or image files, then use $steal",
        },
        {
          name: "$placeholder-help",
          aliases: ["placeholders", "ph", "phhelp"],
          permission: null,
          description:
            "Paginated reference for all available placeholder tokens.",
          usage: "$placeholder-help",
        },
        {
          name: "$say",
          aliases: ["echo"],
          permission: "Manage Messages",
          description:
            "Make the bot say something in the current channel. Supports \\n for newlines, custom emoji syntax, and file attachments. Also works as a reply.",
          usage: "$say <text>",
        },
        {
          name: "$sayemoji",
          aliases: ["em"],
          permission: "Manage Messages",
          description:
            "Send one or more emojis as a message. Supports space-separated and no-space emoji groups.",
          usage: "$sayemoji <name or ID>\n$sayemoji <name1>|$|<name2>\n$sayemoji <name1> <name2>",
        },
        {
          name: "$serverinfo",
          aliases: ["si", "guildinfo", "guild"],
          permission: null,
          description:
            "5-tab panel: Overview (including the server vanity when configured) · Members · Channels · Security · Assets.",
          usage: "$serverinfo",
        },
        {
          name: "$membercount",
          aliases: ["memcount", "mc"],
          permission: null,
          description: "Show total, user, and bot member counts.",
          usage: "$membercount",
        },
        {
          name: "$userinfo",
          aliases: ["ui", "whois"],
          permission: null,
          description:
            "4-tab panel: About · Roles · Permissions · Assets. Buttons active 3 min.",
          usage: "$userinfo [@user]",
        },
        {
          name: "$permissions",
          aliases: ["perms"],
          permission: null,
          description: "Show the permissions a user or role has in this server.",
          usage:
            "$permissions [@user | user ID | username | @role | role ID | role name]",
        },
        {
          name: "$avatar",
          aliases: ["av", "pfp"],
          permission: null,
          description:
            "Show a user's avatar. Prompts server vs global if they differ.",
          usage: "$avatar [@user]",
        },
        {
          name: "$banner",
          aliases: ["bn"],
          permission: null,
          description:
            "Show a user's banner. Prompts server vs global if they differ.",
          usage: "$banner [@user]",
        },
        {
          name: "$vcinfo",
          aliases: ["voiceinfo"],
          permission: null,
          description: "Show detailed information about a voice channel.",
          usage: "$vcinfo <voice channel mention | ID | name>",
        },
        {
          name: "$servericon",
          aliases: ["sicon"],
          permission: null,
          description: "Show this server's icon in a CV2 image panel.",
          usage: "$servericon",
        },
        {
          name: "$serverbanner",
          aliases: ["sbanner"],
          permission: null,
          description: "Show this server's banner in a CV2 image panel.",
          usage: "$serverbanner",
        },
        {
          name: "$serversplash",
          aliases: ["ssplash"],
          permission: null,
          description: "Show this server's invite splash image in a CV2 image panel.",
          usage: "$serversplash",
        },
      ],
    },
    {
      name: "Settings",
      icon: Settings,
      commands: [
        {
          name: "$setprefix",
          aliases: ["prefix", "changeprefix"],
          permission: "Manage Server",
          description: "Set a custom command prefix for this server.",
          usage: "$setprefix <new prefix>",
        },
        {
          name: "$resetprefix",
          aliases: [],
          permission: "Manage Server",
          description: "Reset the server prefix back to the default.",
          usage: "$resetprefix",
        },
        {
          name: "$selfprefix",
          aliases: ["sp", "myprefix"],
          permission: null,
          description:
            "Set a personal prefix that works for you in any server.",
          usage: "$selfprefix <prefix>\n$selfprefix view\n$selfprefix remove",
        },
        {
          name: "$noprefix",
          aliases: ["nop", "mynop", "mynoprefix"],
          permission: null,
          description:
            "Toggle your own noprefix access on or off. Only works if a developer has granted you noprefix access.",
          usage: "$noprefix\n$noprefix on\n$noprefix off\n$noprefix status\n$noprefix server enable\n$noprefix server disable",
        },
        {
          name: "$glnoprefix",
          aliases: ["gnop"],
          permission: "Developer",
          description:
            "Manage global noprefix grants and control another user's global or server-specific noprefix setting.",
          usage:
            "$glnoprefix add <user> [duration]\n$glnoprefix remove <user>\n$glnoprefix extend <user> <duration>\n$glnoprefix makeperm <user>\n$glnoprefix list\n$glnoprefix status <user>\n$glnoprefix user <user> enable|disable\n$glnoprefix user <user> server enable|disable\n$glnoprefix enable|disable\n$glnoprefix server enable|disable/list [server ID]",
        },
        {
          name: "$autonick",
          aliases: ["automaticnick"],
          permission: "Manage Server",
          description: "Configure text prepended or appended to new members and bots.",
          usage: "$autonick [member | bot] prepend <text>\n$autonick [member | bot] append <text>\n$autonick reset [member | bot | all] [prepend | append | all]\n$autonick status",
        },
      ],
    },
    {
      name: "Miscellaneous",
      icon: MoreHorizontal,
      commands: [
        {
          name: "$archive",
          aliases: [],
          permission: "Manage Messages",
          description:
            "Save recent channel messages to a .txt file sent to your DMs.",
          usage: "$archive [amount]",
        },
        {
          name: "$allcommands",
          aliases: [],
          permission: null,
          description: "Show all commands available to the bot in alphabetical order.",
          usage: "$allcommands",
          slash: false,
        },
        {
          name: "$accountage",
          aliases: ["age"],
          permission: null,
          description: "Show how long a Discord account has existed.",
          usage: "$accountage [@user | user ID | username]",
        },
        {
          name: "$enlarge",
          aliases: ["jumbo", "big"],
          permission: null,
          description:
            "Show a custom emoji as a full-size image. Accepts emoji markdown, a raw ID, or an emoji name.",
          usage: "$enlarge <emoji | emoji ID | :name:>",
        },
        {
          name: "$emojizip",
          aliases: ["emojiexport"],
          permission: null,
          description: "Export this server's custom emojis as a ZIP file.",
          usage: "$emojizip",
        },
        {
          name: "$firstmessage",
          aliases: ["firstmsg"],
          permission: null,
          description:
            "Get a jump link to the first message ever sent in this channel.",
          usage: "$firstmessage",
        },
        {
          name: "$ghostping",
          aliases: ["gp", "ghostpng"],
          permission: "Administrator",
          description:
            "Ghost-ping users or a role, then instantly delete the message. Role targets are available to the server owner.",
          usage: "$ghostping <@user1> [@user2] … | <role>",
        },
        {
          name: "$whoping",
          aliases: ["wp", "whoponged"],
          permission: null,
          description:
            "Show the last 10 messages that directly pinged a user in this channel.",
          usage: "$whoping [@user]",
        },
      ],
    },
    {
      name: "VC Controls",
      icon: Volume2,
      commands: [
        {
          name: "$join",
          aliases: [],
          permission: null,
          description:
            "Make the bot join your voice channel (or a specified one).",
          usage: "$join [channel]",
        },
        {
          name: "$leave",
          aliases: [],
          permission: null,
          description: "Make the bot leave the voice channel.",
          usage: "$leave",
        },
        {
          name: "$rejoin",
          aliases: [],
          permission: null,
          description: "Make the bot rejoin its current voice channel.",
          usage: "$rejoin",
        },
        {
          name: "$mute",
          aliases: [],
          permission: "Mute Members",
          description: "Server-mute a member in voice chat.",
          usage: "$mute <@user>",
        },
        {
          name: "$vcmute",
          aliases: [],
          permission: "Mute Members",
          description: "Server-mute a member in voice. Defaults to yourself.",
          usage: "$vcmute [@user]",
        },
        {
          name: "$unmute",
          aliases: [],
          permission: "Mute Members",
          description: "Remove server-mute from a member.",
          usage: "$unmute <@user>",
        },
        {
          name: "$vcunmute",
          aliases: [],
          permission: "Mute Members",
          description: "Remove server-mute from a member in voice. Defaults to yourself.",
          usage: "$vcunmute [@user]",
        },
        {
          name: "$deafen",
          aliases: [],
          permission: "Deafen Members",
          description: "Server-deafen a member in voice chat.",
          usage: "$deafen <@user>",
        },
        {
          name: "$undeafen",
          aliases: [],
          permission: "Deafen Members",
          description: "Remove server-deafen from a member.",
          usage: "$undeafen <@user>",
        },
        {
          name: "$disconnect",
          aliases: ["dsc", "devoice"],
          permission: "Move Members",
          description: "Disconnect a member from their voice channel.",
          usage: "$disconnect <@user>",
        },
        {
          name: "$shift",
          aliases: [],
          permission: "Move Members",
          description: "Move a member to a different voice channel.",
          usage: "$shift <@user> <#channel>",
        },
        {
          name: "$voicemaster",
          aliases: ["vm"],
          permission: "Administrator",
          description:
            "Set up or manage temporary personal voice channels with a persistent control panel.",
          usage:
            "$voicemaster setup [text-channel]\n$voicemaster status\n$voicemaster reset",
          slash: false,
        },
      ],
    },
    {
      name: "Music",
      icon: Music2,
      commands: [
        {
          name: "$24/7",
          aliases: ["247", "twentyfourseven", "stay"],
          permission: null,
          description: "Manage 24/7 mode and keep the bot connected to voice.",
          usage: "$24/7 <enable [channel] | disable | view>",
        },
        {
          name: "/247",
          aliases: [],
          permission: null,
          description: "Manage 24/7 mode and keep the bot connected to voice.",
          usage: "/247 <enable [channel] | disable | view>",
          slash: true,
        },
        {
          name: "$add",
          aliases: [],
          permission: null,
          description: "Add a song to the queue, including JioSaavn searches with the jssearch: prefix.",
          usage: "$add <song name, URL, or jssearch:query>",
        },
        {
          name: "$clear",
          aliases: ["cl", "clearqueue"],
          permission: null,
          description: "Clear all upcoming tracks from the queue.",
          usage: "$clear",
        },
        {
          name: "$grab",
          aliases: ["save"],
          permission: null,
          description: "DM yourself the currently playing track details.",
          usage: "$grab",
        },
        {
          name: "$loop",
          aliases: ["repeat", "l"],
          permission: null,
          description: "Toggle loop mode for the current player.",
          usage: "$loop [none|track|queue]",
        },
        {
          name: "$move",
          aliases: ["mv"],
          permission: null,
          description: "Move a queued track from one position to another.",
          usage: "$move <from> <to>",
        },
        {
          name: "$nowplaying",
          aliases: ["np", "song", "current"],
          permission: null,
          description: "Show the currently playing track.",
          usage: "$nowplaying",
        },
        {
          name: "$pause",
          aliases: [],
          permission: null,
          description: "Pause the currently playing track.",
          usage: "$pause",
        },
        {
          name: "$peek",
          aliases: [],
          permission: null,
          description: "Show a minimal view of the currently playing track.",
          usage: "$peek",
        },
        {
          name: "$play",
          aliases: ["p"],
          permission: null,
          description: "Play a song or add it to the queue, including JioSaavn searches with the jssearch: prefix.",
          usage: "$play <song name, URL, or jssearch:query>",
        },
        {
          name: "$queue",
          aliases: ["q", "list"],
          permission: null,
          description: "Show completed, current, and upcoming tracks.",
          usage: "$queue [page]",
        },
        {
          name: "$remove",
          aliases: ["rm"],
          permission: null,
          description: "Remove a track from the queue by position.",
          usage: "$remove <position>",
        },
        {
          name: "$resume",
          aliases: ["unpause", "res"],
          permission: null,
          description: "Resume a paused track.",
          usage: "$resume",
        },
        {
          name: "$seek",
          aliases: [],
          permission: null,
          description: "Seek within the current track.",
          usage: "$seek <time>",
        },
        {
          name: "$filter",
          aliases: ["filters"],
          permission: null,
          description:
            "Apply, remove, or reset multiple music filters at once. Use help or available to see every supported filter.",
          usage:
            "$filter <filter ...>\n$filter remove <filter ...>\n$filter reset\n$filter clear\n$filter help\n$filter available",
        },
        {
          name: "$servervolume",
          aliases: ["svol", "sv"],
          permission: "Manage Server",
          description: "Set or view the persistent server playback volume.",
          usage: "$servervolume [1-100]",
        },
        {
          name: "$shuffle",
          aliases: ["sh"],
          permission: null,
          description: "Shuffle the upcoming tracks in the queue.",
          usage: "$shuffle",
        },
        {
          name: "$skip",
          aliases: ["s", "next"],
          permission: null,
          description: "Skip the currently playing track.",
          usage: "$skip",
        },
        {
          name: "$skipto",
          aliases: ["st", "jumpto", "jt"],
          permission: null,
          description: "Skip to a specific track in the queue.",
          usage: "$skipto <position>",
        },
        {
          name: "$stop",
          aliases: ["dc"],
          permission: null,
          description:
            "Stop playback and disconnect the bot. In 24/7 mode, stops the queue but keeps the bot in voice.",
          usage: "$stop",
        },
        {
          name: "$volume",
          aliases: ["vol", "v"],
          permission: null,
          description: "Set or view playback volume.",
          usage: "$volume [1-100]",
        },
        {
          name: "$song-cover",
          aliases: ["cover", "songcover", "coverart"],
          permission: null,
          description: "Search iTunes for a song and show its cover art.",
          usage: "$song-cover <song name or \"Song Name - Artist Name\">",
        },
      ],
    },
    {
      name: "Features",
      icon: Layers,
      commands: [
        {
          name: "$reactionroles",
          aliases: ["rr"],
          permission: "Manage Server",
          description:
            "Manage emoji-to-role mappings on existing messages with a simple add panel, direct add/remove actions, and server reset.",
          usage:
            "$reactionroles list\n$reactionroles add <message>\n$reactionroles add <message> <reaction emoji> <role>\n$reactionroles remove <message> <reaction emoji or role>\n$reactionroles removeall <message>\n$reactionroles reset",
        },
        {
          name: "$starboard",
          aliases: ["stars"],
          permission: "Manage Server",
          description:
            "Configure a live reaction starboard with thresholds, custom emoji, ignore lists, manual sync, and an interactive CV2 status panel.",
          usage:
            "$starboard\n$starboard channel <#channel>\n$starboard threshold <number>\n$starboard emoji <emoji>\n$starboard color <#hex>\n$starboard ignore <add|remove> <#channel|@role>\n$starboard config\n$starboard toggle <on|off>\n$starboard top\n$starboard sync [<#channel>]",
        },
        {
          name: "$randomstar",
          aliases: ["randomstars", "randomstarboard"],
          permission: null,
          description: "Show a random historical starboard post.",
          usage: "$randomstar",
        },
        {
          name: "$afk",
          aliases: [],
          permission: null,
          description:
            "Set AFK (server or global). Auto-removed on your next message.",
          usage: "$afk [reason]",
        },
        {
          name: "$sticky",
          aliases: [],
          permission: "Manage Server",
          description:
            "Manage sticky messages: re-posted at the bottom on every new message.",
          usage:
            "$sticky set text <content>\n$sticky enable\n$sticky disable\n$sticky view",
        },
        {
          name: "$honeypot",
          aliases: ["trap"],
          permission: "Manage Server",
          description: "Configure a honeypot channel that moderates anyone who posts in it.",
          usage: "$honeypot setup",
        },
        {
          name: "$alias",
          aliases: [],
          permission: null,
          description: "Create a personal private shortcut for any command.",
          usage:
            "$alias create <name> <command>\n$alias list\n$alias delete <name>",
        },
        {
          name: "$invoke",
          aliases: [],
          permission: null,
          description: "Set personal responses for supported moderation commands.",
          usage:
            "$invoke set <command> <message>\n$invoke remove <command>\n$invoke list",
        },
        {
          name: "$greet",
          aliases: ["welcomer", "welcome"],
          permission: "Manage Server",
          description: "Show current welcomer configuration for this server.",
          usage: "$greet",
        },
        {
          name: "$greet channel set",
          aliases: ["welcomer", "welcome"],
          permission: "Manage Server",
          description: "Set the channel where welcome messages are sent.",
          usage: "$greet channel set <#channel>",
        },
        {
          name: "$greet channel remove",
          aliases: ["welcomer", "welcome"],
          permission: "Manage Server",
          description:
            "Remove the greet channel, which disables welcome messages.",
          usage: "$greet channel remove",
        },
        {
          name: "$greet channel view",
          aliases: ["welcomer", "welcome"],
          permission: "Manage Server",
          description: "View the current greet settings.",
          usage: "$greet channel view",
        },
        {
          name: "$greet message set",
          aliases: ["welcomer", "welcome"],
          permission: "Manage Server",
          description:
            "Set the welcome message text, optionally with a saved data payload.",
          usage: "$greet message set <text> [data: <name>]",
        },
        {
          name: "$greet message remove",
          aliases: ["welcomer", "welcome"],
          permission: "Manage Server",
          description: "Clear the welcome message.",
          usage: "$greet message remove",
        },
        {
          name: "$greet test",
          aliases: ["welcomer", "welcome"],
          permission: "Manage Server",
          description: "Send a test welcome message as if you just joined.",
          usage: "$greet test",
        },
        {
          name: "$greet bots",
          aliases: ["welcomer", "welcome"],
          permission: "Manage Server",
          description: "Toggle whether bot joins trigger the welcome message.",
          usage: "$greet bots [on|off]",
        },
        {
          name: "$birthday",
          aliases: ["bday", "bd"],
          permission: null,
          description: "Show server birthday config and your own birthday.",
          usage: "$birthday",
        },
        {
          name: "$birthday set",
          aliases: ["bday", "bd"],
          permission: null,
          description: "Set your birthday, applies across all mutual servers.",
          usage: "$birthday set <date>",
        },
        {
          name: "$birthday unset",
          aliases: ["bday", "bd"],
          permission: null,
          description: "Remove your birthday.",
          usage: "$birthday unset",
        },
        {
          name: "$birthday list",
          aliases: ["bday", "bd"],
          permission: null,
          description:
            "Upcoming birthdays of members in this server, sorted by soonest.",
          usage: "$birthday list",
        },
        {
          name: "$birthday channel set",
          aliases: ["bday", "bd"],
          permission: "Manage Server",
          description: "Set the channel for birthday announcements.",
          usage: "$birthday channel set <#channel>",
        },
        {
          name: "$birthday channel remove",
          aliases: ["bday", "bd"],
          permission: "Manage Server",
          description: "Remove the birthday announcement channel.",
          usage: "$birthday channel remove",
        },
        {
          name: "$birthday message set",
          aliases: ["bday", "bd"],
          permission: "Manage Server",
          description:
            "Set the birthday announcement text or link a saved payload.",
          usage:
            "$birthday message set <text>\n$birthday message set data:<name>",
        },
        {
          name: "$log",
          aliases: ["logs", "logging"],
          permission: "Manage Server",
          description:
            "Open the interactive logging config panel or set a category inline.",
          usage:
            "$log\n$log <category> <#channel>\n$log <category> enable|disable",
        },
        {
          name: "$log channel",
          aliases: ["logs", "logging"],
          permission: "Manage Server",
          description:
            "Configure logging for channel events (create, delete, update).",
          usage: "$log channel <#channel|enable|disable>",
        },
        {
          name: "$log member",
          aliases: ["logs", "logging"],
          permission: "Manage Server",
          description: "Configure logging for member join/leave/update events.",
          usage: "$log member <#channel|enable|disable>",
        },
        {
          name: "$log message",
          aliases: ["logs", "logging"],
          permission: "Manage Server",
          description: "Configure logging for message edits and deletes.",
          usage: "$log message <#channel|enable|disable>",
        },
        {
          name: "$log modlog",
          aliases: ["logs", "logging"],
          permission: "Manage Server",
          description:
            "Configure the modlog channel (ban, kick, timeout, warn, etc.).",
          usage: "$log modlog <#channel|enable|disable>",
        },
        {
          name: "$log role",
          aliases: ["logs", "logging"],
          permission: "Manage Server",
          description:
            "Configure logging for role create/delete/update events.",
          usage: "$log role <#channel|enable|disable>",
        },
        {
          name: "$log vc",
          aliases: ["logs", "logging"],
          permission: "Manage Server",
          description: "Configure logging for voice state changes.",
          usage: "$log vc <#channel|enable|disable>",
        },
        {
          name: "$log server",
          aliases: ["logs", "logging"],
          permission: "Manage Server",
          description: "Configure logging for server (guild) update events.",
          usage: "$log server <#channel|enable|disable>",
        },
        {
          name: "$autoresponder",
          aliases: ["ares", "autoresponders"],
          permission: "Manage Server",
          description:
            "Create, edit, and manage triggers that auto-reply or react to matching messages.",
          usage:
            "$autoresponder\n$autoresponder add <trigger>\n$autoresponder list\n$autoresponder remove <trigger>",
        },
        {
          name: "$customrole create",
          aliases: ["cr", "crole"],
          permission: "Administrator",
          description:
            "Register a keyword and link up to 5 roles. All custom-role keywords use the server-wide access role configured with `$customrole access`. Max 15 keywords per server. Does not work with noprefix.",
          usage: "$customrole create <keyword> <@role> [@role2 …]",
        },
        {
          name: "$customrole use",
          aliases: ["cr", "crole"],
          permission: null,
          description:
            "Assign or remove a custom-role keyword's linked roles from up to 10 users by mention, user ID, username, or display name.",
          usage:
            "$<keyword> <@user|user-id|username> …\n$<keyword> remove <@user|user-id|username> …",
        },
        {
          name: "$customrole access",
          aliases: ["cr", "crole"],
          permission: "Administrator",
          description:
            "Set the single access role required to use every custom-role keyword in this server. Server owners bypass it.",
          usage: "$customrole access <@role>",
        },
        {
          name: "$customrole delete",
          aliases: ["cr", "crole"],
          permission: "Administrator",
          description: "Remove a custom role keyword from the server.",
          usage: "$customrole delete <keyword>",
        },
        {
          name: "$customrole list",
          aliases: ["cr", "crole"],
          permission: "Administrator",
          description:
            "Show all custom role keywords configured in this server and the single server-wide access role.",
          usage: "$customrole list",
        },
        {
          name: "$customrole info",
          aliases: ["cr", "crole"],
          permission: "Administrator",
          description:
            "Show the roles linked to a specific keyword and the server-wide custom-role access role.",
          usage: "$customrole info <keyword>",
        },
        {
          name: "$customrole add",
          aliases: ["cr", "crole"],
          permission: "Administrator",
          description:
            "Link additional roles to an existing keyword (max 5 total per keyword).",
          usage: "$customrole add <keyword> <@role> [@role2 …]",
        },
        {
          name: "$customrole remove",
          aliases: ["cr", "crole"],
          permission: "Administrator",
          description:
            "Unlink specific roles from a keyword. If the last role is removed, the keyword is deleted.",
          usage: "$customrole remove <keyword> <@role> [@role2 …]",
        },
        {
          name: "$translate",
          aliases: [
            "tr",
            "translate-es",
            "translate-hi",
            "translate-fr",
            "translate-de",
            "translate-ja",
            "translate-es-mx",
          ],
          permission: null,
          description:
            "Translate text from any language to English (default) or a target language. Use $translate-es for Spanish, $translate-hi for Hindi, $translate-fr for French, $translate-de for German, $translate-ja for Japanese, $translate-es-mx for Mexican Spanish.",
          usage:
            "$translate <text>\n$translate-es <text>\n$translate-hi <text>\n$translate-fr <text>\n$translate-de <text>\n$translate-ja <text>\n$translate-es-mx <text>",
        },
        {
          name: "$embed",
          aliases: ["embedbuilder", "eb"],
          permission: null,
          description:
            "Interactive classic-embed builder with live preview, fields, and link buttons.",
          usage: "$embed",
        },
        {
          name: "$container",
          aliases: ["cb", "containerbuilder", "build"],
          permission: null,
          description:
            "Interactive CV2 message builder: text, info card, photo grid, quick links.",
          usage: "$container",
        },
        {
          name: "$webhook",
          aliases: ["webhooks", "wh"],
          permission: "Manage Webhooks",
          description:
            "Interactive webhook manager: create, send, rename, move, delete.",
          usage: "$webhook",
        },
        {
          name: "$autorole",
          aliases: ["ar", "autoroles"],
          permission: "Manage Roles",
          description:
            "Configure roles given automatically to new members or bots.",
          usage:
            "$autorole member add @role\n$autorole bot add @role\n$autorole member|bot remove @role\n$autorole list\n$autorole clear",
        },
        {
          name: "$impersonate",
          aliases: ["mimic"],
          permission: "Manage Messages",
          description:
            "Send a message as another server member via a temporary webhook using their server nickname and avatar. Webhook is deleted immediately after sending, and the command message is deleted so only the impersonated message remains.",
          usage: "$impersonate <@user|ID> <text>",
        },
      ],
    },
    {
      name: "Data",
      icon: MessageSquare,
      commands: [
        {
          name: "$create-data",
          aliases: ["createdata", "cdata"],
          permission: "Administrator",
          description:
            "Save a reusable message, embed, or CV2 payload for later.",
          usage: "$create-data <message|embed|cv2> [content or attachment]",
        },
        {
          name: "$view-data",
          aliases: ["viewdata", "vdata"],
          permission: "Administrator",
          description:
            "Browse and send saved payloads via an interactive dropdown.",
          usage: "$view-data",
        },
        {
          name: "$delete-data",
          aliases: ["deletedata", "ddata", "deldata"],
          permission: "Administrator",
          description: "Delete saved data with a confirm/cancel prompt.",
          usage: "$delete-data",
        },
        {
          name: "$send-data",
          aliases: ["senddata", "sdata"],
          permission: "Administrator",
          description:
            "Send a saved payload directly; the panel disappears after send.",
          usage: "$send-data",
        },
      ],
    },
    {
      name: "Customisation",
      icon: Heart,
      commands: [
        {
          name: "$customise",
          aliases: ["customize"],
          permission: "Administrator",
          description:
            "Interactive profile panel: edit the bot's name, bio, avatar, and banner; set the namestyle; or reset to global defaults. Session active 10 minutes.",
          usage: "$customise",
        },
        {
          name: "$namestyle",
          aliases: ["ns"],
          permission: "Manage Server",
          description: "Set the bot's display name style for your server.",
          usage: "$namestyle",
        },
        {
          name: "$setavatar",
          aliases: ["setav", "setpfp"],
          permission: "Administrator",
          description: "Change the bot's avatar (developer).",
          usage: "$setavatar [image URL or attachment]",
        },
        {
          name: "$setbanner",
          aliases: ["setbn", "setcover"],
          permission: "Administrator",
          description: "Change the bot's profile banner.",
          usage: "$setbanner [image URL or attachment]",
        },
        {
          name: "$setbio",
          aliases: [],
          permission: "Administrator",
          description: "Change the bot's about-me bio.",
          usage: "$setbio <text>",
        },
        {
          name: "$setname",
          aliases: ["setnick"],
          permission: "Administrator",
          description: "Change the bot's username.",
          usage: "$setname <name>",
        },
        {
          name: "$resetprofile",
          aliases: [],
          permission: "Administrator",
          description: "Reset bot profile to default values.",
          usage: "$resetprofile",
        },
      ],
    },
    {
      name: "Fun",
      icon: Sparkles,
      commands: [
        {
          name: "$ship",
          aliases: [],
          permission: null,
          description: "Generate a compatibility image for two users.",
          usage: "$ship <@user1> <@user2>",
        },
        {
          name: "$howgay",
          aliases: ["gay"],
          permission: null,
          description: "See how gay someone is, returns a percentage rating.",
          usage: "$howgay [@user]",
        },
        {
          name: "$howsimp",
          aliases: ["simp"],
          permission: null,
          description: "See how much of a simp someone is.",
          usage: "$howsimp [@user]",
        },
        {
          name: "$howcute",
          aliases: ["cute"],
          permission: null,
          description: "Rate how cute someone is.",
          usage: "$howcute [@user]",
        },
        {
          name: "$howautistic",
          aliases: ["autistic"],
          permission: null,
          description: "Rate someone's autism level.",
          usage: "$howautistic [@user]",
        },
        {
          name: "$howintelligent",
          aliases: ["intelligent", "iq", "howsmart", "intelligence"],
          permission: null,
          description: "Rate someone's IQ / intelligence.",
          usage: "$howintelligent [@user]",
        },
        {
          name: "$howrizz",
          aliases: ["rizz"],
          permission: null,
          description: "See how much rizz someone has.",
          usage: "$howrizz [@user]",
        },
        {
          name: "$wanted",
          aliases: [],
          permission: null,
          description: "Generate a Wild West wanted poster for a user.",
          usage: "$wanted [@user]",
        },
        {
          name: "$whowouldwin",
          aliases: ["wwn"],
          permission: null,
          description: "See who would win in a battle between two users.",
          usage: "$whowouldwin <@user1> <@user2>",
        },
        {
          name: "$tictactoe",
          aliases: ["ttt"],
          permission: null,
          description: "Play tic tac toe against another member or the bot.",
          usage: "$tictactoe [@user]",
        },
        {
          name: "$rps",
          aliases: ["rockpaperscissors"],
          permission: null,
          description:
            "Rock paper scissors: vs the bot or PvP against another user.",
          usage: "$rps [@user]",
        },
        {
          name: "$presidential-alert",
          aliases: ["pre-alert", "funalert", "fun-alert"],
          permission: null,
          description: "Generate an iPhone Presidential Alert image from text.",
          usage: "$presidential-alert <text>",
        },
        {
          name: "$achievement",
          aliases: [],
          permission: null,
          description: "Generate a Minecraft-style achievement image from text.",
          usage: "$achievement <text>",
        },
        {
          name: "$car",
          aliases: [],
          permission: null,
          description: "Show a random car image.",
          usage: "$car",
        },
        {
          name: "$guessthenumber",
          aliases: ["gtn"],
          permission: null,
          description: "Guess the number the bot is thinking of.",
          usage: "$guessthenumber",
        },
      ],
    },
    {
      name: "Roleplay",
      icon: Heart,
      commands: roleplayCommands,
    },
  ] as const,

  faqs: [
    {
      q: "Is Cassie free to use?",
      a: "Yes, completely. All commands and features are free with no premium tiers or paywalls.",
    },
    {
      q: "What is the default prefix?",
      a: "The default prefix is `$`. Server admins can change it with `$setprefix`, and individual users can set a personal prefix with `$selfprefix`.",
    },
    {
      q: "How do I add Cassie to my server?",
      a: 'Click the "Add to Discord" button, authorize the bot, and you\'re ready. The bot works immediately with no setup required.',
    },
    {
      q: "Does Cassie support slash commands?",
      a: "Yes. Most commands have both a prefix variant and a slash command. Slash commands are globally registered at startup.",
    },
    {
      q: "Does Cassie read or log my messages?",
      a: "Only if you explicitly enable the message logging category with `$log message`. The bot does not store message content by default.",
    },
    {
      q: "How does the antinuke system work?",
      a: "Cassie watches 11 event types and tracks action counts in sliding time windows. When a threshold is crossed the actor is punished (kick, ban, strip roles, or quarantine) and the damage is reverted where possible, with no setup required.",
    },
    {
      q: "Can I use Cassie without a prefix?",
      a: "Noprefix access is granted by the developer to specific trusted users. You can also @mention the bot as a prefix.",
    },
    {
      q: "Where can I get help or report a bug?",
      a: "Join the support server at discord.gg/YpCfcCTXdv and post in the appropriate channel.",
    },
  ],
};

// Total command count is derived from the actual command list above —
// never hand-edit `botConfig.commandCount`, it's overwritten here so every
// page (hero stats, footer, about, commands header) always agrees.
//
// Rows above list every subcommand/usage variant separately for
// documentation purposes (e.g. `$antinuke status`, `$antinuke enable`, ...
// all live under one `$antinuke` command). The count must dedupe by the
// base command name so it matches the bot's own command total (each
// command *file*, not each documented subcommand row).
botConfig.commandCount = new Set(
  site.commandCategories.flatMap((cat) =>
    cat.commands.map((cmd) => cmd.name.split(" ")[0]),
  ),
).size;

export type CommandCategory = (typeof site.commandCategories)[number];
export type Command = CommandCategory["commands"][number];

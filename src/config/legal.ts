/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LEGAL — Privacy Policy & Terms of Service Config
 *  Edit the text below to update the content shown on the /privacy and
 *  /terms pages. Each entry in `sections` renders as its own block with a
 *  heading, optional intro paragraph, and a list of clauses.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const legalConfig = {
  effectiveDate: 'July 12, 2026',
  lastUpdated:   'July 12, 2026',

  privacyPolicy: {
    title:   'Privacy Policy',
    summary: 'This Privacy Policy explains what information Cassie ("the Bot", "we", "us") collects when you use the Bot on Discord or visit this website, why we collect it, and how you can control it.',
    sections: [
      {
        heading: '1. Information We Collect',
        intro:   'Cassie is a Discord bot, and the information it processes comes almost entirely from Discord\'s own platform and the servers you add it to. We collect and store only what is needed to provide the features you and your server enable.',
        clauses: [
          'Discord identifiers: user IDs, server (guild) IDs, channel IDs, and role IDs, used to associate settings and data with the correct account or server.',
          'Server configuration: prefixes, log channel settings, autorole rules, sticky messages, autoresponder triggers, welcomer and birthday configuration, antinuke module settings, and similar settings you configure with commands.',
          'User-submitted content: warnings issued by moderators, saved message/embed/CV2 payloads created with data commands, birthdays you set, aliases you create, and AFK statuses/messages.',
          'Moderation records: bans, kicks, timeouts, and warnings carried out through the Bot, including the reason text provided by the moderator.',
          'Command usage metadata: which commands are run, in which server, and when. Used for rate-limiting, debugging, and abuse prevention. We do not log full command arguments beyond what is needed to operate the feature.',
          'Message content: only processed transiently for features that require it (e.g. autoresponders, sticky messages, snipe/reaction-snipe, purge filters). Message content is not permanently stored unless a server explicitly enables message logging with `$log message`, and even then only metadata and, where necessary, the message content relevant to the logged event is kept.',
          'Website usage: the landing page itself does not use tracking cookies or third-party analytics. Standard web server logs (IP address, user agent, request timestamp) may be retained briefly by our hosting provider for security and abuse prevention.',
        ],
      },
      {
        heading: '2. How We Use Information',
        clauses: [
          'To operate and provide the features you and your server administrators enable (moderation, logging, welcomer, birthdays, antinuke, utility commands, etc.).',
          'To enforce per-server and per-user configuration such as custom prefixes, self-prefixes, and namestyles.',
          'To detect, investigate, and respond to abuse, exploitation, or violations of these policies, including antinuke enforcement actions.',
          'To maintain, debug, and improve the Bot\'s reliability and performance.',
          'To respond to support requests made in our support server.',
        ],
      },
      {
        heading: '3. Data Storage & Retention',
        clauses: [
          'Data is stored in a secured database and is only accessible to the Bot\'s backend services and the developer.',
          'Server-specific configuration and data are retained for as long as the Bot remains in that server. If the Bot is removed from a server, associated server configuration is scheduled for deletion; some records (e.g. antinuke incident logs) may be retained briefly for security review.',
          'User-specific data (such as a set birthday, self-prefix, or AFK status) is retained until you remove it yourself with the relevant command, or until you request deletion as described in Section 6.',
          'Saved data payloads (embeds, CV2 containers, messages created with `$create-data`) are retained until deleted by an authorized server admin using `$delete-data`.',
          'We do not sell, rent, or trade your data to third parties.',
        ],
      },
      {
        heading: '4. Data Sharing',
        intro:   'We do not share your data with third parties for advertising or marketing purposes. Limited sharing occurs only in the following circumstances:',
        clauses: [
          'With Discord Inc., as an inherent part of operating a Discord bot on their platform, subject to Discord\'s own Privacy Policy and Terms of Service.',
          'With infrastructure and hosting providers strictly to store data and run the Bot (e.g. database hosting, process hosting). These providers do not have independent rights to use your data.',
          'When required by law, legal process, or to protect the rights, property, or safety of the Bot, its users, or the public.',
          'With your explicit consent, or at your direction (for example, when a server admin sends a saved data payload).',
        ],
      },
      {
        heading: '5. Your Rights & Choices',
        clauses: [
          'You can view, change, or remove most personal settings directly through Bot commands (e.g. `$birthday unset`, `$selfprefix remove`, `$afk`, `$alias delete`).',
          'Server administrators can disable data-collecting features at any time (e.g. disabling `$log message`, clearing warnings with `$clearwarnings`, or removing the Bot from the server entirely).',
          'You may request a copy of the personal data we hold about you, or request its deletion, by contacting us through the support server listed in Section 8.',
          'Removing the Bot from your server does not automatically delete historical moderation records tied to individual users if those users remain subject to ongoing investigations of abuse; such records are deleted once no longer needed.',
        ],
      },
      {
        heading: '6. Data Deletion Requests',
        clauses: [
          'To request deletion of your personal data, join our support server and open a request in the appropriate channel, or contact the developer directly through the links on the About page.',
          'We will verify the request is being made by the relevant Discord account and process deletion within a reasonable time, except where retention is required for security, legal, or fraud-prevention purposes.',
        ],
      },
      {
        heading: '7. Children\'s Privacy',
        clauses: [
          'Cassie is intended for use in accordance with Discord\'s Terms of Service, which requires users to be at least 13 years old (or the minimum age required in your country).',
          'We do not knowingly collect data from children under the applicable minimum age. If we become aware that we have done so, we will delete the relevant data.',
        ],
      },
      {
        heading: '8. Contact',
        clauses: [
          'For privacy questions, data requests, or concerns, join the support server linked from the site footer or the About page, or reach out to the developer via the GitHub profile linked on the About page.',
        ],
      },
      {
        heading: '9. Changes to This Policy',
        clauses: [
          'We may update this Privacy Policy from time to time to reflect changes in the Bot\'s features or legal requirements. Material changes will be reflected by updating the "Last updated" date at the top of this page. Continued use of the Bot after changes take effect constitutes acceptance of the revised policy.',
        ],
      },
    ],
  },

  termsOfService: {
    title:   'Terms of Service',
    summary: 'These Terms of Service ("Terms") govern your access to and use of Cassie (the "Bot") and this website (the "Site"). By adding the Bot to a server, using its commands, or accessing the Site, you agree to these Terms.',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        clauses: [
          'By inviting Cassie to a Discord server, interacting with any of its commands, or using this website, you agree to be bound by these Terms and by Discord\'s own Terms of Service and Community Guidelines.',
          'If you do not agree to these Terms, do not add the Bot to a server or use the Site.',
          'If you are using the Bot on behalf of a server, you represent that you have the authority to accept these Terms for that server and its members.',
        ],
      },
      {
        heading: '2. Eligibility',
        clauses: [
          'You must meet Discord\'s minimum age requirement (13 years, or higher where required by local law) to use the Bot or the Site.',
          'You are responsible for ensuring your use of the Bot complies with the laws applicable to you and your server\'s members.',
        ],
      },
      {
        heading: '3. Description of Service',
        clauses: [
          'Cassie provides moderation, antinuke protection, logging, utility, welcomer, birthday, and fun/entertainment features for Discord servers, accessible via prefix commands and slash commands, all free of charge.',
          'Features are provided on an "as available" basis and may be added, changed, limited, or removed at any time without prior notice.',
          'The Bot is provided free of charge. There are no premium tiers, paywalls, or paid features at this time; if that changes, these Terms will be updated accordingly.',
        ],
      },
      {
        heading: '4. Acceptable Use',
        intro:   'You agree not to use the Bot or the Site to:',
        clauses: [
          'Violate Discord\'s Terms of Service, Community Guidelines, or any applicable law.',
          'Attempt to exploit, reverse-engineer, abuse, or overload the Bot\'s commands, rate limits, or infrastructure.',
          'Use the Bot\'s moderation or antinuke features to harass, discriminate against, or unlawfully target any individual or group.',
          'Circumvent, disable, or interfere with the antinuke, moderation, or logging systems in a server you do not own or administer without authorization.',
          'Use saved-data, embed, or webhook features to distribute spam, malware, phishing links, or illegal content.',
          'Impersonate the Bot, its developer, or Discord staff.',
          'Resell, sublicense, or represent the Bot as your own product without the developer\'s permission.',
        ],
      },
      {
        heading: '5. Server Administrator Responsibilities',
        clauses: [
          'Server administrators who configure the Bot (permissions, logging, autoresponders, welcomer messages, saved data, etc.) are responsible for ensuring that configuration complies with these Terms and applicable law.',
          'Administrators are responsible for managing which roles have access to sensitive commands (e.g. antinuke configuration, data commands, moderation commands) via Discord\'s own permission system.',
          'The developer is not responsible for misconfiguration, misuse, or unauthorized access resulting from a server\'s own permission settings.',
        ],
      },
      {
        heading: '6. Moderation & Antinuke Actions',
        clauses: [
          'Moderation commands (ban, kick, timeout, warn, strip, purge, etc.) and antinuke enforcement actions are executed based on the configuration set by each server\'s administrators, or on default thresholds where no custom configuration exists.',
          'The developer is not liable for actions taken by the Bot in good-faith execution of a server\'s own configuration, including punitive actions against members who trigger antinuke thresholds.',
          'Administrators are responsible for reviewing and adjusting antinuke thresholds, whitelists, and punishment types to suit their server\'s needs.',
        ],
      },
      {
        heading: '7. Availability & Disclaimer of Warranties',
        clauses: [
          'The Bot and Site are provided "as is" and "as available," without warranties of any kind, whether express or implied, including but not limited to fitness for a particular purpose, non-infringement, or uninterrupted availability.',
          'We do not guarantee that the Bot will be error-free, available at all times, or free from bugs. Downtime may occur due to maintenance, hosting issues, Discord API outages, or factors outside our control.',
          'Features described on the Site reflect the Bot\'s intended functionality and may differ slightly from actual behavior as the Bot evolves.',
        ],
      },
      {
        heading: '8. Limitation of Liability',
        clauses: [
          'To the maximum extent permitted by law, the developer shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, loss of server content, or loss of goodwill, arising from your use of or inability to use the Bot or Site.',
          'This includes, without limitation, damages resulting from moderation or antinuke actions, data loss due to bugs, or third-party service outages (including Discord itself).',
          'Nothing in these Terms limits liability where such limitation is not permitted by applicable law.',
        ],
      },
      {
        heading: '9. Termination',
        clauses: [
          'We may suspend or terminate the Bot\'s access to your server, or your access to specific features, at any time if we reasonably believe these Terms have been violated.',
          'Server administrators may remove the Bot from their server at any time, which will stop all further processing of that server\'s data by the Bot going forward.',
        ],
      },
      {
        heading: '10. Intellectual Property',
        clauses: [
          'The Bot\'s name, branding, and original source code are the property of the developer unless otherwise licensed (see the GitHub repository linked from the About page for applicable open-source licensing, if any).',
          'You retain ownership of content you create using the Bot (e.g. saved embeds, custom messages), but grant the Bot the necessary technical permission to store and transmit that content in order to provide the requested feature.',
        ],
      },
      {
        heading: '11. Third-Party Services',
        clauses: [
          'The Bot operates on top of the Discord API and is subject to Discord\'s availability, rate limits, and policy changes, which are outside our control.',
          'Some features may rely on third-party services (e.g. image hosting) solely to provide bot functionality; use of those features is also subject to the relevant third party\'s terms.',
        ],
      },
      {
        heading: '12. Changes to These Terms',
        clauses: [
          'We may revise these Terms at any time. Material changes will be reflected by updating the "Last updated" date at the top of this page. Continued use of the Bot or Site after changes take effect constitutes acceptance of the revised Terms.',
        ],
      },
      {
        heading: '13. Contact',
        clauses: [
          'Questions about these Terms can be directed to the support server or the developer, both linked from the site footer and the About page.',
        ],
      },
    ],
  },
};

export type LegalSection = {
  heading: string;
  intro?:  string;
  clauses: string[];
};

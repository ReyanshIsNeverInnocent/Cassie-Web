import { Link } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';
import { site, developerConfig } from '@/config/site';
import DiscordMark from './DiscordMark';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 pb-10 px-4">
      <div className="container max-w-5xl">
        <div className="liquid-glass rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-10">

            {/* Brand */}
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 group w-fit">
                <div className="h-9 w-9 rounded-xl bg-aurora animate-aurora grid place-items-center shadow-[var(--shadow-glow)] overflow-hidden">
                  {site.bot.botAvatar ? (
                    <img src={site.bot.botAvatar} alt={site.bot.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-white font-display font-bold text-sm">
                      {site.bot.name.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="font-display font-bold text-lg">Cassie</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
                {site.bot.description}
              </p>
              <div className="flex gap-2.5 mt-5">
                <a
                  href={site.bot.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="liquid-glass h-10 w-10 rounded-full grid place-items-center hover:scale-110 transition-transform"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={site.bot.supportUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Discord"
                  className="liquid-glass h-10 w-10 rounded-full grid place-items-center hover:scale-110 transition-transform"
                >
                  <DiscordMark className="h-4 w-4 text-primary" />
                </a>
              </div>
            </div>

            {/* Navigate */}
            <div>
              <h4 className="font-display font-semibold mb-4 text-sm tracking-wider uppercase text-muted-foreground">Navigate</h4>
              <ul className="space-y-2.5">
                {site.nav.map((n) => (
                  <li key={n.href}>
                    <Link
                      to={n.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display font-semibold mb-4 text-sm tracking-wider uppercase text-muted-foreground">Resources</h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: 'Add to Discord',  href: site.bot.inviteUrl, external: true },
                  { label: 'Support Server',  href: site.bot.supportUrl, external: true },
                  { label: 'GitHub',          href: site.bot.githubUrl, external: true },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                      {l.external && <ExternalLink className="h-3 w-3 opacity-50" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-muted-foreground">
              © {year} Cassie · Made with care by {developerConfig.name}
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <p className="text-xs text-muted-foreground">
                Prefix: <code className="font-mono text-primary">$</code>
                &nbsp;·&nbsp;{site.bot.uptime} uptime
              </p>
              <p className="text-xs text-muted-foreground">
                Last updated: {site.lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

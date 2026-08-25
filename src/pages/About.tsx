import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, ExternalLink, Github, UserPlus } from 'lucide-react';
import { developerConfig } from '@/config/developer';
import DiscordMark from '@/components/DiscordMark';

/* ─── Language badge icons ────────────────────────────────────────────────── */
function JavaScriptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="5" fill="#F7DF1E" />
      <path
        fill="#000"
        d="M16.32 16.6c.33.54.76.94 1.52.94.64 0 1.05-.32 1.05-.76 0-.53-.42-.72-1.12-1.02l-.38-.17c-1.11-.47-1.85-1.07-1.85-2.33 0-1.16.88-2.04 2.27-2.04.98 0 1.69.34 2.2 1.24l-1.2.78c-.27-.48-.56-.67-1-.67-.46 0-.75.29-.75.67 0 .47.29.66.94.94l.38.16c1.31.56 2.05 1.14 2.05 2.44 0 1.4-1.1 2.16-2.57 2.16-1.44 0-2.37-.68-2.83-1.58l1.29-.76ZM9.9 16.72c.24.43.46.79.98.79.5 0 .82-.2.82-.96v-5.2h1.65v5.22c0 1.71-1 2.49-2.46 2.49-1.32 0-2.08-.68-2.47-1.5l1.48-.84Z"
      />
    </svg>
  );
}

function TypeScriptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="5" fill="#3178C6" />
      <path
        fill="#fff"
        d="M12.86 12.28h2.7v-1.4H8.9v1.4h2.69v7.4h1.27v-7.4ZM17.6 19.5c-.5 0-.95-.08-1.34-.24a2.9 2.9 0 0 1-.98-.66 2.6 2.6 0 0 1-.55-.94l1.14-.5c.13.36.34.65.6.86.28.2.63.31 1.05.31.24 0 .45-.03.63-.1a1 1 0 0 0 .43-.29.7.7 0 0 0 .15-.45c0-.2-.06-.36-.19-.49a1.7 1.7 0 0 0-.5-.33 6.8 6.8 0 0 0-.68-.26l-.6-.21a4.3 4.3 0 0 1-.87-.42 1.94 1.94 0 0 1-.62-.63 1.76 1.76 0 0 1-.23-.93c0-.42.11-.78.32-1.08.22-.31.51-.54.88-.7a3.2 3.2 0 0 1 1.24-.24c.62 0 1.15.14 1.58.42.44.27.75.65.92 1.13l-1.1.5a1.4 1.4 0 0 0-.51-.63 1.4 1.4 0 0 0-.82-.23c-.22 0-.4.03-.56.1a.86.86 0 0 0-.37.27.68.68 0 0 0-.13.42c0 .2.08.36.24.5.16.13.4.25.72.36l.6.2c.4.14.75.3 1.07.48.32.19.57.41.75.68.19.27.28.6.28 1 0 .43-.12.8-.36 1.11-.23.32-.55.56-.96.73-.4.16-.86.24-1.36.24Z"
      />
    </svg>
  );
}

/* ─── Rotating gradient avatar ring ──────────────────────────────────────── */
function Avatar({
  src, fallbackChar, size = 'lg', decoration,
}: { src?: string; fallbackChar: string; size?: 'sm' | 'lg'; decoration?: string | null }) {
  const dim  = size === 'lg' ? 'h-32 w-32' : 'h-20 w-20';
  const text = size === 'lg' ? 'text-4xl'  : 'text-2xl';
  // Pixel-exact decoration sizing.
  // Outer container: lg=128px (h-32), sm=80px (h-20).
  // Change `1.15` below to tune how tightly the decoration hugs the avatar.
  const outerPx  = size === 'lg' ? 128 : 80;
  const avatarPx = outerPx;
  const decorPx  = avatarPx * 1.20;

  return (
    <div className={`relative ${dim} mx-auto`}>
      {/* Avatar image — the decoration sits directly over this circle */}
      <div className="absolute inset-0 rounded-full overflow-hidden bg-card">
        {src ? (
          <img src={src} alt={fallbackChar} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-aurora grid place-items-center" style={{ backgroundSize: '300% 300%' }}>
            <span className={`font-display font-extrabold text-white select-none ${text}`}>
              {fallbackChar}
            </span>
          </div>
        )}
      </div>
      {/*
        Decoration overlay — positioned as a direct child of the outer `relative`
        div so percentages are irrelevant. We use pixel dimensions (138% of the
        avatar circle) and `transform: translate(-50%, -50%)` to pin the
        decoration's center exactly on the avatar's center regardless of padding.
      */}
      {decoration && (
        <img
          src={decoration}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none"
          style={{
            position:  'absolute',
            top:       '50%',
            left:      '50%',
            transform: 'translate(-50%, -50%)',
            width:     `${decorPx}px`,
            height:    `${decorPx}px`,
            maxWidth:  'none',   // override Tailwind preflight's max-width: 100%
            zIndex:    10,
          }}
        />
      )}
      {/* Glow behind */}
      <div
        className="absolute inset-0 rounded-full bg-aurora opacity-30 blur-2xl -z-10 scale-125"
        style={{ backgroundSize: '300% 300%' }}
      />
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
interface DevProfile { avatar: string | null; decoration: string | null; }

export default function About() {
  useEffect(() => { document.title = `About | Cassie`; }, []);

  const [devProfile, setDevProfile] = useState<DevProfile | null>(null);

  useEffect(() => {
    fetch('/api/developer', { signal: AbortSignal.timeout(8_000) })
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then((p: DevProfile) => setDevProfile(p))
      .catch(() => { /* silently fall back to static config */ });
  }, []);

  return (
    <section className="container max-w-3xl pt-8 pb-28">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">About</span>
        <h1 className="mt-3 font-display font-extrabold text-[2.1rem] sm:text-5xl md:text-6xl tracking-tight">
          One developer.{' '}
          <span
            style={{
              background:           'var(--gradient-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip:       'text',
            }}
          >
            One vision.
          </span>
        </h1>
      </motion.div>

      {/* ── Developer card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0,  scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        className="liquid-glass rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden"
      >
        {/* Ambient glow behind card */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ background: 'var(--gradient-aurora)', backgroundSize: '300% 300%' }}
        />

        {/* Top shimmer line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 opacity-40"
          style={{ background: 'var(--gradient-aurora)', backgroundSize: '300% 100%' }}
        />

        <Avatar
          src={developerConfig.avatar || devProfile?.avatar || undefined}
          fallbackChar={developerConfig.name[0]}
          size="lg"
          decoration={devProfile?.decoration}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-6"
        >
          <h2 className="font-display font-bold text-3xl">{developerConfig.name}</h2>
          <div className="mt-2 badge-lavender inline-block">Creator & Developer</div>
          <p className="mt-5 text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
            {developerConfig.description}
          </p>
        </motion.div>

        {/* Creator links + stack */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-9 grid gap-4 sm:grid-cols-[1.08fr_0.92fr] max-w-xl mx-auto text-left"
        >
          <div className="liquid-glass rounded-2xl p-3.5">
            <div className="px-2 pb-2.5 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary font-semibold">Connect</p>
                <p className="mt-1 text-xs text-muted-foreground">Find the person behind the bot</p>
              </div>
              <div className="h-8 w-8 rounded-xl bg-primary/10 grid place-items-center text-primary">
                <ExternalLink className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/20 px-3 py-3">
                <div className="h-9 w-9 rounded-xl bg-primary/15 grid place-items-center text-primary">
                  <DiscordMark className="h-[18px] w-[18px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">Discord</p>
                  <p className="text-xs text-muted-foreground truncate">@{developerConfig.discordUsername}</p>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_hsl(142_70%_55%_/_0.8)]" />
                  Online
                </span>
              </div>

              <a
                href={developerConfig.discordAddFriendUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-xl bg-primary/[0.09] border border-primary/20 px-3.5 py-2.5 text-primary hover:bg-primary/[0.15] hover:border-primary/35 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span className="h-7 w-7 rounded-lg bg-primary/15 grid place-items-center">
                    <UserPlus className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold">Add me on Discord</span>
                    <span className="block text-[10px] text-muted-foreground">Open my profile to send a request</span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={developerConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border/70 px-3 py-2.5 hover:border-primary/40 hover:bg-primary/[0.06] transition-colors"
              >
                <div className="h-9 w-9 rounded-xl bg-foreground/[0.08] grid place-items-center">
                  <Github className="h-[18px] w-[18px]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">GitHub</p>
                  <p className="text-xs text-muted-foreground">Projects & source code</p>
                </div>
                <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          <div className="liquid-glass rounded-2xl p-3.5 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
            <div className="relative px-2 pb-2.5 flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary font-semibold">Built with</p>
                <p className="mt-1 text-xs text-muted-foreground">The tools behind Cassie</p>
              </div>
              <Code2 className="h-5 w-5 text-primary/70" />
            </div>

            <div className="relative grid grid-cols-2 gap-2">
              {developerConfig.languages.map((lang) => (
                <div
                  key={lang.id}
                  className="rounded-xl border border-border/70 bg-background/20 px-2.5 py-3"
                >
                  <div className="flex items-center gap-2">
                    {lang.id === 'javascript' ? (
                      <JavaScriptIcon className="h-6 w-6 rounded flex-shrink-0" />
                    ) : (
                      <TypeScriptIcon className="h-6 w-6 rounded flex-shrink-0" />
                    )}
                    <span className="text-xs font-semibold">{lang.label}</span>
                  </div>
                  <p className="mt-2 text-[10px] leading-tight text-muted-foreground">
                    {lang.id === 'javascript' ? 'Runtime & tooling' : 'Typed interfaces'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink } from 'lucide-react';
import { site } from '@/config/site';
import NavSearch, { type NavSearchHandle } from './NavSearch';
import ThemeSwitcher from './ThemeSwitcher';
import { themes } from '@/config/themes';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef               = useRef<NavSearchHandle>(null);
  const { pathname }            = useLocation();
  const { theme: activeTheme, setTheme } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);


  // On the homepage, pressing Enter (outside any input) jumps straight to
  // the command search — no need to hunt for it or open /commands first.
  useEffect(() => {
    if (pathname !== '/') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      const el = e.target as HTMLElement;
      const isEditable =
        el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable;
      if (isEditable) return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <div className="container max-w-5xl">
        <nav
          className={`nav-shell rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'shadow-[0_8px_40px_hsl(227_70%_68%/0.12)]' : ''
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            <div className="relative h-8 w-8 rounded-xl bg-aurora animate-aurora grid place-items-center shadow-[var(--shadow-glow)] overflow-hidden">
              {site.bot.botAvatar ? (
                <img src={site.bot.botAvatar} alt={site.bot.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-white font-display font-bold text-sm select-none">
                  {site.bot.name.charAt(0)}
                </span>
              )}
            </div>
            <span className="font-display font-bold text-[17px] tracking-tight">
              Cassie
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {site.nav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-primary/12 border border-primary/25"
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.55 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Search */}
          <NavSearch ref={searchRef} className="hidden lg:block w-48 xl:w-60 mx-2" />

          {/* CTA + theme switcher + mobile trigger */}
          <div className="flex items-center gap-2">
            <a
              href={site.bot.inviteUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex h-10 items-center justify-center gap-1.5 bg-aurora animate-aurora text-white text-sm font-semibold px-5 rounded-full shadow-[var(--shadow-glow)] hover:opacity-90 transition-opacity"
            >
              Invite
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <div className="hidden sm:flex">
              <ThemeSwitcher />
            </div>
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden liquid-glass h-10 w-10 rounded-full grid place-items-center"
              aria-label="Menu"
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1,  y: 0 }}
              exit={{    opacity: 0,  y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 liquid-glass rounded-2xl p-3 flex flex-col gap-1"
            >
              <NavSearch className="mb-1" />
              {site.nav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/12 border border-primary/20 text-foreground'
                        : 'text-muted-foreground hover:bg-muted/40'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              {/* ── Theme picker ── */}
              <div className="mt-1 px-1 py-2 border-t border-border/30">
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground px-1 mb-2">
                  Theme
                </p>
                <div className="flex flex-wrap gap-2 px-1">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      aria-label={t.name}
                      title={t.name}
                      className="relative h-7 w-7 rounded-full flex-shrink-0 transition-transform duration-150 active:scale-90"
                      style={{
                        background: t.previewGradient,
                        boxShadow:
                          activeTheme.id === t.id
                            ? '0 0 0 2.5px hsl(var(--foreground) / 0.85)'
                            : '0 0 0 1.5px hsl(var(--border) / 0.4)',
                      }}
                    >
                      {activeTheme.id === t.id && (
                        <span className="absolute inset-0 rounded-full flex items-center justify-center">
                          <span className="h-2 w-2 rounded-full bg-white/80" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground px-1 mt-1.5">{activeTheme.name}</p>
              </div>

              <a
                href={site.bot.inviteUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-center gap-1.5 bg-aurora animate-aurora text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-[var(--shadow-glow)]"
              >
                Add to Discord <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

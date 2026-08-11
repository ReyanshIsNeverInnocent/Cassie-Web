import { useState, useRef, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, CornerDownLeft } from 'lucide-react';
import { site } from '@/config/site';

export interface NavSearchHandle {
  focus: () => void;
}

type Category = {
  name: string;
  commands: Array<{ name: string; description: string; usage: string }>;
};

/**
 * Global command search, mounted in the navbar. Lets users jump to any
 * command from any page — matches navigate to /commands?q=<query>, where
 * the Commands page picks up the query and shows the matching results.
 */
const NavSearch = forwardRef<NavSearchHandle, { className?: string }>(function NavSearch(
  { className },
  outerRef,
) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const inputRef  = useRef<HTMLInputElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const [query, setQuery]     = useState('');
  const [open,  setOpen]      = useState(false);

  useImperativeHandle(outerRef, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  const categories = site.commandCategories as unknown as Category[];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return categories
      .flatMap((cat) =>
        cat.commands
          .filter(
            (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q),
          )
          .map((c) => ({ ...c, category: cat.name })),
      )
      .slice(0, 6);
  }, [query, categories]);

  // Close dropdown on outside click.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Reset when navigating away.
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const goToCommands = (q: string) => {
    navigate(q ? `/commands?q=${encodeURIComponent(q)}` : '/commands');
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div ref={wrapRef} className={`relative ${className ?? ''}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/70 pointer-events-none" />
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => query && setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') { e.preventDefault(); goToCommands(query); }
          if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
        }}
        placeholder="Search commands…"
        aria-label="Search commands"
        className="w-full liquid-glass nav-search-glass border-0 outline-none h-9 pl-9 pr-9 rounded-full text-sm focus:ring-2 focus:ring-primary/50 transition-all"
        style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.4), 0 0 18px hsl(var(--primary) / 0.08)' }}
      />
      <AnimatePresence>
        {!query && (
          <motion.span
            key="enter-hint"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/60 pointer-events-none"
            aria-hidden="true"
          >
            <CornerDownLeft className="h-3.5 w-3.5" />
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && query && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 mt-2 liquid-glass rounded-2xl p-2 shadow-[var(--shadow-glow)] z-50 max-h-80 overflow-y-auto"
          >
            {results.length === 0 ? (
              <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                No commands matched <em>&ldquo;{query}&rdquo;</em>
              </div>
            ) : (
              <>
                {results.map((cmd) => (
                  <button
                    key={cmd.category + cmd.name}
                    onClick={() => goToCommands(cmd.name)}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-primary/10 transition-colors flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <code className="font-mono text-sm font-semibold text-primary">{cmd.name}</code>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{cmd.description}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-primary/12 text-primary border border-primary/20 font-semibold flex-shrink-0">
                      {cmd.category}
                    </span>
                  </button>
                ))}
                <button
                  onClick={() => goToCommands(query)}
                  className="w-full text-center mt-1 px-3 py-2 rounded-xl text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
                >
                  See all results for &ldquo;{query}&rdquo; →
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default NavSearch;

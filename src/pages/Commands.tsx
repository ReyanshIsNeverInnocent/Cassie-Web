import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShieldCheck } from 'lucide-react';
import { site } from '@/config/site';

type CommandEntry = {
  name: string;
  description: string;
  usage: string;
  aliases?: readonly string[];
  permission?: string | null;
  slash?: boolean;
};

const byName = (a: CommandEntry, b: CommandEntry) => a.name.localeCompare(b.name);
const baseCommandName = (name: string) => name.trim().split(/\s+/)[0].toLowerCase();
const uniqueCommandCount = (commands: CommandEntry[]) =>
  new Set(commands.map((command) => baseCommandName(command.name))).size;

export default function Commands() {
  const categories = site.commandCategories as unknown as Array<{
    name: string;
    icon: React.ElementType;
    commands: CommandEntry[];
  }>;

  const [searchParams, setSearchParams] = useSearchParams();
  const [query,  setQuery]  = useState(searchParams.get('q') ?? '');
  const [active, setActive] = useState(categories[0].name);

  useEffect(() => { document.title = `Commands | Levitate`; }, []);

  // Pick up ?q= from the navbar search (or any deep link) whenever it changes.
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setQuery(q);
  }, [searchParams]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSearchParams(value ? { q: value } : {}, { replace: true });
  };

  const category = categories.find((c) => c.name === active)!;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = !q
      ? category.commands
      : category.commands.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.usage.toLowerCase().includes(q) ||
            c.aliases?.some((a) => a.toLowerCase().includes(q)),
        );
    return [...list].sort(byName);
  }, [query, category]);

  const allFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return categories
      .flatMap((cat) =>
        cat.commands
          .filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.description.toLowerCase().includes(q) ||
              c.aliases?.some((a) => a.toLowerCase().includes(q)),
          )
          .map((c) => ({ ...c, category: cat.name })),
      )
      .sort(byName);
  }, [query, categories]);

  const totalCommands = uniqueCommandCount(categories.flatMap((c) => c.commands));

  return (
    <section className="container max-w-5xl pt-4 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1,  y: 0 }}
        className="text-center max-w-2xl mx-auto"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Reference</span>
        <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight">
          <span
            style={{
              background:           'var(--gradient-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip:       'text',
            }}
          >
            {totalCommands}+ commands
          </span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Browse every command by category. Default prefix is{' '}
          <code className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded-md text-sm">$</code>
          . Most commands also have a slash variant.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1,  y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-10 max-w-xl mx-auto relative"
      >
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search commands…"
          className="w-full liquid-glass border-0 outline-none h-12 pl-12 pr-12 rounded-full text-sm bg-transparent placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40 transition-shadow"
        />
        {query && (
          <button
            onClick={() => handleQueryChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>

      {/* Category pills (hidden while global search is active) */}
      {!query && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {categories.map((c) => {
            const isActive = active === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setActive(c.name)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white shadow-[var(--shadow-glow)] scale-[1.04]'
                    : 'liquid-glass text-foreground hover:scale-[1.03]'
                }`}
                style={isActive ? { background: 'var(--gradient-aurora)', backgroundSize: '300% 300%' } : {}}
              >
                <c.icon className="h-3.5 w-3.5" />
                {c.name}
                <span
                  className={`text-[10px] rounded-full px-1.5 py-0.5 font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {uniqueCommandCount(c.commands)}
                </span>
              </button>
            );
          })}
        </motion.div>
      )}

      {/* Command list */}
      <AnimatePresence mode="wait">
        {query && allFiltered ? (
          /* Global search results */
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-10 grid sm:grid-cols-2 gap-4"
          >
            {allFiltered.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-20">
                <Search className="h-8 w-8 mx-auto mb-3 opacity-30" />
                No commands matched <em>&ldquo;{query}&rdquo;</em>
              </div>
            ) : (
              allFiltered.map((cmd, i) => (
                <motion.div
                  key={cmd.name + cmd.category}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1,  y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="liquid-glass rounded-2xl p-5 hover:scale-[1.015] transition-transform"
                >
                  <div className="flex items-start justify-between gap-3">
                    <code
                      className="font-mono text-sm font-semibold"
                      style={{
                        background:           'var(--gradient-text)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor:  'transparent',
                        backgroundClip:       'text',
                      }}
                    >
                      {cmd.name}
                    </code>
                    <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-primary/12 text-primary border border-primary/20 font-semibold flex-shrink-0">
                      {cmd.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{cmd.description}</p>
                  {(cmd.aliases?.length || cmd.permission) && (
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {cmd.aliases?.map((a) => (
                        <code key={a} className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/60">
                          {a}
                        </code>
                      ))}
                      {cmd.permission && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          <ShieldCheck className="h-2.5 w-2.5" />
                          {cmd.permission}
                        </span>
                      )}
                      {cmd.slash === false && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-sky-500/10 text-sky-500 border border-sky-500/20">
                          Prefix only
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-3 cmd-usage">{cmd.usage}</div>
                </motion.div>
              ))
            )}
          </motion.div>
        ) : (
          /* Category view */
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid sm:grid-cols-2 gap-4"
          >
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-20">
                No commands match your search.
              </div>
            ) : (
              filtered.map((cmd, i) => (
                <motion.div
                  key={cmd.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1,  y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="liquid-glass rounded-2xl p-5 hover:scale-[1.015] transition-transform group cursor-default"
                >
                  <div className="flex items-start justify-between gap-3">
                    <code
                      className="font-mono text-sm font-semibold"
                      style={{
                        background:           'var(--gradient-text)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor:  'transparent',
                        backgroundClip:       'text',
                      }}
                    >
                      {cmd.name}
                    </code>
                    <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-primary/12 text-primary border border-primary/20 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      {active}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{cmd.description}</p>
                  {(cmd.aliases?.length || cmd.permission) && (
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {cmd.aliases?.map((a) => (
                        <code key={a} className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/60">
                          {a}
                        </code>
                      ))}
                      {cmd.permission && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          <ShieldCheck className="h-2.5 w-2.5" />
                          {cmd.permission}
                        </span>
                      )}
                      {cmd.slash === false && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-sky-500/10 text-sky-500 border border-sky-500/20">
                          Prefix only
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-3 cmd-usage">{cmd.usage}</div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Usage legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 liquid-glass rounded-2xl px-5 py-5 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-sm text-muted-foreground"
      >
        <span className="font-display font-semibold text-foreground">Legend</span>
        <span><code className="font-mono text-primary">&lt;required&gt;</code>: must be provided</span>
        <span><code className="font-mono text-muted-foreground">[optional]</code>: can be omitted</span>
        <span><code className="font-mono text-muted-foreground">a|b</code>: pick one</span>
        <span>Slash commands use <code className="font-mono text-primary">/</code> instead of <code className="font-mono text-primary">$</code></span>
      </motion.div>
    </section>
  );
}

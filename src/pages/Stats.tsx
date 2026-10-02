import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Clock3, Cpu, Hash, Layers3, Radio, RefreshCw, Server, Terminal, Users, PowerOff } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BotStats {
  servers:          number;
  members:          number;
  channels:         number;
  commandsExecuted: number;
  ping:             number;
  uptimeSecs:       number;
  memoryMB:         number;
  shards:           number;
  clusters:         number;
  timestamp:        number;
}

type Phase = 'loading' | 'online' | 'offline';

// ─── Config ───────────────────────────────────────────────────────────────────

// Always use a relative path — in dev Vite proxies /api → api-server.mjs,
// in production Vercel routes /api → the serverless function.
// No VITE_STATS_API_URL needed.
const INTERVAL = 30_000;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function fmtUptime(seconds: number): string {
  const days = Math.floor(seconds / 86_400);
  const hours = Math.floor((seconds % 86_400) / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);
  if (days) return `${days}d ${hours}h`;
  if (hours) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function fmtAge(timestamp: number): string {
  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1_000));
  return seconds < 5 ? 'just now' : `${seconds}s ago`;
}

// ─── Cards config ─────────────────────────────────────────────────────────────

const CARDS = [
  { key: 'servers',          icon: Server,   label: 'Servers',      note: 'Communities protected' },
  { key: 'members',          icon: Users,    label: 'Members',      note: 'Across all servers' },
  { key: 'channels',         icon: Hash,     label: 'Channels',     note: 'Across all servers' },
  { key: 'commandsExecuted', icon: Terminal, label: 'Commands run', note: 'All-time total' },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, note }: { icon: React.ElementType; label: string; value: string; note: string }) {
  return (
    <motion.div
      layout
      className="liquid-glass rounded-2xl p-5 sm:p-6 flex flex-col gap-2 min-h-36"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-xs font-semibold uppercase tracking-widest">{label}</span>
      </div>
      <motion.p
        key={value}
        className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight tabular-nums"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {value}
      </motion.p>
      <span className="text-xs text-muted-foreground">{note}</span>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="liquid-glass rounded-2xl p-6 flex flex-col gap-3 animate-pulse">
      <div className="h-3 w-20 rounded bg-muted-foreground/20" />
      <div className="h-8 w-16 rounded bg-muted-foreground/20" />
    </div>
  );
}

function OfflineCard() {
  return (
    <div className="liquid-glass rounded-2xl p-12 flex flex-col items-center gap-5 text-center">
      {/* PowerOff icon — immediately readable as "turned off", no red, muted primary glow */}
      <motion.div
        animate={{ opacity: [0.38, 0.72, 0.38] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 0 12px hsl(var(--primary) / 0.28))' }}
      >
        <PowerOff className="h-11 w-11 text-primary/55" strokeWidth={1.4} />
      </motion.div>
      <div>
        <p className="font-display font-semibold">Offline</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-[220px] mx-auto">
          Stats are unavailable right now. Check back shortly.
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Stats() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [data,  setData]  = useState<BotStats | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [, setClock] = useState(0);

  const fetchStats = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/stats', { signal: AbortSignal.timeout(8_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as BotStats;
      if (typeof json.timestamp !== 'number') throw new Error('Invalid stats snapshot');
      setData(json);
      setPhase('online');
    } catch {
      setPhase('offline');
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const id = setInterval(fetchStats, INTERVAL);
    return () => clearInterval(id);
  }, [fetchStats]);

  useEffect(() => {
    const id = setInterval(() => setClock((clock) => clock + 1), 5_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="container max-w-5xl pt-8 md:pt-12 pb-28 space-y-8 md:space-y-10">

      {/* ── Dashboard header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="liquid-glass rounded-3xl p-6 sm:p-8 flex items-end justify-between gap-6 flex-wrap"
      >
        <div>
          <div className="flex items-center gap-2 text-primary">
            <Activity className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">Live system overview</span>
          </div>
          <h1 className="mt-3 font-display font-extrabold text-4xl md:text-5xl tracking-tight">Cassie at a glance</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">Live network and runtime statistics, refreshed every 30 seconds.</p>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <AnimatePresence mode="wait">
            {phase === 'loading' ? (
              <motion.div key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="liquid-glass px-4 py-2 rounded-full flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" />
                Connecting...
              </motion.div>
            ) : phase === 'online' ? (
              <motion.div key="online"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="liquid-glass px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium">
                <span className="relative h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500 block" />
                </span>
                Live
              </motion.div>
            ) : (
              <motion.div key="offline"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="liquid-glass px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium text-muted-foreground">
                {/* Hollow ring — contrasts the filled green Live dot */}
                <span className="h-2 w-2 rounded-full border border-primary/60 block opacity-70" />
                Offline
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={fetchStats}
            disabled={refreshing}
            className="liquid-glass h-10 w-10 rounded-full grid place-items-center hover:scale-105 transition-transform disabled:opacity-60"
            aria-label="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </motion.div>

      {/* ── Metrics ── */}
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </motion.div>
        )}

        {phase === 'offline' && (
          <motion.div key="offline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <OfflineCard />
          </motion.div>
        )}

        {phase === 'online' && data && (
          <motion.div key="stats" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              {CARDS.map(({ key, icon, label, note }) => (
                <StatCard key={key} icon={icon} label={label} note={note} value={fmtNum(data[key])} />
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Under the hood</span>
                  <h2 className="mt-1 font-display font-bold text-2xl">Runtime health</h2>
                </div>
                <span className="text-xs text-muted-foreground">Snapshot {fmtAge(data.timestamp)}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <RuntimeCard icon={Radio} label="Gateway ping" value={data.ping >= 0 ? `${data.ping} ms` : '—'} detail="Discord connection latency" />
                <RuntimeCard icon={Clock3} label="Uptime" value={fmtUptime(data.uptimeSecs)} detail="Current process uptime" />
                <RuntimeCard icon={Layers3} label="Shards / clusters" value={`${data.shards} / ${data.clusters}`} detail="Gateway workload" />
                <RuntimeCard icon={Cpu} label="Memory" value={`${data.memoryMB} MB`} detail="Publisher process RSS" />
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground">Stats are published by Cassie and expire automatically if the bot stops reporting.</p>
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  );
}

function RuntimeCard({ icon: Icon, label, value, detail }: {
  icon: React.ElementType;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="liquid-glass rounded-2xl p-5 min-h-32 flex flex-col justify-between gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <div>
        <p className="font-display font-bold text-2xl tabular-nums">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}

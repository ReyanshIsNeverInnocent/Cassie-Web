import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { backgroundMusicTracks, defaultTrackKey } from '@/config/audio';
import { useTheme } from '@/context/ThemeContext';

// Choose a mini-player layout by changing MUSIC_PLAYER_TEMPLATE below.
// 1 = Compact horizontal.
// 2 = Square artwork flush left.
// 3 = Minimal square.
// 4 = Wide glass.
// 5 = Square artwork flush right.
// 6 = Artwork left.
// 7 = Square artwork with bottom controls.
const MUSIC_PLAYER_TEMPLATE: number = 7;

export default function BackgroundMiniPlayer() {
  const [trackKey, setTrackKey] = useState(() => {
    try {
      const savedTrack = localStorage.getItem('lev-track');
      return savedTrack && Object.prototype.hasOwnProperty.call(backgroundMusicTracks, savedTrack)
        ? savedTrack
        : defaultTrackKey;
    } catch {
      return defaultTrackKey;
    }
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const nextAudioPreloadRef = useRef<HTMLAudioElement | null>(null);
  const nextCoverPreloadRef = useRef<HTMLImageElement | null>(null);
  const playbackIntentRef = useRef(false);
  const playAttemptRef = useRef(0);
  const trackKeyRef = useRef(defaultTrackKey);
  const loadedTrackKeyRef = useRef<string | null>(null);
  const { theme: activeTheme } = useTheme();
  const trackEntries = Object.keys(backgroundMusicTracks);
  const activeTrack = backgroundMusicTracks[trackKey] ?? backgroundMusicTracks[defaultTrackKey];

  useEffect(() => {
    try { localStorage.setItem('lev-track', trackKey); } catch {}
  }, [trackKey]);

  const startPlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    playbackIntentRef.current = true;
    const attempt = ++playAttemptRef.current;
    try {
      if (audio.paused) {
        await audio.play();
      }
      if (attempt === playAttemptRef.current) setIsPlaying(true);
    } catch {
      if (attempt === playAttemptRef.current) {
        playbackIntentRef.current = false;
        setIsPlaying(false);
      }
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!playbackIntentRef.current) {
      await startPlayback();
      return;
    }

    playbackIntentRef.current = false;
    playAttemptRef.current += 1;
    audio.pause();
    setIsPlaying(false);
  };

  const loadTrack = (nextTrackKey: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    trackKeyRef.current = nextTrackKey;
    loadedTrackKeyRef.current = nextTrackKey;
    playAttemptRef.current += 1;
    setCurrentTime(0);
    setDuration(0);

    audio.pause();
    audio.currentTime = 0;
    audio.src = `/audio/${nextTrackKey}`;
    audio.load();

    const currentIndex = trackEntries.indexOf(nextTrackKey);
    const nextKey = trackEntries[(currentIndex + 1) % trackEntries.length];
    const nextTrack = backgroundMusicTracks[nextKey];
    const nextAudio = nextAudioPreloadRef.current;
    if (nextAudio) {
      nextAudio.src = `/audio/${nextKey}`;
      nextAudio.load();
    }
    const nextCover = nextCoverPreloadRef.current;
    if (nextCover && nextTrack) nextCover.src = nextTrack.cover;
  };

  const cycleTrack = (direction: 1 | -1) => {
    const index = trackEntries.indexOf(trackKey);
    const nextIndex = (index + direction + trackEntries.length) % trackEntries.length;
    const nextTrackKey = trackEntries[nextIndex];

    // Start from this click handler so browsers recognize the button press as
    // the user gesture that authorizes audio playback.
    playbackIntentRef.current = true;
    setTrackKey(nextTrackKey);
    loadTrack(nextTrackKey);
    void startPlayback();
  };

  useEffect(() => {
    const audio = new Audio();
    audio.loop = false;
    audio.volume = 0.25;
    audio.muted = false;
    audio.preload = 'auto';
    audioRef.current = audio;
    loadedTrackKeyRef.current = null;
    const nextAudioPreload = new Audio();
    nextAudioPreload.preload = 'auto';
    nextAudioPreloadRef.current = nextAudioPreload;
    const nextCoverPreload = new Image();
    nextCoverPreload.decoding = 'async';
    nextCoverPreloadRef.current = nextCoverPreload;

    const onLoadedMetadata = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onPause = () => {
      if (!playbackIntentRef.current) setIsPlaying(false);
    };
    const onPlay = () => setIsPlaying(true);
    const onError = () => {
      playbackIntentRef.current = false;
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    };
    const onEnded = () => {
      const currentIndex = trackEntries.indexOf(trackKeyRef.current);
      const nextIndex = (currentIndex + 1) % trackEntries.length;
      setTrackKey(trackEntries[nextIndex]);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);
    audio.addEventListener('ended', onEnded);

    return () => {
      playAttemptRef.current += 1;
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      loadedTrackKeyRef.current = null;
      nextAudioPreload.removeAttribute('src');
      nextAudioPreload.load();
      audioRef.current = null;
      nextAudioPreloadRef.current = null;
      nextCoverPreloadRef.current = null;
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || loadedTrackKeyRef.current === trackKey) return;

    loadTrack(trackKey);

    if (playbackIntentRef.current) {
      void startPlayback();
    } else {
      setIsPlaying(false);
    }
  }, [trackKey]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '00:00';

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  switch (MUSIC_PLAYER_TEMPLATE) {
    case 2:
      return (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-5 right-5 z-[60] w-[248px]"
        >
          <div className="flex h-[76px] items-center gap-2.5 overflow-hidden rounded-xl border border-border/70 bg-background/90 pr-2.5 shadow-xl backdrop-blur-xl">
            <img key={activeTrack.cover} src={activeTrack.cover} alt={activeTrack.title} decoding="async" className="h-[76px] w-[76px] shrink-0 object-cover object-center" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-foreground">{activeTrack.title}</p>
              <div className="mt-1 flex items-center justify-between text-[9px] tabular-nums text-muted-foreground">
                <span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-foreground/15">
                <div className="h-full rounded-full transition-all duration-200" style={{ width: `${progressPercent}%`, background: activeTheme.previewGradient }} />
              </div>
              <div className="mt-1.5 flex items-center justify-center gap-4">
                <button type="button" onClick={() => cycleTrack(-1)} aria-label="Previous track" className="text-muted-foreground hover:text-foreground"><SkipBack className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={toggleMusic} aria-label={isPlaying ? 'Pause background music' : 'Play background music'} className="flex h-6 w-6 items-center justify-center rounded-full text-white" style={{ background: activeTheme.previewGradient }}>
                  {isPlaying ? <Pause className="h-3 w-3 fill-current" /> : <Play className="ml-0.5 h-3 w-3 fill-current" />}
                </button>
                <button type="button" onClick={() => cycleTrack(1)} aria-label="Next track" className="text-muted-foreground hover:text-foreground"><SkipForward className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        </motion.div>
      );

    case 3:
      return (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-5 right-5 z-[60] w-[130px]"
        >
          <div className="rounded-xl border border-border/70 bg-background/90 p-2 shadow-xl backdrop-blur-xl">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img key={activeTrack.cover} src={activeTrack.cover} alt={activeTrack.title} decoding="async" className="h-full w-full object-cover" />
              <button type="button" onClick={toggleMusic} aria-label={isPlaying ? 'Pause background music' : 'Play background music'} className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105" style={{ background: activeTheme.previewGradient }}>
                {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />}
              </button>
            </div>
            <p className="mt-2 truncate text-[10px] font-semibold text-foreground">{activeTrack.title}</p>
            <div className="mt-1 flex items-center justify-between text-[8px] tabular-nums text-muted-foreground">
              <span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span>
            </div>
            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-foreground/15">
              <div className="h-full rounded-full transition-all duration-200" style={{ width: `${progressPercent}%`, background: activeTheme.previewGradient }} />
            </div>
            <div className="mt-2 flex items-center justify-between px-1">
              <button type="button" onClick={() => cycleTrack(-1)} aria-label="Previous track" className="text-muted-foreground transition hover:text-foreground"><SkipBack className="h-3.5 w-3.5" /></button>
              <button type="button" onClick={() => cycleTrack(1)} aria-label="Next track" className="text-muted-foreground transition hover:text-foreground"><SkipForward className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </motion.div>
      );

    case 4:
      return (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-5 right-5 z-[60] w-[290px]"
        >
          <div
            className="relative isolate overflow-hidden rounded-2xl border border-border/70 bg-[hsl(var(--glass-bg)/0.78)] p-3 backdrop-blur-2xl"
            style={{
              boxShadow: '0 18px 48px hsl(0 0% 0% / 0.18), inset 0 1px 0 hsl(var(--foreground) / 0.08)',
              backgroundImage: 'linear-gradient(135deg, hsl(var(--glass-bg) / 0.94), hsl(var(--glass-bg) / 0.7))',
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.1), transparent 42%, hsl(0 0% 100% / 0.025))' }}
            />
            <div className="relative z-10 flex items-center gap-3">
              <img key={activeTrack.cover} src={activeTrack.cover} alt={activeTrack.title} decoding="async" className="h-14 w-14 shrink-0 rounded-xl object-cover shadow-md" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-foreground">{activeTrack.title}</p>
                <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{activeTrack.artist}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[9px] tabular-nums text-muted-foreground">{formatTime(currentTime)}</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/15">
                    <div className="h-full rounded-full transition-all duration-200" style={{ width: `${progressPercent}%`, background: activeTheme.previewGradient }} />
                  </div>
                  <span className="text-[9px] tabular-nums text-muted-foreground">{formatTime(duration)}</span>
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-2 flex items-center justify-center gap-5">
              <button type="button" onClick={() => cycleTrack(-1)} aria-label="Previous track" className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:bg-foreground/10 hover:text-foreground"><SkipBack className="h-4 w-4" /></button>
              <button type="button" onClick={toggleMusic} aria-label={isPlaying ? 'Pause background music' : 'Play background music'} className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105" style={{ background: activeTheme.previewGradient }}>
                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
              </button>
              <button type="button" onClick={() => cycleTrack(1)} aria-label="Next track" className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:bg-foreground/10 hover:text-foreground"><SkipForward className="h-4 w-4" /></button>
            </div>
          </div>
        </motion.div>
      );

    case 5:
      return (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-5 right-5 z-[60] w-[248px]"
        >
          <div className="flex h-[76px] items-center gap-2.5 overflow-hidden rounded-xl border border-border/70 bg-background/90 pl-2.5 shadow-xl backdrop-blur-xl">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-foreground">{activeTrack.title}</p>
              <div className="mt-1 flex items-center justify-between text-[9px] tabular-nums text-muted-foreground">
                <span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-foreground/15">
                <div className="h-full rounded-full transition-all duration-200" style={{ width: `${progressPercent}%`, background: activeTheme.previewGradient }} />
              </div>
              <div className="mt-1.5 flex items-center justify-center gap-4">
                <button type="button" onClick={() => cycleTrack(-1)} aria-label="Previous track" className="text-muted-foreground hover:text-foreground"><SkipBack className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={toggleMusic} aria-label={isPlaying ? 'Pause background music' : 'Play background music'} className="flex h-6 w-6 items-center justify-center rounded-full text-white" style={{ background: activeTheme.previewGradient }}>
                  {isPlaying ? <Pause className="h-3 w-3 fill-current" /> : <Play className="ml-0.5 h-3 w-3 fill-current" />}
                </button>
                <button type="button" onClick={() => cycleTrack(1)} aria-label="Next track" className="text-muted-foreground hover:text-foreground"><SkipForward className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <img key={activeTrack.cover} src={activeTrack.cover} alt={activeTrack.title} decoding="async" className="h-[76px] w-[76px] shrink-0 object-cover object-center" />
          </div>
        </motion.div>
      );

    case 6:
      return (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-5 right-5 z-[60] w-[265px]"
        >
          <div className="flex min-h-[88px] overflow-hidden rounded-xl border border-border/70 bg-background/90 shadow-xl backdrop-blur-xl">
            <img key={activeTrack.cover} src={activeTrack.cover} alt={activeTrack.title} decoding="async" className="w-[76px] shrink-0 self-stretch object-cover object-center" />
            <div className="flex min-w-0 flex-1 flex-col justify-center p-2.5">
              <p className="truncate text-[11px] font-semibold text-foreground">{activeTrack.title}</p>
              <div className="mt-1 flex items-center justify-between text-[9px] tabular-nums text-muted-foreground">
                <span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-foreground/15">
                <div className="h-full rounded-full transition-all duration-200" style={{ width: `${progressPercent}%`, background: activeTheme.previewGradient }} />
              </div>
              <div className="mt-2 flex items-center justify-center gap-4">
                <button type="button" onClick={() => cycleTrack(-1)} aria-label="Previous track" className="flex h-6 w-6 items-center justify-center text-muted-foreground transition hover:text-foreground"><SkipBack className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={toggleMusic} aria-label={isPlaying ? 'Pause background music' : 'Play background music'} className="flex h-7 w-7 items-center justify-center rounded-full text-white transition-transform hover:scale-105" style={{ background: activeTheme.previewGradient }}>
                  {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />}
                </button>
                <button type="button" onClick={() => cycleTrack(1)} aria-label="Next track" className="flex h-6 w-6 items-center justify-center text-muted-foreground transition hover:text-foreground"><SkipForward className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        </motion.div>
      );

    case 7:
      return (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-5 right-5 z-[60] w-[144px]"
        >
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/90 shadow-xl backdrop-blur-xl">
            <img key={activeTrack.cover} src={activeTrack.cover} alt={activeTrack.title} decoding="async" className="block aspect-square w-full object-cover object-center" />
            <div className="px-2.5 pt-2">
              <p className="truncate text-[10px] font-semibold text-foreground">{activeTrack.title}</p>
              <div className="mt-1 flex items-center justify-between text-[8px] tabular-nums text-muted-foreground">
                <span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-foreground/15">
                <div className="h-full rounded-full transition-all duration-200" style={{ width: `${progressPercent}%`, background: activeTheme.previewGradient }} />
              </div>
            </div>
            <div className="mt-2 flex items-center justify-center gap-5 border-t border-border/50 py-2">
              <button type="button" onClick={() => cycleTrack(-1)} aria-label="Previous track" className="text-muted-foreground hover:text-foreground"><SkipBack className="h-4 w-4" /></button>
              <button type="button" onClick={toggleMusic} aria-label={isPlaying ? 'Pause background music' : 'Play background music'} className="flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ background: activeTheme.previewGradient }}>
                {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />}
              </button>
              <button type="button" onClick={() => cycleTrack(1)} aria-label="Next track" className="text-muted-foreground hover:text-foreground"><SkipForward className="h-4 w-4" /></button>
            </div>
          </div>
        </motion.div>
      );

    case 1:
    default:
      return (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-5 right-5 z-[60] w-[260px]"
        >
          <div className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-background/90 p-2 shadow-xl backdrop-blur-xl">
            <img key={activeTrack.cover} src={activeTrack.cover} alt={activeTrack.title} decoding="async" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-foreground">{activeTrack.title}</p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="text-[9px] text-muted-foreground">{formatTime(currentTime)}</span>
                <span className="text-[9px] text-muted-foreground">{formatTime(duration)}</span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-foreground/15">
                <div className="h-full rounded-full transition-all duration-200" style={{ width: `${progressPercent}%`, background: activeTheme.previewGradient }} />
              </div>
              <div className="mt-1.5 flex items-center justify-center gap-2">
                <button type="button" onClick={() => cycleTrack(-1)} aria-label="Previous track" className="flex h-5 w-5 items-center justify-center text-muted-foreground transition hover:text-foreground"><SkipBack className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={toggleMusic} aria-label={isPlaying ? 'Pause background music' : 'Play background music'} className="flex h-7 w-7 items-center justify-center rounded-full text-white shadow-md transition-transform hover:scale-105" style={{ background: activeTheme.previewGradient }}>
                  {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />}
                </button>
                <button type="button" onClick={() => cycleTrack(1)} aria-label="Next track" className="flex h-5 w-5 items-center justify-center text-muted-foreground transition hover:text-foreground"><SkipForward className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        </motion.div>
      );
  }
}
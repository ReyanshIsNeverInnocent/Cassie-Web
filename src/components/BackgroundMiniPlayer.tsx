import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { backgroundMusicTracks, defaultTrackKey } from '@/config/audio';
import { useTheme } from '@/context/ThemeContext';

export default function BackgroundMiniPlayer() {
  const [trackKey, setTrackKey] = useState(defaultTrackKey);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { theme: activeTheme } = useTheme();
  const trackEntries = Object.keys(backgroundMusicTracks);
  const activeTrack = backgroundMusicTracks[trackKey] ?? backgroundMusicTracks[defaultTrackKey];

  const startPlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      }
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await startPlayback();
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const cycleTrack = (direction: 1 | -1) => {
    const index = trackEntries.indexOf(trackKey);
    const nextIndex = (index + direction + trackEntries.length) % trackEntries.length;
    setTrackKey(trackEntries[nextIndex]);
    setCurrentTime(0);
    setDuration(0);
  };

  useEffect(() => {
    const audio = new Audio(`/audio/${trackKey}`);
    audio.loop = false;
    audio.volume = 0.25;
    audio.muted = false;
    audio.preload = 'auto';
    audioRef.current = audio;

    const onLoadedMetadata = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    const onEnded = () => {
      const currentIndex = trackEntries.indexOf(trackKey);
      const nextIndex = (currentIndex + 1) % trackEntries.length;
      setTrackKey(trackEntries[nextIndex]);
      setCurrentTime(0);
      setDuration(0);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    const resumeOnUserInteraction = () => {
      void startPlayback();
      window.removeEventListener('pointerdown', resumeOnUserInteraction);
      window.removeEventListener('keydown', resumeOnUserInteraction);
    };

    window.addEventListener('pointerdown', resumeOnUserInteraction, { once: true });
    window.addEventListener('keydown', resumeOnUserInteraction, { once: true });

    void startPlayback();

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      window.removeEventListener('pointerdown', resumeOnUserInteraction);
      window.removeEventListener('keydown', resumeOnUserInteraction);
    };
  }, [trackKey]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-6 right-6 z-[60] w-[160px]"
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border))]/70 bg-[hsl(var(--glass-bg)/0.92)] p-3 backdrop-blur-xl flex flex-col items-center"
        style={{ boxShadow: '0 0 0 1px hsl(var(--border) / 0.7), 0 12px 32px hsl(227 70% 68% / 0.2)' }}
      >
        {/* Full Square Album Artwork */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border/20 shadow-sm">
          <img
            src={activeTrack.cover}
            alt={activeTrack.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Track Title & Artist */}
        <div className="mt-2.5 text-center w-full min-w-0">
          <p className="truncate text-xs font-semibold text-foreground">{activeTrack.title}</p>
          <p
            className="truncate text-[10px] text-muted-foreground mt-0.5"
            title={activeTrack.artist}
          >
            {activeTrack.artist}
          </p>
        </div>

        {/* Adaptive Progress Bar (Visible in both Light & Dark modes) */}
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-foreground/15">
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${progressPercent}%`,
              background: activeTheme.previewGradient,
            }}
          />
        </div>

        {/* Centered Controls */}
        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => cycleTrack(-1)}
            aria-label="Previous track"
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground hover:bg-foreground/5"
          >
            <SkipBack className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
            style={{ background: activeTheme.previewGradient }}
          >
            {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={() => cycleTrack(1)}
            aria-label="Next track"
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground hover:bg-foreground/5"
          >
            <SkipForward className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
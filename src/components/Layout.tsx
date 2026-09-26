import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import Marquee from './Marquee';
import AuroraBackground from './AuroraBackground';
import TwinkleStars from './TwinkleStars';
import FloatingEmojis from './FloatingEmojis';
import AnnouncementBadge from './AnnouncementBadge';
import CursorTrail from './CursorTrail';
import BackgroundMiniPlayer from './BackgroundMiniPlayer';

function CursorGlow() {
  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);
  const x    = useSpring(rawX, { stiffness: 90, damping: 22, mass: 0.5 });
  const y    = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => { rawX.set(e.clientX); rawY.set(e.clientY); };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [rawX, rawY]);

  return (
    <motion.div
      style={{
        x, y,
        position:       'fixed',
        top:            0,
        left:           0,
        width:          700,
        height:         700,
        translateX:     '-50%',
        translateY:     '-50%',
        background:     'radial-gradient(circle, hsl(227 70% 68% / 0.065) 0%, transparent 65%)',
        pointerEvents:  'none',
        zIndex:         0,
        willChange:     'transform',
      }}
    />
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 640 : false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const update = (event?: MediaQueryListEvent) => setIsMobile(event ? event.matches : media.matches);

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <AuroraBackground />
      <TwinkleStars />
      <FloatingEmojis />
      {!isMobile && <CursorGlow />}
      {!isMobile && <CursorTrail />}
      {!isMobile && <AnnouncementBadge />}
      <Navbar />
      <main className="flex-1 pt-24 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
            animate={{ opacity: 1,  y: 0,  filter: 'blur(0px)' }}
            exit={{    opacity: 0,  y: -10, filter: 'blur(5px)' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <div className="relative z-10">
        <Marquee />
      </div>
      {!isMobile && <BackgroundMiniPlayer />}
      <Footer />
    </div>
  );
}

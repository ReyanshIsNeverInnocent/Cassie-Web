import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { DoubleSide } from 'three';
import { ExternalLink } from 'lucide-react';
import { site } from '@/config/site';
import { useTheme } from '@/context/ThemeContext';

function themeColor(token: string, lightness: number, saturationScale = 0.52): string {
  const [hue = '230', tokenSaturation = '70%'] = token.split(/\s+/);
  const saturation = Math.min(100, Number.parseFloat(tokenSaturation) * saturationScale);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function StarburstDecor({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <radialGradient id="cta-starburst-radial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--decor-light))" />
          <stop offset="55%" stopColor="hsl(var(--decor-1))" />
          <stop offset="100%" stopColor="hsl(var(--decor-4))" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      <path
        d="M24 1 L27.2 20.8 L47 24 L27.2 27.2 L24 47 L20.8 27.2 L1 24 L20.8 20.8 Z"
        fill="url(#cta-starburst-radial)"
      />
      <circle cx="24" cy="24" r="4.5" fill="hsl(var(--decor-light))" opacity="0.45" />
    </svg>
  );
}

function CrystalDecor({ size }: { size: number }) {
  return (
    <svg width={size} height={Math.round(size * 1.35)} viewBox="0 0 26 36" fill="none">
      <defs>
        <linearGradient id="cta-crystal-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--decor-light))" stopOpacity="0.65" />
          <stop offset="50%" stopColor="hsl(var(--decor-1))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--decor-dark))" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="cta-crystal-h" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="hsl(var(--decor-light))" stopOpacity="0.55" />
          <stop offset="100%" stopColor="hsl(var(--decor-light))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="13,1 22,9 19,35 7,35 4,9" fill="url(#cta-crystal-b)" />
      <polygon points="13,1 22,9 19,35 13,35" fill="hsl(var(--decor-light))" opacity="0.07" />
      <polygon points="13,1 22,9 13,13 4,9" fill="url(#cta-crystal-h)" />
    </svg>
  );
}

function FloatingDecor({
  children,
  className,
  size = 56,
  duration = 5,
  delay = 0,
  rotate = 8,
}: {
  children: React.ReactNode;
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  rotate?: number;
}) {
  return (
    <motion.div className={`pointer-events-none select-none ${className ?? ''}`} style={{ width: size }} aria-hidden="true">
      <motion.div
        className="decor-color"
        animate={{ y: [0, -12, 0], rotate: [-rotate, rotate, -rotate] }}
        transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function MagicArtifact() {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const { theme } = useTheme();
  const isLightTheme = theme.mode === 'light';
  const planetColor = themeColor(theme.vars.primary, isLightTheme ? 76 : 64);
  const ringColors = [
    themeColor(theme.vars.primary, isLightTheme ? 79 : 70),
    themeColor(theme.vars.primary, isLightTheme ? 71 : 59),
    themeColor(theme.vars.primary, isLightTheme ? 85 : 78),
    themeColor(theme.vars.primary, isLightTheme ? 75 : 67),
  ];
  const glintColor = themeColor(theme.vars.primary, isLightTheme ? 90 : 84, 0.2);
  const moving = !reducedMotion;

  return (
    <div className="relative mx-auto h-[310px] w-full max-w-[400px] sm:h-[370px]">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.6, 8], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
        className="cursor-grab active:cursor-grabbing"
        role="img"
        aria-label="Interactive Saturn-inspired object coloured by the active site theme"
        fallback={<div className="p-8 text-center text-white/80">3D preview unavailable</div>}
      >
        <ambientLight intensity={0.32} />
        <directionalLight position={[3, 5, 4]} intensity={1.25} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0002} />
        <directionalLight position={[-4, 1, -2]} intensity={1.3} color={planetColor} />
        <Float speed={moving ? 1.3 : 0} rotationIntensity={0.14} floatIntensity={0.35}>
          <group rotation={[0.25, 0, -0.35]}>
            <mesh castShadow receiveShadow scale={[1, 0.94, 1]}>
              <sphereGeometry args={[1, 96, 72]} />
              <meshPhysicalMaterial
                color={planetColor}
                emissive={planetColor}
                emissiveIntensity={0.12}
                roughness={0.38}
                metalness={0.08}
                clearcoat={0.55}
                clearcoatRoughness={0.28}
                reflectivity={0.65}
                sheen={0.18}
              />
            </mesh>
            {([
              [1.18, 1.4],
              [1.42, 1.72],
              [1.7, 1.96],
              [1.95, 2.14],
            ] as const).map(([inner, outer], index) => (
              <mesh key={inner} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
                <ringGeometry args={[inner, outer, 180]} />
                <meshBasicMaterial
                  color={ringColors[index]}
                  side={DoubleSide}
                  toneMapped={false}
                />
              </mesh>
            ))}
            {([1.4, 1.72, 1.96] as const).map((radius, index) => (
              <mesh key={`orbit-glint-${radius}`} rotation={[-Math.PI / 2, 0, 0]}>
                <torusGeometry args={[radius, 0.009, 8, 180]} />
                <meshBasicMaterial color={index === 1 ? glintColor : ringColors[index]} transparent opacity={0.58} />
              </mesh>
            ))}
          </group>
        </Float>
        <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.06} autoRotate={moving} autoRotateSpeed={0.75} />
      </Canvas>
    </div>
  );
}

export default function Cta() {
  return (
    <section className="container max-w-6xl py-10 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative isolate overflow-hidden rounded-[2rem] border border-white/25 px-6 py-10 shadow-[0_30px_90px_rgba(91,48,124,0.2)] sm:px-10 sm:py-12 lg:px-14 lg:py-14"
        style={{
          background: 'var(--gradient-aurora)',
          backgroundSize: '300% 300%',
          animation: 'aurora 24s linear infinite',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-white/[0.08]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

        <motion.div
          className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full bg-pink-100/20 blur-3xl"
          animate={{ scale: [1, 1.16, 1], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-violet-100/20 blur-3xl"
          animate={{ scale: [1.08, 0.94, 1.08], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <FloatingDecor className="absolute right-6 top-6 z-10 sm:right-10 sm:top-8" size={26} duration={5.5} rotate={8}>
          <CrystalDecor size={26} />
        </FloatingDecor>
        <FloatingDecor
          className="absolute bottom-6 left-6 z-10 sm:bottom-8 sm:left-10"
          size={24}
          duration={5}
          delay={0.5}
          rotate={10}
        >
          <StarburstDecor size={24} />
        </FloatingDecor>

        <div className="relative z-10 grid items-center gap-6 md:grid-cols-[0.95fr_1.05fr] md:gap-8 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagicArtifact />
          </motion.div>

          <div className="mx-auto max-w-xl text-center md:mx-0 md:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
            >
              Want Cassie on
              <br className="hidden sm:block" /> your server?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/80 md:mx-0"
            >
              Add Cassie in seconds. No setup needed. Protection and utility start working the moment you add it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center md:justify-start"
            >
              <a
                href={site.bot.inviteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[hsl(232,60%,28%)] shadow-[0_12px_30px_rgba(50,32,91,0.2)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_16px_36px_rgba(50,32,91,0.28)]"
              >
                Add to Discord <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={site.bot.supportUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 bg-white/10 px-8 py-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:bg-white/20"
              >
                Support Server
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { site } from '@/config/site';

function ReactorCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Keep pointer measurements on the stationary wrapper, not the tilting card.
  const wrapperRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 24 });

  const rotateX = useTransform(smoothY, [0, 1], [7, -7]);
  const rotateY = useTransform(smoothX, [0, 1], [-7, 7]);

  const glowX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glowY = useTransform(smoothY, [0, 1], ['0%', '100%']);

  const spectralGlow = useMotionTemplate`
    radial-gradient(
      circle at ${glowX} ${glowY},
      hsl(var(--primary) / 0.2),
      hsl(var(--accent) / 0.12) 30%,
      transparent 68%
    )
  `;

  const specularHighlight = useMotionTemplate`
    radial-gradient(
      circle at ${glowX} ${glowY},
      hsl(var(--glass-shine) / 0.13),
      transparent 48%
    )
  `;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return;

    pointerX.set(
      Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
    );
    pointerY.set(
      Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
    );
  };

  const resetPointer = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <div
      ref={wrapperRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="group relative h-full"
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
          transformStyle: 'preserve-3d',
        }}
        className={`relative isolate h-full ${className ?? ''}`}
      >
        {/* Soft spectral light that follows the pointer */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: spectralGlow,
            mixBlendMode: 'screen',
          }}
        />

        {/* Shifting, prismatic edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px z-[-1] rounded-[17px] opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'conic-gradient(from 0deg, hsl(var(--primary) / 0.48), transparent 22%, hsl(var(--accent) / 0.4) 45%, transparent 68%, hsl(var(--primary) / 0.48))',
            animation: 'spin 7s linear infinite',
          }}
        />

        {/* Eclipse-like orbit */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[1px] z-10 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        >
          <div className="absolute -inset-[45%] rotate-[-28deg] scale-x-[1.45] rounded-[50%] border border-primary/20 transition-transform duration-1000 ease-out group-hover:rotate-[18deg] group-hover:scale-x-[1.8]" />
          <div className="absolute -inset-[35%] rotate-[35deg] scale-x-[1.35] rounded-[50%] border border-accent/15 transition-transform duration-1000 ease-out group-hover:rotate-[-12deg] group-hover:scale-x-[1.7]" />
        </div>

        {/* Cursor-following specular highlight */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: specularHighlight }}
        />

        <div className="relative z-0">{children}</div>
      </motion.div>
    </div>
  );
}

export default function FeatureCards() {
  return (
    <div
      className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      style={{ perspective: 1200 }}
    >
      {site.features.map((feature, i) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.65,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ReactorCard className="liquid-glass h-full cursor-default rounded-2xl p-7">
            <motion.div
              className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-aurora shadow-[var(--shadow-glow)]"
              style={{ animation: 'aurora 3s linear infinite' }}
              whileHover={{ rotate: 12, scale: 1.12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              <feature.icon className="h-5 w-5 text-white" />
            </motion.div>

            <h3 className="mb-2 font-display text-[17px] font-semibold">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </ReactorCard>
        </motion.div>
      ))}
    </div>
  );
}
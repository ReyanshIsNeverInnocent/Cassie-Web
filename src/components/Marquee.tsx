import { marqueeConfig } from '@/config/marquee';

function MarqueeGroup({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex items-center shrink-0" aria-hidden={hidden}>
      {marqueeConfig.items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="mx-6 md:mx-8 whitespace-nowrap font-marquee italic font-medium text-lg md:text-2xl tracking-wide text-foreground/90">
            {item}
          </span>
          <span className="select-none text-primary/70 text-base md:text-lg" aria-hidden="true">
            {marqueeConfig.separator}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="relative w-full overflow-hidden py-6 border-y border-border/40 marquee-mask"
      role="marquee"
      aria-label="Cassie highlights"
    >
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        style={{ '--marquee-duration': `${marqueeConfig.speedSeconds}s` } as React.CSSProperties}
      >
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
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
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const prepareMarquee = async () => {
      try {
        await document.fonts.load('italic 500 18px Fraunces');
        await document.fonts.ready;
      } catch {
        // Start with the fallback font if the web font cannot be loaded.
      } finally {
        if (isMounted) setFontReady(true);
      }
    };

    void prepareMarquee();
    return () => { isMounted = false; };
  }, []);

  return (
    <div
      className="group relative w-full overflow-hidden py-6 border-y border-border/60 marquee-mask"
      role="marquee"
      aria-label="Cassie highlights"
    >
      <div
        className={`flex w-max ${fontReady ? 'animate-marquee group-hover:[animation-play-state:paused]' : ''}`}
        style={{ '--marquee-duration': `${marqueeConfig.speedSeconds}s` } as React.CSSProperties}
      >
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </div>
  );
}

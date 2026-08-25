import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { legalConfig } from '@/config/legal';

export default function TermsOfService() {
  const { title, summary, sections } = legalConfig.termsOfService;
  useEffect(() => { document.title = `${title} | Cassie`; }, [title]);

  return (
    <section className="container max-w-3xl pt-8 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Legal</span>
        <h1 className="mt-3 font-display font-extrabold text-4xl md:text-5xl tracking-tight">{title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Effective {legalConfig.effectiveDate} · Last updated {legalConfig.lastUpdated}
        </p>
        <p className="mt-6 text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
          {summary}
        </p>
      </motion.div>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <motion.div
            key={section.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.4) }}
            className="liquid-glass rounded-2xl p-7"
          >
            <h2 className="font-display font-bold text-lg mb-3">{section.heading}</h2>
            {section.intro && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{section.intro}</p>
            )}
            <ul className="space-y-2.5">
              {section.clauses.map((clause, j) => (
                <li key={j} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                  <span>{clause}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

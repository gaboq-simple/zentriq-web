'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

function hexPath(cx: number, cy: number, r: number): string {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  });
  return `M ${pts.join(' L ')} Z`;
}

export default function Manifesto() {
  return (
    <section id="manifiesto" className="relative bg-cream grain overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-28 md:py-36">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-12 md:gap-20"
        >
          {/* Left column */}
          <div>
            <motion.p
              variants={fadeInUp}
              className="text-eyebrow uppercase tracking-[0.25em] text-muted font-heading font-medium mb-5"
            >
              Manifiesto
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-warm-dark text-heading-md sm:text-heading leading-[1.15] font-medium tracking-tight"
            >
              No somos una consultora.
              <br />
              Somos los que lo resuelven
              <span className="text-warm-dark">.</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[20px] font-heading font-medium text-warm-dark/80 leading-snug mt-6 max-w-sm"
            >
              Lo que entregamos lo operamos.
              <br />
              Lo que operamos lo evolucionamos contigo.
            </motion.p>

          </div>

          {/* Right column */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-col gap-5"
          >
            <motion.p
              variants={fadeInUp}
              className="text-body-lg text-muted leading-[1.7]"
            >
              Cada negocio tiene procesos que drenan tiempo, datos que nadie
              entiende, y herramientas que nadie usa.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-body-lg text-muted leading-[1.7]"
            >
              Nosotros vemos eso y pensamos: hay una forma mejor. Y la
              construimos. Sin presentaciones de 40 slides. Sin jerga. Solo
              soluciones que al día siguiente ya están funcionando.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="hidden md:block mt-6"
              aria-hidden="true"
            >
              <svg width="320" height="240" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Large hexagons — stroke only */}
                <path d={hexPath(105, 108, 34)} stroke="rgba(42,36,32,0.14)" strokeWidth="0.8" />
                <path d={hexPath(232, 76, 28)} stroke="rgba(42,36,32,0.11)" strokeWidth="0.8" />
                <path d={hexPath(160, 210, 30)} stroke="rgba(42,36,32,0.11)" strokeWidth="0.8" />
                {/* Medium hexagons */}
                <path d={hexPath(56, 50, 22)} stroke="rgba(42,36,32,0.09)" strokeWidth="0.7" />
                <path d={hexPath(194, 130, 20)} stroke="rgba(42,36,32,0.10)" strokeWidth="0.7" />
                <path d={hexPath(270, 152, 24)} stroke="rgba(42,36,32,0.08)" strokeWidth="0.7" fill="rgba(216,90,48,0.04)" />
                <path d={hexPath(310, 198, 18)} stroke="rgba(42,36,32,0.09)" strokeWidth="0.7" />
                {/* Small hexagons */}
                <path d={hexPath(150, 28, 14)} stroke="rgba(42,36,32,0.08)" strokeWidth="0.6" fill="rgba(216,90,48,0.05)" />
                <path d={hexPath(298, 40, 15)} stroke="rgba(42,36,32,0.07)" strokeWidth="0.6" />
                <path d={hexPath(30, 134, 17)} stroke="rgba(42,36,32,0.08)" strokeWidth="0.6" fill="rgba(216,90,48,0.04)" />
                <path d={hexPath(72, 198, 14)} stroke="rgba(42,36,32,0.07)" strokeWidth="0.6" />
                <path d={hexPath(250, 226, 11)} stroke="rgba(42,36,32,0.07)" strokeWidth="0.5" fill="rgba(216,90,48,0.05)" />
                <path d={hexPath(318, 98, 10)} stroke="rgba(42,36,32,0.06)" strokeWidth="0.5" fill="rgba(216,90,48,0.04)" />
                {/* Coral accent nodes */}
                <circle cx="150" cy="28" r="2.5" fill="rgba(216,90,48,0.55)" />
                <circle cx="194" cy="130" r="3" fill="rgba(216,90,48,0.50)" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative concentric circles — bottom-right, partially clipped */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 -mb-20 -mr-20 opacity-[0.035] pointer-events-none hidden lg:block text-coral"
      >
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="60" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <circle cx="150" cy="150" r="100" stroke="currentColor" strokeWidth="0.6" fill="none" />
          <circle cx="150" cy="150" r="140" stroke="currentColor" strokeWidth="0.4" fill="none" />
        </svg>
      </div>
    </section>
  );
}

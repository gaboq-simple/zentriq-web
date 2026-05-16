'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

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
              className="text-[11px] uppercase tracking-[0.25em] text-muted font-heading font-medium mb-5"
            >
              Manifiesto
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-warm-dark text-[28px] sm:text-[32px] leading-[1.15] font-medium tracking-tight"
            >
              No somos una consultora.
              <br />
              Somos los que lo resuelven
              <span className="text-warm-dark">.</span>
            </motion.h2>
          </div>

          {/* Right column */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-col gap-5"
          >
            <motion.p
              variants={fadeInUp}
              className="text-[16px] text-muted leading-[1.7]"
            >
              Cada negocio tiene procesos que drenan tiempo, datos que nadie
              entiende, y herramientas que nadie usa.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-[16px] text-muted leading-[1.7]"
            >
              Nosotros vemos eso y pensamos: hay una forma mejor. Y la
              construimos. Sin presentaciones de 40 slides. Sin jerga. Solo
              soluciones que al día siguiente ya están funcionando.
            </motion.p>
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

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HexNetwork from './HexNetwork';
import Button from './ui/Button';

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function Hero() {
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIndicatorVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-dark overflow-hidden">
      {/* Interactive hex network background */}
      <HexNetwork nodeCount={55} className="z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="text-eyebrow uppercase tracking-[0.25em] text-cream/70 font-heading font-medium mb-6"
        >
          Laboratorio de tecnología aplicada
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="font-heading text-cream text-display-sm sm:text-[48px] lg:text-display-lg leading-[1.08] font-medium max-w-3xl tracking-tight"
        >
          Encontramos el punto exacto
          <br className="hidden sm:block" /> donde intervenir
          <span className="text-coral">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
          className="text-[15px] text-muted leading-relaxed mt-6 max-w-[420px]"
        >
          Automatización, datos y software a la medida.
          Construimos lo que tu negocio necesita para dejar de perder tiempo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mb-8 sm:mb-10"
        >
          <span className="text-meta text-light-muted font-body">
            Software en producción
          </span>
          <span className="hidden sm:inline-block w-px h-3 bg-cream/15" aria-hidden="true" />
          <span className="text-meta text-light-muted font-body">
            Equipos de 5 a 500 personas
          </span>
          <span className="hidden sm:inline-block w-px h-3 bg-cream/15" aria-hidden="true" />
          <span className="text-meta text-light-muted font-body">
            CDMX · Remoto LATAM
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.65 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button as="a" href="#soluciones" variant="primary" size="default">
            Ver lo que hacemos
          </Button>
          <Button as="a" href="#manifiesto" variant="link" size="default">
            Conocer al equipo
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
          className="text-micro text-cream/45 font-body mt-4 tracking-wide"
        >
          Primera llamada de 20 min. Sin compromiso.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: indicatorVisible && !scrolledPast ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
            <rect x="7" y="1" width="6" height="10" rx="3" stroke="rgba(250,246,241,0.2)" strokeWidth="1.5" />
            <circle cx="10" cy="5" r="1.5" fill="rgba(250,246,241,0.25)" />
            <path d="M4 18l6 6 6-6" stroke="rgba(250,246,241,0.15)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import SilkShader from './SilkShader';
import Button from './ui/Button';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const; // ease-out-expo

// Opacidad del overlay #0A0A0F sobre la seda → más mate, resalta el texto.
// Sube para una seda más oscura/apagada; baja para más brillo. (0–1)
const SILK_DARKEN = 0.3;

export default function Hero() {
  const reduce = useReducedMotion();
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

  // initial gateado por reduced-motion: con reduce, render directo al estado final.
  const rise = (y = 12) => (reduce ? false : { opacity: 0, y });

  return (
    <section className="relative min-h-svh flex items-center bg-bg overflow-hidden">
      {/* Fondo: imagen de seda negra con deriva Ken Burns muy lenta */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="ken-burns absolute inset-0">
          <Image
            src="/hero-seda.jpg"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Ondulación líquida WebGL encima de la imagen (con fallback a la estática) */}
        <SilkShader />

        {/* Overlay mate: atenúa el brillo/reflejos de la seda (calibrable SILK_DARKEN) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: `rgba(10, 10, 15, ${SILK_DARKEN})` }}
        />

        {/* Degradado de legibilidad: oscuro a la izquierda → transparente a la derecha */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #0A0A0F 0%, rgba(10,10,15,0.85) 30%, rgba(10,10,15,0.45) 60%, rgba(10,10,15,0.15) 100%)',
          }}
        />
        {/* Refuerzo móvil: oscurecido vertical para legibilidad a cualquier ancho */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 sm:hidden"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.35) 50%, rgba(10,10,15,0.7) 100%)',
          }}
        />
        {/* Fundido inferior: la seda se desvanece a #0A0A0F sólido en el borde de
            abajo → unión continua y sin corte con el Manifiesto (mismo negro) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%]"
          style={{
            background:
              'linear-gradient(to top, #0A0A0F 0%, rgba(10,10,15,0.9) 12%, rgba(10,10,15,0) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Etiqueta */}
        <motion.p
          initial={rise()}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.5 }}
          className="text-[15px] font-medium text-teal font-sans mb-6"
        >
          Estudio de software a la medida
        </motion.p>

        {/* Título: visible por defecto; la animación (CSS hero-rise) sólo lo realza */}
        <h1 className="font-sans text-text text-[40px] sm:text-[56px] lg:text-[76px] leading-[1.04] font-medium max-w-3xl tracking-[-0.03em] text-balance">
          <span className="block hero-rise">Encontramos el punto exacto</span>
          <span className="block hero-rise hero-rise-2">
            donde intervenir<span className="text-teal">.</span>
          </span>
        </h1>

        <motion.p
          initial={rise(16)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_EXPO, delay: 1.0 }}
          className="text-[15px] text-soft leading-relaxed mt-6 max-w-[420px]"
        >
          Automatización, datos y software para tu operación.
          Construimos lo que tu negocio necesita para dejar de perder tiempo.
        </motion.p>

        <motion.div
          initial={rise(16)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_EXPO, delay: 1.14 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mb-8 sm:mb-10 mt-8"
        >
          <span className="text-meta text-quiet font-sans">
            Software en producción
          </span>
          <span className="hidden sm:inline-block w-px h-3 bg-white/10" aria-hidden="true" />
          <span className="text-meta text-quiet font-sans">
            Equipos de 5 a 500 personas
          </span>
          <span className="hidden sm:inline-block w-px h-3 bg-white/10" aria-hidden="true" />
          <span className="text-meta text-quiet font-sans">
            CDMX · Remoto LATAM
          </span>
        </motion.div>

        <motion.div
          initial={rise(16)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_EXPO, delay: 1.26 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button as="a" href="#soluciones" variant="primary" size="default">
            Ver lo que hacemos
          </Button>
          <Button as="a" href="#proceso" variant="secondary" size="default">
            Cómo trabajamos
          </Button>
        </motion.div>

        <motion.p
          initial={rise(16)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_EXPO, delay: 1.38 }}
          className="text-micro text-quiet font-sans mt-4 tracking-wide"
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
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={reduce ? undefined : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
            <rect x="7" y="1" width="6" height="10" rx="3" stroke="rgba(232,232,237,0.2)" strokeWidth="1.5" />
            <circle cx="10" cy="5" r="1.5" fill="rgba(0,194,168,0.5)" />
            <path d="M4 18l6 6 6-6" stroke="rgba(232,232,237,0.15)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

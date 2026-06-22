'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const; // ease-out-expo

// cobe usa WebGL → solo cliente. dynamic ssr:false evita cualquier intento de
// render en servidor / mismatch de hidratación (válido aquí porque la sección
// ya es client component).
const ConnectionGlobe = dynamic(() => import('./ConnectionGlobe'), { ssr: false });

export default function ConnectionSection() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const textStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const fadeUp: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
      };
  const globeFade: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_EXPO } },
      };

  return (
    <section id="conexion" className="bg-bg">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        {/* Globo (móvil: arriba) */}
        <motion.div variants={globeFade}>
          <ConnectionGlobe />
        </motion.div>

        {/* Texto (móvil: abajo), en cascada */}
        <motion.div variants={textStagger}>
          <motion.p
            variants={fadeUp}
            className="text-[13px] font-medium text-teal font-sans mb-5"
          >
            El punto exacto
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-sans text-text text-[clamp(32px,5vw,48px)] font-semibold tracking-[-0.03em] leading-[1.1] text-balance"
          >
            Cada sistema tiene un punto donde todo se conecta. Ahí trabajamos
            <span className="text-teal">.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[14px] text-soft leading-[1.6] mt-4 max-w-md"
          >
            Encontramos ese punto y construimos desde ahí.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

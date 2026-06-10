'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const; // ease-out-expo
const TEAL = '#00C2A8';
const VIVO = '#33D4BE';

// ─── Íconos line-art teal ──────────────────────────────────────────────────────
// Realce al hover por CSS (.group:hover, ver globals.css) — mecanismo robusto.
// En reposo / móvil / reduced-motion los íconos quedan COMPLETOS por defecto.
const svgProps = {
  width: 28,
  height: 28,
  viewBox: '0 0 40 40',
  fill: 'none',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

// 1. Automatización: cadena de 3 cajas + conexiones (se dibuja izq→der)
function AutomationIcon() {
  return (
    <svg {...svgProps}>
      <rect className="sol-draw sol-d0" pathLength={1} x="3" y="15.5" width="9" height="9" rx="2.5" stroke={TEAL} />
      <path className="sol-draw sol-d1" pathLength={1} d="M12 20 H15 M13.6 18.6 L15.2 20 L13.6 21.4" stroke={TEAL} />
      <rect className="sol-draw sol-d2" pathLength={1} x="15.5" y="15.5" width="9" height="9" rx="2.5" stroke={TEAL} />
      <path className="sol-draw sol-d3" pathLength={1} d="M24.5 20 H27.5 M26.1 18.6 L27.7 20 L26.1 21.4" stroke={TEAL} />
      <rect className="sol-draw sol-d4" pathLength={1} x="28" y="15.5" width="9" height="9" rx="2.5" stroke={VIVO} />
    </svg>
  );
}

// 2. Software a la medida: 2 cubos iso que entran de lados opuestos y se ensamblan
function SoftwareIcon() {
  return (
    <svg {...svgProps}>
      <g className="sol-slide-l" stroke={TEAL}>
        <path d="M16 9 L23 12.5 L23 19.5 L16 23 L9 19.5 L9 12.5 Z" />
        <path d="M16 16 L16 9 M16 16 L23 19.5 M16 16 L9 19.5" />
      </g>
      <g className="sol-slide-r" stroke={VIVO}>
        <path d="M24 17 L31 20.5 L31 27.5 L24 31 L17 27.5 L17 20.5 Z" />
        <path d="M24 24 L24 17 M24 24 L31 27.5 M24 24 L17 27.5" />
      </g>
    </svg>
  );
}

// 3. Datos con sentido: barras que crecen + dato clave (vivo) que destaca al final
function DataIcon() {
  return (
    <svg {...svgProps}>
      <path className="sol-draw sol-d0" pathLength={1} d="M6 33 H34" stroke={TEAL} opacity={0.5} />
      <path className="sol-draw sol-d1" pathLength={1} d="M10 33 L10 24" stroke={TEAL} />
      <path className="sol-draw sol-d2" pathLength={1} d="M18 33 L18 19" stroke={TEAL} />
      <path className="sol-draw sol-d3" pathLength={1} d="M26 33 L26 14" stroke={TEAL} />
      <path className="sol-draw sol-d4" pathLength={1} d="M33 33 L33 9" stroke={VIVO} />
      <circle className="sol-pop sol-pop0" cx="33" cy="7" r="2" fill={VIVO} stroke="none" />
    </svg>
  );
}

// 4. Integraciones: nodos cuyas conexiones convergen al hub (que late al final)
function NodesIcon() {
  return (
    <svg {...svgProps}>
      <circle className="sol-draw sol-d0" pathLength={1} cx="8" cy="8" r="3" stroke={TEAL} />
      <path className="sol-draw sol-d1" pathLength={1} d="M10.1 10.1 L17.9 17.9" stroke={TEAL} opacity={0.6} />
      <circle className="sol-draw sol-d2" pathLength={1} cx="32" cy="8" r="3" stroke={TEAL} />
      <path className="sol-draw sol-d3" pathLength={1} d="M29.9 10.1 L22.1 17.9" stroke={TEAL} opacity={0.6} />
      <circle className="sol-draw sol-d4" pathLength={1} cx="8" cy="32" r="3" stroke={TEAL} />
      <path className="sol-draw sol-d5" pathLength={1} d="M10.1 29.9 L17.9 22.1" stroke={TEAL} opacity={0.6} />
      <circle className="sol-draw sol-d6" pathLength={1} cx="32" cy="32" r="3" stroke={TEAL} />
      <path className="sol-draw sol-d7" pathLength={1} d="M29.9 29.9 L22.1 22.1" stroke={TEAL} opacity={0.6} />
      <circle className="sol-pop sol-pop1" cx="20" cy="20" r="3" fill={VIVO} stroke="none" />
    </svg>
  );
}

const solutions = [
  {
    title: 'Automatización',
    description:
      'Procesos manuales, hojas de cálculo compartidas, reportes que alguien copia-pega cada lunes. Lo que hoy hace una persona, mañana lo hace el sistema.',
    Icon: AutomationIcon,
  },
  {
    title: 'Software a la medida',
    description:
      'Web y móvil construidas en Next.js, React Native y TypeScript. Producto que tu equipo opera el primer día, no después de tres meses de onboarding.',
    Icon: SoftwareIcon,
  },
  {
    title: 'Datos con sentido',
    description:
      'ETL, modelado y dashboards accionables. De datos crudos en cinco sistemas distintos a los números que importan, actualizados al minuto.',
    Icon: DataIcon,
  },
  {
    title: 'Integraciones e infraestructura',
    description:
      'Stripe, Supabase, APIs internas, autenticación. Conectamos lo que tu negocio ya usa y dejamos infraestructura que escala sin que la mires.',
    Icon: NodesIcon,
  },
];

export default function Solutions() {
  const reduce = useReducedMotion() ?? false;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const grid: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const fadeUp: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
      };
  const cell: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
      };

  return (
    <section id="soluciones" className="bg-bg">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-6 py-24 md:py-32"
      >
        {/* Eyebrow */}
        <motion.p variants={fadeUp} className="text-[13px] font-medium text-teal font-sans mb-5">
          Soluciones
        </motion.p>

        {/* Titular */}
        <motion.h2
          variants={fadeUp}
          className="font-sans text-text text-[clamp(32px,5vw,48px)] font-semibold tracking-[-0.03em] leading-[1.1] text-balance max-w-2xl"
        >
          Cuatro tipos de problemas que resolvemos bien
          <span className="text-teal">.</span>
        </motion.h2>

        {/* Cuadrícula 2×2 */}
        <motion.div
          variants={grid}
          className="mt-12 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.08]"
        >
          {solutions.map((s) => (
            <motion.div
              key={s.title}
              variants={cell}
              whileHover={reduce ? undefined : { y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="group relative bg-bg p-7 transition-colors duration-300 hover:bg-teal/[0.04]"
            >
              <div className="text-teal">
                <s.Icon />
              </div>
              <h3 className="font-sans text-[17px] font-semibold text-text tracking-[-0.01em] mt-5">
                {s.title}
              </h3>
              <p className="text-[14px] text-soft leading-[1.6] mt-2.5 max-w-[42ch]">
                {s.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pie — stack técnico */}
        <motion.div
          variants={fadeUp}
          className="mt-14 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
        >
          <span className="text-[13px] font-medium text-teal font-sans shrink-0">
            Stack principal
          </span>
          <span className="font-mono text-[13px] text-soft leading-relaxed">
            Next.js · React Native · TypeScript · Supabase · PostgreSQL · Stripe · Vercel
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const solutions = [
  {
    title: 'Automatizacion',
    description:
      'Identificamos las tareas repetitivas que consumen horas y las eliminamos. Tu equipo se enfoca en lo que realmente importa.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L17 6V14L10 18L3 14V6L10 2Z" stroke="currentColor" strokeWidth="1" />
        <path d="M10 6V14" stroke="currentColor" strokeWidth="0.8" />
        <path d="M6 8L10 10L14 8" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
  },
  {
    title: 'Software a la medida',
    description:
      'Plataformas y apps disenadas para tu operacion. No adaptaciones genericas — soluciones que nacen de tu problema real.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1" />
        <path d="M7 8L10 11L13 8" stroke="currentColor" strokeWidth="0.8" />
        <line x1="3" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Datos con sentido',
    description:
      'Estructura, limpieza y visibilidad. Convertimos tu informacion en decisiones claras, no en reportes que nadie lee.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1" />
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="10" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Implementacion tech',
    description:
      'Adoptamos herramientas nuevas sin caos. Integracion limpia, capacitacion real, transicion sin drama.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10H8L10 6L12 14L14 10H16" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        <circle cx="4" cy="10" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="16" cy="10" r="1" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
];

export default function Solutions() {
  return (
    <section id="soluciones" className="relative bg-cream grain overflow-hidden">
      {/* Decorative starburst — top-left, partially clipped */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 -mt-16 -ml-16 opacity-[0.025] pointer-events-none hidden lg:block"
      >
        <svg width="250" height="250" viewBox="0 0 250 250">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1="125"
                y1="125"
                x2={125 + 120 * Math.cos(angle)}
                y2={125 + 120 * Math.sin(angle)}
                stroke="#8A8078"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-28 md:py-36 border-t border-light-border">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-[11px] uppercase tracking-[0.25em] text-muted font-heading font-medium mb-14"
        >
          Lo que resolvemos
        </motion.p>

        {/* Single stagger container for all 4 items */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-light-border">
            <motion.div variants={fadeInUp} className="group p-6 sm:p-8">
              <SolutionItem {...solutions[0]} />
            </motion.div>
            <motion.div variants={fadeInUp} className="group p-6 sm:p-8">
              <SolutionItem {...solutions[1]} />
            </motion.div>
          </div>

          <div className="border-t border-light-border" />

          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-light-border">
            <motion.div variants={fadeInUp} className="group p-6 sm:p-8">
              <SolutionItem {...solutions[2]} />
            </motion.div>
            <motion.div variants={fadeInUp} className="group p-6 sm:p-8">
              <SolutionItem {...solutions[3]} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SolutionItem({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-10 h-10 rounded-md bg-dark text-coral flex items-center justify-center transition-colors duration-300 group-hover:bg-coral group-hover:text-cream">
        {icon}
      </div>
      <h3 className="font-heading text-[16px] font-medium text-warm-dark tracking-tight">
        {title}
      </h3>
      <p className="text-[13px] text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}

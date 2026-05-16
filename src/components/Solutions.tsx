'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const solutions = [
  {
    title: 'Automatización',
    description:
      'Procesos manuales, hojas de cálculo compartidas, reportes que alguien copia-pega cada lunes. Lo que hoy hace una persona, mañana lo hace el sistema.',
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
      'Web y móvil construidas en Next.js, React Native y TypeScript. Producto que tu equipo opera el primer día, no después de tres meses de onboarding.',
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
      'ETL, modelado y dashboards accionables. De datos crudos en cinco sistemas distintos a los números que importan, actualizados al minuto.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1" />
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="10" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Integraciones e infraestructura',
    description:
      'Stripe, Supabase, APIs internas, autenticación. Conectamos lo que tu negocio ya usa y dejamos infraestructura que escala sin que la mires.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" />
        <rect x="12" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" />
        <rect x="2" y="12" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" />
        <rect x="12" y="12" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" />
        <line x1="8" y1="5" x2="12" y2="5" stroke="currentColor" strokeWidth="0.8" />
        <line x1="5" y1="8" x2="5" y2="12" stroke="currentColor" strokeWidth="0.8" />
        <line x1="15" y1="8" x2="15" y2="12" stroke="currentColor" strokeWidth="0.8" />
        <line x1="8" y1="15" x2="12" y2="15" stroke="currentColor" strokeWidth="0.8" />
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
        className="absolute top-0 left-0 -mt-16 -ml-16 opacity-[0.04] pointer-events-none hidden lg:block"
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
          className="text-eyebrow uppercase tracking-[0.25em] text-muted font-heading font-medium mb-6"
        >
          Lo que resolvemos
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="font-heading text-heading md:text-[40px] font-medium text-warm-dark tracking-tight leading-[1.1] mb-16 max-w-2xl"
        >
          Cuatro tipos de problemas que resolvemos bien.
        </motion.h2>

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

          <motion.div
            variants={fadeInUp}
            className="mt-20 pt-8 border-t border-light-border flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            <span className="text-eyebrow uppercase tracking-[0.2em] text-muted font-heading font-medium">
              Stack principal
            </span>
            <span className="text-micro text-muted/80 font-body tracking-wide">
              Next.js · React Native · TypeScript · Supabase · PostgreSQL · Stripe · Vercel
            </span>
          </motion.div>
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
      <h3 className="font-heading text-body-lg font-medium text-warm-dark tracking-tight">
        {title}
      </h3>
      <p className="text-meta text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}

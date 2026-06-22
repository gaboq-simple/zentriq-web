'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import ProjectCardVisual, { type ProjectVisual } from '@/components/ProjectCardVisual';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const; // ease-out-expo

const projects: { category: string; title: string; description: string; visual: ProjectVisual }[] = [
  {
    category: 'Marketplace',
    title: 'Plataforma de servicios',
    description:
      'Matching inteligente entre oferta y demanda, pagos integrados, operación automatizada.',
    visual: 'marketplace',
  },
  {
    category: 'Automatización',
    title: 'Sistema de asistencia',
    description:
      'Control inteligente de personal, reportes automáticos, eliminación total de procesos en papel.',
    visual: 'automation',
  },
  {
    category: 'Datos',
    title: 'Pipeline de inteligencia',
    description:
      'ETL limpio, dashboards accionables, la información correcta en el momento correcto.',
    visual: 'data',
  },
];

export default function Projects() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  // cascada de las 3 cards al entrar al viewport
  const cardsRow: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const fadeUp: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
      };
  // card: entrada + estado "hover" (elevación). El borde teal se maneja por CSS.
  const card: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
        hover: { y: -6, transition: { duration: 0.3, ease: 'easeOut' } },
      };

  return (
    <section id="proyectos" className="bg-bg">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-6 py-24 md:py-32"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="text-[13px] font-medium text-teal font-sans mb-5"
        >
          Lo que construimos
        </motion.p>

        {/* Titular */}
        <motion.h2
          variants={fadeUp}
          className="font-sans text-text text-[clamp(32px,5vw,48px)] font-semibold tracking-[-0.03em] leading-[1.1] text-balance max-w-2xl"
        >
          El tipo de soluciones que diseñamos
          <span className="text-teal">.</span>
        </motion.h2>

        {/* Línea de apoyo — framing honesto: son ejemplos, no clientes reales */}
        <motion.p
          variants={fadeUp}
          className="text-[14px] text-soft leading-[1.6] mt-4 max-w-xl"
        >
          Ejemplos representativos de lo que hacemos bien. Cada proyecto, de la idea a producción.
        </motion.p>

        {/* Cards — 1 col móvil → 3 cols desde md */}
        <motion.div
          variants={cardsRow}
          className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={card}
              whileHover={reduce ? undefined : 'hover'}
              className="group rounded-[14px] overflow-hidden bg-card-float border border-white/[0.08] transition-colors duration-300 hover:border-teal/30"
            >
              {/* Slot visual — line-art teal sobre el fondo oscuro de la card */}
              <div className="relative aspect-[16/11] overflow-hidden border-b border-white/[0.08]">
                <ProjectCardVisual variant={project.visual} />
              </div>

              {/* Contenido */}
              <div className="p-5">
                <p className="text-[13px] font-medium text-teal font-sans">
                  {project.category}
                </p>
                <h3 className="text-[16px] font-semibold text-text tracking-[-0.01em] mt-3">
                  {project.title}
                </h3>
                <p className="text-[13px] text-soft leading-[1.55] mt-2">
                  {project.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

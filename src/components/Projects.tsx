'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import ProjectCardVisual, { type ProjectVisual } from '@/components/ProjectCardVisual';

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
  return (
    <section id="proyectos" className="relative bg-cream grain">
      <div className="max-w-6xl mx-auto px-6 py-28 md:py-36">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-[11px] uppercase tracking-[0.25em] text-muted font-heading font-medium mb-14"
        >
          Proyectos
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeInUp}
              style={{ transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1), box-shadow 280ms cubic-bezier(0.16,1,0.3,1), border-color 280ms cubic-bezier(0.16,1,0.3,1)' }}
              className="group bg-dark rounded-lg overflow-hidden cursor-pointer border border-white/[0.06] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] hover:border-white/[0.12]"
            >
              {/* Visual slot */}
              <div className="relative aspect-[16/10] bg-warm-dark/80 overflow-hidden">
                {/* Hex pattern background */}
                <svg
                  className="absolute inset-0 w-full h-full text-cream/[0.06]"
                  viewBox="0 0 200 125"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <pattern id={`hex-${project.category}`} x="0" y="0" width="40" height="46" patternUnits="userSpaceOnUse">
                    <path d="M20 2L36 11V29L20 38L4 29V11L20 2Z" stroke="currentColor" strokeWidth="0.3" fill="none" />
                  </pattern>
                  <rect width="100%" height="100%" fill={`url(#hex-${project.category})`} />
                </svg>

                {/* Project visual */}
                <ProjectCardVisual variant={project.visual} />

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-cream/10">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-cream/60 group-hover:text-cream transition-colors duration-300 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M4 10L10 4M10 4H5M10 4V9"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 pb-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted/40 font-heading mb-2">
                  {project.category}
                </p>
                <h3 className="font-heading text-[16px] font-medium text-cream tracking-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-[12px] text-cream/25 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

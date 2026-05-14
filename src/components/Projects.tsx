'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const projects = [
  {
    category: 'Marketplace',
    title: 'Plataforma de servicios',
    description:
      'Matching inteligente entre oferta y demanda, pagos integrados, operacion automatizada.',
  },
  {
    category: 'Automatizacion',
    title: 'Sistema de asistencia',
    description:
      'Control inteligente de personal, reportes automaticos, eliminacion total de procesos en papel.',
  },
  {
    category: 'Datos',
    title: 'Pipeline de inteligencia',
    description:
      'ETL limpio, dashboards accionables, la informacion correcta en el momento correcto.',
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
              className="group bg-dark rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] cursor-pointer"
            >
              {/* Visual placeholder */}
              <div className="relative aspect-[16/10] bg-warm-dark/80 flex items-center justify-center overflow-hidden">
                {/* Hex pattern background */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-[0.06]"
                  viewBox="0 0 200 125"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <pattern id={`hex-${project.category}`} x="0" y="0" width="40" height="46" patternUnits="userSpaceOnUse">
                    <path d="M20 2L36 11V29L20 38L4 29V11L20 2Z" stroke="#D85A30" strokeWidth="0.3" fill="none" />
                  </pattern>
                  <rect width="100%" height="100%" fill={`url(#hex-${project.category})`} />
                </svg>
                <span className="relative text-[11px] uppercase tracking-[0.2em] text-muted/30 font-heading">
                  Vista del proyecto
                </span>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-coral/10">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-muted/40 group-hover:text-coral transition-colors duration-300 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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

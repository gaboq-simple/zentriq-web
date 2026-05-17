'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import Button from './ui/Button';

export default function CTAFooter() {
  return (
    <footer id="contacto" className="bg-dark">
      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-6 py-28 md:py-36">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-cream text-heading-md sm:text-heading leading-[1.15] font-medium tracking-tight max-w-md"
          >
            Tienes un problema.
            <br />
            Nosotros tenemos la forma
            <span className="text-cream">.</span>
          </motion.h2>

          <motion.div variants={fadeInUp}>
            <Button as="a" href="mailto:hola@zentriq.mx" variant="primary" size="lg">
              Hablemos
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer de 4 columnas */}
      <div className="border-t border-cream/[0.08]">
        <div className="max-w-6xl mx-auto px-6 py-16">

          {/* Grid de columnas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">

            {/* Columna 1 — Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5 text-cream">
                <svg
                  width="22"
                  height="25"
                  viewBox="0 0 28 32"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M14 1L26.124 8V22L14 29L1.876 22V8L14 1Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <circle cx="14" cy="15" r="2" fill="currentColor" opacity="0.6" />
                  <line x1="14" y1="1" x2="14" y2="13" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                  <line x1="14" y1="17" x2="14" y2="29" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                  <line x1="1.876" y1="8" x2="12" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                  <line x1="16" y1="15" x2="26.124" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                </svg>
                <span className="font-heading text-meta tracking-[0.2em] uppercase">
                  Zentriq
                </span>
              </div>
              <p className="text-meta text-cream/60 leading-relaxed max-w-[200px]">
                Estudio de software a la medida.
              </p>
              <p className="text-micro text-cream/45">
                CDMX · México
              </p>
            </div>

            {/* Columna 2 — Sitio */}
            <div className="flex flex-col gap-4">
              <h4 className="text-eyebrow uppercase tracking-[0.08em] text-cream/55 font-heading font-medium">
                Sitio
              </h4>
              <nav className="flex flex-col gap-3">
                <a href="#manifiesto" className="text-meta text-cream/70 hover:text-cream transition-colors duration-300 w-fit">
                  Nosotros
                </a>
                <a href="#soluciones" className="text-meta text-cream/70 hover:text-cream transition-colors duration-300 w-fit">
                  Soluciones
                </a>
                <a href="#proceso" className="text-meta text-cream/70 hover:text-cream transition-colors duration-300 w-fit">
                  Proceso
                </a>
                <a href="#proyectos" className="text-meta text-cream/70 hover:text-cream transition-colors duration-300 w-fit">
                  Proyectos
                </a>
                <a href="#faq" className="text-meta text-cream/70 hover:text-cream transition-colors duration-300 w-fit">
                  FAQ
                </a>
              </nav>
            </div>

            {/* Columna 3 — Contacto */}
            <div className="flex flex-col gap-4">
              <h4 className="text-eyebrow uppercase tracking-[0.08em] text-cream/55 font-heading font-medium">
                Contacto
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:hola@zentriq.mx"
                  className="text-meta text-cream/70 hover:text-cream transition-colors duration-300 w-fit"
                >
                  hola@zentriq.mx
                </a>
                {/*
                  Redes sociales — agregar aquí cuando las cuentas estén activas.
                  Para cada red, replicar este patrón:

                  <a
                    href="https://linkedin.com/company/zentriq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-meta text-cream/70 hover:text-cream transition-colors duration-300 w-fit"
                  >
                    LinkedIn
                  </a>
                */}
              </div>
            </div>

            {/* Columna 4 — Legal */}
            <div className="flex flex-col gap-4">
              <h4 className="text-eyebrow uppercase tracking-[0.08em] text-cream/55 font-heading font-medium">
                Legal
              </h4>
              <div className="flex flex-col gap-3">
                {/*
                  Cuando las páginas legales estén listas, reemplazar cada <span>
                  por un <a> con las mismas clases hover que los links de Sitio:
                  <a href="/privacidad" className="text-meta text-cream/70 hover:text-cream transition-colors duration-300 w-fit">
                */}
                <span className="text-meta text-cream/40 cursor-default w-fit" title="Próximamente">
                  Aviso de privacidad
                </span>
                <span className="text-meta text-cream/40 cursor-default w-fit" title="Próximamente">
                  Términos de servicio
                </span>
              </div>
            </div>

          </div>

          {/* Línea final: copyright + status */}
          <div className="border-t border-cream/[0.06] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-micro text-cream/45">
              © 2026 Zentriq. Hecho en CDMX.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span className="text-micro text-cream/55 tracking-wide">
                Todos los sistemas operativos
              </span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

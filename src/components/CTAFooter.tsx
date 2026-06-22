'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Button from './ui/Button';
import { Logo } from './icons/Logo';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const; // ease-out-expo

const siteLinks = [
  { href: '#manifiesto', label: 'Nosotros' },
  { href: '#soluciones', label: 'Soluciones' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#faq', label: 'FAQ' },
];

const legalLinks = [
  { href: '/privacidad', label: 'Aviso de privacidad' },
  { href: '/terminos', label: 'Términos de servicio' },
  { href: '/eliminacion-de-datos', label: 'Eliminación de datos' },
];

const linkClass =
  'text-meta text-soft hover:text-text transition-colors duration-300 w-fit rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-bg';
const colHeadingClass = 'text-[13px] font-medium text-teal font-sans';

export default function CTAFooter() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  // cascada de las columnas del footer al entrar al viewport
  const columns: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const fadeUp: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
      };

  return (
    <footer id="contacto" className="bg-bg">
      {/* CTA */}
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <motion.h2
            variants={fadeUp}
            className="font-sans text-text text-[clamp(32px,5vw,48px)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance max-w-md"
          >
            Tienes un problema.
            <br />
            Nosotros tenemos la forma
            <span className="text-teal">.</span>
          </motion.h2>

          <motion.div variants={fadeUp}>
            <Button as="a" href="mailto:contacto@zentriq.mx" variant="primary" size="lg">
              Hablemos
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer de 4 columnas */}
      <div className="border-t border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Grid de columnas */}
          <motion.div
            variants={columns}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12"
          >
            {/* Columna 1 — Brand */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <Logo size={36} />
              <p className="text-meta text-soft leading-relaxed max-w-[200px]">
                Estudio de software a la medida.
              </p>
              <p className="text-micro text-quiet">
                Ciudad de México, México
              </p>
            </motion.div>

            {/* Columna 2 — Sitio */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <h3 className={colHeadingClass}>Sitio</h3>
              <nav aria-label="Navegación del sitio" className="flex flex-col gap-3">
                {siteLinks.map((l) => (
                  <a key={l.href} href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* Columna 3 — Contacto */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <h3 className={colHeadingClass}>Contacto</h3>
              <div className="flex flex-col gap-3">
                <a href="mailto:contacto@zentriq.mx" className={linkClass}>
                  contacto@zentriq.mx
                </a>
              </div>
            </motion.div>

            {/* Columna 4 — Legal */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <h3 className={colHeadingClass}>Legal</h3>
              <nav aria-label="Enlaces legales" className="flex flex-col gap-3">
                {legalLinks.map((l) => (
                  <Link key={l.href} href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>

          {/* Línea final: copyright + status */}
          <div className="border-t border-white/[0.08] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-micro text-quiet">
              © {new Date().getFullYear()} Zentriq México. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full bg-teal animate-pulse motion-reduce:animate-none"
                aria-hidden="true"
              />
              <span className="text-micro text-soft tracking-wide">
                Todos los sistemas operativos
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

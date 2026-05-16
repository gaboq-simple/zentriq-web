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

      {/* Footer */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 text-cream/25">
            <svg width="16" height="18" viewBox="0 0 28 32" fill="none">
              <path
                d="M14 1L26.124 8V22L14 29L1.876 22V8L14 1Z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <circle cx="14" cy="15" r="1.5" fill="currentColor" />
            </svg>
            <span className="text-micro tracking-[0.15em] font-heading uppercase">
              Zentriq México
            </span>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-6 text-micro text-cream/20 tracking-wide">
            <a
              href="mailto:hola@zentriq.mx"
              className="hover:text-cream/40 transition-colors duration-300"
            >
              hola@zentriq.mx
            </a>
            <span>CDMX, México</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

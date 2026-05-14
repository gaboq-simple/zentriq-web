'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainerSlow } from '@/lib/animations';

const EASE = [0.25, 0.1, 0.25, 1] as const;
import HexNetwork from './HexNetwork';

const steps = [
  {
    num: '01',
    title: 'Escuchamos',
    description: 'Entendemos el problema real, no el sintoma',
  },
  {
    num: '02',
    title: 'Disenamos',
    description: 'Prototipamos rapido, validamos contigo',
  },
  {
    num: '03',
    title: 'Construimos',
    description: 'Codigo real, no demos bonitas',
  },
  {
    num: '04',
    title: 'Funciona',
    description: 'Deploy, soporte, iteracion continua',
    highlight: true,
  },
];

export default function Process() {
  return (
    <section id="proceso" className="relative bg-dark overflow-hidden">
      {/* Subtle hex network background */}
      <div className="absolute inset-0 opacity-40">
        <HexNetwork nodeCount={20} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 md:py-36">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-[11px] uppercase tracking-[0.25em] text-muted/30 font-heading font-medium mb-16"
        >
          Como trabajamos
        </motion.p>

        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeInUp}
              className="relative flex flex-col items-start lg:items-center text-left lg:text-center"
            >
              {/* Connecting line (desktop) */}
              {i < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-muted/20"
                  style={{ originX: 0 }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2, ease: EASE }}
                />
              )}

              {/* Number circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-[13px] font-heading font-medium mb-5 transition-colors ${
                  step.highlight
                    ? 'bg-coral/15 text-coral border border-coral/30'
                    : 'border border-muted/20 text-muted/60'
                }`}
              >
                {step.num}
              </div>

              <h3 className="font-heading text-[14px] font-medium text-cream mb-2 tracking-tight">
                {step.title}
              </h3>
              <p className="text-[12px] text-muted/40 leading-relaxed max-w-[180px]">
                {step.description}
              </p>

              {/* Mobile connecting line */}
              {i < steps.length - 1 && (
                <motion.div
                  className="lg:hidden absolute left-6 top-14 w-px bg-muted/20"
                  style={{ height: 'calc(100% - 14px)', originY: 0 }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

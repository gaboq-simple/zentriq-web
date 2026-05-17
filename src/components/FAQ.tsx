'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const faqs = [
  {
    question: '¿Cuánto tarda un proyecto típico?',
    answer:
      'Entre 6 y 12 semanas para un primer deploy a producción, ' +
      'dependiendo del alcance. La mayoría de proyectos los entregamos ' +
      'en 8 semanas. Si tu necesidad es más urgente, hablamos y ' +
      'evaluamos qué se puede comprimir sin sacrificar calidad.',
  },
  {
    question: '¿Cómo cobran?',
    answer:
      'Por proyecto, no por hora. Definimos alcance, fases y entregables ' +
      'contigo antes de empezar. Cobramos 40% al iniciar, 30% en el ' +
      'primer prototipo funcional y 30% al deploy. Sin sorpresas, sin ' +
      'horas facturables ocultas.',
  },
  {
    question: '¿Qué pasa después de que entreguen?',
    answer:
      'Incluimos 30 días de iteración continua sin costo después del ' +
      'deploy. Si quieres soporte o evolución continua del producto, ' +
      'ofrecemos retainer mensual con SLA definido. La mayoría de ' +
      'nuestros clientes se quedan en retainer porque el software ' +
      'siempre evoluciona.',
  },
  {
    question: '¿Trabajan con equipos in-house?',
    answer:
      'Sí. Podemos liderar el proyecto end-to-end o integrarnos a un ' +
      'equipo existente como refuerzo técnico. Trabajamos con tu stack, ' +
      'tus procesos y tu metodología. Funcionamos como tu equipo de ' +
      'tecnología cuando lo necesitas.',
  },
  {
    question: '¿Qué tecnologías usan?',
    answer:
      'Stack principal: Next.js, React Native, TypeScript, Supabase, ' +
      'PostgreSQL, Stripe, Vercel y AWS según necesidad. Si tu ' +
      'infraestructura ya está en otra plataforma, nos adaptamos. ' +
      'Priorizamos herramientas modernas, mantenibles y bien soportadas.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-cream grain overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 py-28 md:py-36">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <motion.p
            variants={fadeInUp}
            className="text-eyebrow uppercase tracking-[0.25em] text-muted font-heading font-medium mb-6"
          >
            Preguntas frecuentes
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-heading md:text-display-sm font-medium text-warm-dark tracking-tight leading-[1.1] max-w-2xl"
          >
            Lo que la gente nos pregunta antes de contratarnos.
          </motion.h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="border-b border-light-border last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-heading text-body-lg md:text-[18px] font-medium text-warm-dark group-hover:text-coral transition-colors duration-300">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2V14M2 8H14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="text-warm-dark/60 group-hover:text-coral transition-colors duration-300"
                      />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-body-lg text-warm-dark/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

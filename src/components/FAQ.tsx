'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const; // ease-out-expo

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
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  // cascada de las preguntas al entrar al viewport
  const list: Variants = {
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
    <section id="faq" className="bg-bg">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-4xl mx-auto px-6 py-24 md:py-32"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="text-[13px] font-medium text-teal font-sans mb-5"
        >
          Preguntas frecuentes
        </motion.p>

        {/* Titular */}
        <motion.h2
          variants={fadeUp}
          className="font-sans text-text text-[clamp(32px,5vw,48px)] font-semibold tracking-[-0.03em] leading-[1.1] text-balance max-w-2xl"
        >
          Lo que la gente nos pregunta antes de contratarnos
          <span className="text-teal">.</span>
        </motion.h2>

        {/* Accordion */}
        <motion.div variants={list} className="mt-12 md:mt-14 flex flex-col">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="border-b border-white/[0.08] last:border-b-0"
              >
                <h3>
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <span
                    id={`faq-question-${index}`}
                    className={`font-sans text-[16px] md:text-[18px] font-medium transition-colors duration-300 ${
                      isOpen ? 'text-teal' : 'text-text group-hover:text-teal'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-[transform,color] duration-300 ${
                      isOpen ? 'rotate-45 text-teal' : 'text-soft group-hover:text-teal'
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2V14M2 8H14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                </h3>

                {/* La región existe siempre (aria-controls válido); su contenido anima */}
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.3, ease: EASE_EXPO }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-[16px] text-soft leading-relaxed max-w-prose">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

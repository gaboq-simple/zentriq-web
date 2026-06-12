'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Logo } from '@/components/icons/Logo';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const; // ease-out-expo

const steps = [
  {
    number: '01',
    title: 'Conectas tu WhatsApp',
    description:
      'Tu negocio obtiene su propio número de WhatsApp Business verificado a ' +
      'través de nuestra plataforma. Configuración guiada, sin complicaciones técnicas.',
  },
  {
    number: '02',
    title: 'Tus clientes escriben',
    description:
      'Los clientes envían un mensaje para agendar. Zlot responde automáticamente ' +
      'con los horarios disponibles y opciones de servicio.',
  },
  {
    number: '03',
    title: 'La cita se agenda sola',
    description:
      'Confirmación instantánea, recordatorios automáticos antes de la cita, y ' +
      'gestión completa desde un dashboard.',
  },
];

const audiences = [
  { icon: '✂', label: 'Barberías y salones' },
  { icon: '◉', label: 'Estudios de tatuaje' },
  { icon: '✦', label: 'Consultorios y clínicas' },
  { icon: '▣', label: 'Negocios de servicios con citas' },
];

export default function ZlotPage() {
  const reduce = useReducedMotion() ?? false;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };
  const fadeUp: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
      };

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="rounded-sm">
            <Logo size={34} />
          </Link>
          <Link
            href="/"
            className="text-[13px] text-soft hover:text-text transition-colors duration-300"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.p
              variants={fadeUp}
              className="text-[13px] font-medium text-teal font-sans mb-6"
            >
              Producto Zentriq
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-sans text-text text-[clamp(36px,6vw,64px)] leading-[1.08] font-semibold tracking-[-0.03em] max-w-3xl"
            >
              Zlot — Agenda inteligente por WhatsApp
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[15px] text-soft leading-relaxed mt-6 max-w-xl"
            >
              Automatiza las citas de tu barbería directamente desde WhatsApp.
              Sin apps extras, sin complicaciones.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <Button as="a" href="mailto:contacto@zentriq.mx" variant="primary" size="default">
                Quiero automatizar mis citas
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* ¿Qué es Zlot? */}
        <section className="bg-surface">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-2 gap-12 md:gap-20"
            >
              <div>
                <motion.p
                  variants={fadeUp}
                  className="text-[13px] font-medium text-teal font-sans mb-5"
                >
                  ¿Qué es Zlot?
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="font-sans text-text text-[clamp(32px,5vw,48px)] leading-[1.1] font-semibold tracking-[-0.03em]"
                >
                  Gestión de citas automática por WhatsApp
                </motion.h2>
              </div>
              <motion.div variants={container} className="flex flex-col gap-5">
                <motion.p variants={fadeUp} className="text-[15px] text-soft leading-[1.7]">
                  Zlot es una plataforma desarrollada por Zentriq Mexico que permite a barberías
                  y negocios de servicios gestionar sus citas de forma automática a través de
                  WhatsApp.
                </motion.p>
                <motion.p variants={fadeUp} className="text-[15px] text-soft leading-[1.7]">
                  Los clientes envían un mensaje de WhatsApp y el sistema agenda, confirma, y
                  envía recordatorios — sin intervención manual. Tu equipo se enfoca en lo que
                  sabe hacer, no en contestar mensajes.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ¿Cómo funciona? */}
        <section className="bg-bg">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p
                variants={fadeUp}
                className="text-[13px] font-medium text-teal font-sans mb-5"
              >
                ¿Cómo funciona?
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-sans text-text text-[clamp(32px,5vw,48px)] leading-[1.1] font-semibold tracking-[-0.03em] mb-16 max-w-lg"
              >
                Tres pasos. Cero fricciones.
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {steps.map((step) => (
                  <motion.div
                    key={step.number}
                    variants={fadeUp}
                    className="border border-white/[0.08] rounded-sm p-8"
                  >
                    <span className="font-mono text-[28px] text-teal leading-none">
                      {step.number}
                    </span>
                    <h3 className="font-sans text-text text-[17px] font-semibold mt-4 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-soft leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tecnología oficial de Meta */}
        <section className="bg-surface">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p
                variants={fadeUp}
                className="text-[13px] font-medium text-teal font-sans mb-5"
              >
                Tecnología oficial
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-sans text-text text-[clamp(32px,5vw,48px)] leading-[1.1] font-semibold tracking-[-0.03em] mb-12 max-w-xl"
              >
                Integración oficial con Meta y WhatsApp Business
              </motion.h2>

              <motion.div variants={container} className="grid md:grid-cols-3 gap-8">
                <motion.div variants={fadeUp} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-sm bg-teal/[0.06] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M16.5 5.5L8 14L3.5 9.5" stroke="#00C2A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-sans text-text text-[17px] font-semibold">
                    API oficial de WhatsApp Business
                  </h3>
                  <p className="text-[14px] text-soft leading-relaxed">
                    Zlot utiliza la API oficial de WhatsApp Business como Meta Tech Provider
                    autorizado. Sin hacks, sin riesgos de baneo.
                  </p>
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-sm bg-teal/[0.06] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <rect x="3" y="3" width="14" height="14" rx="2" stroke="#00C2A8" strokeWidth="1.5" />
                      <path d="M7 10L9 12L13 8" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-sans text-text text-[17px] font-semibold">
                    Cuentas aisladas y verificadas
                  </h3>
                  <p className="text-[14px] text-soft leading-relaxed">
                    Cada negocio opera con su propia cuenta de WhatsApp Business verificada,
                    garantizando seguridad y privacidad de los datos.
                  </p>
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-sm bg-teal/[0.06] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="7" stroke="#00C2A8" strokeWidth="1.5" />
                      <path d="M10 6V10L13 13" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="font-sans text-text text-[17px] font-semibold">
                    Cumplimiento normativo
                  </h3>
                  <p className="text-[14px] text-soft leading-relaxed">
                    Cumplimos con las políticas de Meta y la Ley Federal de Protección de Datos
                    Personales en Posesión de los Particulares (LFPDPPP).
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ¿Para quién es Zlot? */}
        <section className="bg-bg">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p
                variants={fadeUp}
                className="text-[13px] font-medium text-teal font-sans mb-5"
              >
                ¿Para quién es?
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-sans text-text text-[clamp(32px,5vw,48px)] leading-[1.1] font-semibold tracking-[-0.03em] mb-12 max-w-lg"
              >
                Para negocios que viven de las citas
              </motion.h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {audiences.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    className="border border-white/[0.08] rounded-sm p-6 flex items-center gap-4"
                  >
                    <span className="text-[24px] text-teal" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="font-sans text-[15px] text-text font-semibold">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="border-t border-white/[0.08]">
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
                className="font-sans text-text text-[clamp(32px,5vw,48px)] leading-[1.1] font-semibold tracking-[-0.03em] max-w-md"
              >
                ¿Quieres automatizar tus citas?
              </motion.h2>
              <motion.div variants={fadeUp}>
                <Button as="a" href="mailto:contacto@zentriq.mx" variant="primary" size="lg">
                  Escríbenos
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[12px] text-text-3">
            © {new Date().getFullYear()} ZENTRIQ MEXICO. Todos los derechos reservados.
          </p>
          <nav className="flex items-center gap-6">
            <Link href="/privacidad" className="text-[12px] text-text-3 hover:text-text transition-colors duration-300">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-[12px] text-text-3 hover:text-text transition-colors duration-300">
              Términos
            </Link>
            <Link href="/eliminacion-de-datos" className="text-[12px] text-text-3 hover:text-text transition-colors duration-300">
              Eliminación de datos
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import Button from '@/components/ui/Button';
import { Logo } from '@/components/icons/Logo';

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
  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <header className="border-b border-cream/[0.08]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="rounded-sm">
            <Logo theme="light" size={34} />
          </Link>
          <Link
            href="/"
            className="text-meta text-cream/60 hover:text-cream transition-colors duration-300"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeInUp}
              className="text-eyebrow uppercase tracking-[0.25em] text-coral font-heading font-medium mb-6"
            >
              Producto Zentriq
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="font-heading text-cream text-heading-md sm:text-display-sm lg:text-display leading-[1.08] font-medium tracking-tight max-w-3xl"
            >
              Zlot — Agenda inteligente por WhatsApp
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-body-lg text-cream/65 leading-relaxed mt-6 max-w-xl"
            >
              Automatiza las citas de tu barbería directamente desde WhatsApp.
              Sin apps extras, sin complicaciones.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8">
              <Button as="a" href="mailto:contacto@zentriq.mx" variant="primary" size="default">
                Quiero automatizar mis citas
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* ¿Qué es Zlot? */}
        <section className="bg-cream grain relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-2 gap-12 md:gap-20"
            >
              <div>
                <motion.p
                  variants={fadeInUp}
                  className="text-eyebrow uppercase tracking-[0.25em] text-muted font-heading font-medium mb-5"
                >
                  ¿Qué es Zlot?
                </motion.p>
                <motion.h2
                  variants={fadeInUp}
                  className="font-heading text-warm-dark text-heading-md sm:text-heading leading-[1.15] font-medium tracking-tight"
                >
                  Gestión de citas automática por WhatsApp
                </motion.h2>
              </div>
              <motion.div variants={staggerContainer} className="flex flex-col gap-5">
                <motion.p variants={fadeInUp} className="text-body-lg text-muted leading-[1.7]">
                  Zlot es una plataforma desarrollada por Zentriq Mexico que permite a barberías
                  y negocios de servicios gestionar sus citas de forma automática a través de
                  WhatsApp.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-body-lg text-muted leading-[1.7]">
                  Los clientes envían un mensaje de WhatsApp y el sistema agenda, confirma, y
                  envía recordatorios — sin intervención manual. Tu equipo se enfoca en lo que
                  sabe hacer, no en contestar mensajes.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ¿Cómo funciona? */}
        <section className="bg-dark">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p
                variants={fadeInUp}
                className="text-eyebrow uppercase tracking-[0.25em] text-cream/70 font-heading font-medium mb-5"
              >
                ¿Cómo funciona?
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-cream text-heading-md sm:text-heading leading-[1.15] font-medium tracking-tight mb-16 max-w-lg"
              >
                Tres pasos. Cero fricciones.
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {steps.map((step) => (
                  <motion.div
                    key={step.number}
                    variants={fadeInUp}
                    className="border border-cream/[0.08] rounded-sm p-8"
                  >
                    <span className="font-heading text-coral text-heading-sm font-medium">
                      {step.number}
                    </span>
                    <h3 className="font-heading text-cream text-body-lg font-medium mt-4 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-body text-cream/55 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tecnología oficial de Meta */}
        <section className="bg-cream grain relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p
                variants={fadeInUp}
                className="text-eyebrow uppercase tracking-[0.25em] text-muted font-heading font-medium mb-5"
              >
                Tecnología oficial
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-warm-dark text-heading-md sm:text-heading leading-[1.15] font-medium tracking-tight mb-12 max-w-xl"
              >
                Integración oficial con Meta y WhatsApp Business
              </motion.h2>

              <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
                <motion.div variants={fadeInUp} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-sm bg-warm-dark/5 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M16.5 5.5L8 14L3.5 9.5" stroke="#D85A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-warm-dark text-body-lg font-medium">
                    API oficial de WhatsApp Business
                  </h3>
                  <p className="text-body text-muted leading-relaxed">
                    Zlot utiliza la API oficial de WhatsApp Business como Meta Tech Provider
                    autorizado. Sin hacks, sin riesgos de baneo.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-sm bg-warm-dark/5 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <rect x="3" y="3" width="14" height="14" rx="2" stroke="#D85A30" strokeWidth="1.5" />
                      <path d="M7 10L9 12L13 8" stroke="#D85A30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-warm-dark text-body-lg font-medium">
                    Cuentas aisladas y verificadas
                  </h3>
                  <p className="text-body text-muted leading-relaxed">
                    Cada negocio opera con su propia cuenta de WhatsApp Business verificada,
                    garantizando seguridad y privacidad de los datos.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-sm bg-warm-dark/5 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="7" stroke="#D85A30" strokeWidth="1.5" />
                      <path d="M10 6V10L13 13" stroke="#D85A30" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-warm-dark text-body-lg font-medium">
                    Cumplimiento normativo
                  </h3>
                  <p className="text-body text-muted leading-relaxed">
                    Cumplimos con las políticas de Meta y la Ley Federal de Protección de Datos
                    Personales en Posesión de los Particulares (LFPDPPP).
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ¿Para quién es Zlot? */}
        <section className="bg-dark">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p
                variants={fadeInUp}
                className="text-eyebrow uppercase tracking-[0.25em] text-cream/70 font-heading font-medium mb-5"
              >
                ¿Para quién es?
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-cream text-heading-md sm:text-heading leading-[1.15] font-medium tracking-tight mb-12 max-w-lg"
              >
                Para negocios que viven de las citas
              </motion.h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {audiences.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={fadeInUp}
                    className="border border-cream/[0.08] rounded-sm p-6 flex items-center gap-4"
                  >
                    <span className="text-heading-sm text-coral" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="text-body-lg text-cream/80 font-heading font-medium">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="border-t border-cream/[0.08]">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
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
                ¿Quieres automatizar tus citas?
              </motion.h2>
              <motion.div variants={fadeInUp}>
                <Button as="a" href="mailto:contacto@zentriq.mx" variant="primary" size="lg">
                  Escríbenos
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-cream/[0.08]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-micro text-cream/45">
            © {new Date().getFullYear()} ZENTRIQ MEXICO. Todos los derechos reservados.
          </p>
          <nav className="flex items-center gap-6">
            <Link href="/privacidad" className="text-micro text-cream/50 hover:text-cream transition-colors duration-300">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-micro text-cream/50 hover:text-cream transition-colors duration-300">
              Términos
            </Link>
            <Link href="/eliminacion-de-datos" className="text-micro text-cream/50 hover:text-cream transition-colors duration-300">
              Eliminación de datos
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Logo } from '@/components/icons/Logo';
import ChatGlass from '@/components/zlot/ChatGlass';

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

function ClockIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-teal">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7.5 V12 L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-teal">
      <path d="M6 16 V11 a6 6 0 0 1 12 0 V16 l1.5 2.5 H4.5 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 19 a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Logo WhatsApp monocromo (hereda currentColor) — para el botón teal del CTA.
function WhatsAppMono() {
  return (
    <svg width="19" height="19" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M16 1.6C8 1.6 1.6 8 1.6 16c0 2.8.78 5.45 2.13 7.68L1.5 30.5l7-2.2A14.4 14.4 0 0 0 16 30.4C24 30.4 30.4 24 30.4 16S24 1.6 16 1.6z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        fill="currentColor"
        d="M23.4 19.55c-.4-.2-2.37-1.17-2.74-1.3-.37-.14-.63-.2-.9.2-.26.4-1.02 1.3-1.25 1.56-.23.27-.46.3-.86.1-.4-.2-1.68-.62-3.2-1.97-1.18-1.05-1.98-2.36-2.21-2.76-.23-.4-.02-.62.18-.82.18-.18.4-.46.6-.7.2-.23.27-.4.4-.66.14-.27.07-.5-.03-.7-.1-.2-.9-2.17-1.23-2.97-.32-.78-.65-.67-.9-.68l-.76-.01c-.26 0-.7.1-1.06.5-.36.4-1.4 1.36-1.4 3.32 0 1.96 1.43 3.85 1.63 4.12.2.27 2.82 4.3 6.83 6.03.95.41 1.7.66 2.28.84.96.3 1.83.26 2.52.16.77-.12 2.37-.97 2.7-1.9.34-.94.34-1.74.24-1.9-.1-.17-.36-.27-.76-.47z"
      />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg width="19" height="19" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
      <path
        fill="#25D366"
        d="M16 0C7.2 0 0 7.2 0 16c0 2.8.74 5.5 2.13 7.9L0 32l8.3-2.17A15.9 15.9 0 0 0 16 32c8.8 0 16-7.2 16-16S24.8 0 16 0z"
      />
      <path
        fill="#fff"
        d="M23.4 19.55c-.4-.2-2.37-1.17-2.74-1.3-.37-.14-.63-.2-.9.2-.26.4-1.02 1.3-1.25 1.56-.23.27-.46.3-.86.1-.4-.2-1.68-.62-3.2-1.97-1.18-1.05-1.98-2.36-2.21-2.76-.23-.4-.02-.62.18-.82.18-.18.4-.46.6-.7.2-.23.27-.4.4-.66.14-.27.07-.5-.03-.7-.1-.2-.9-2.17-1.23-2.97-.32-.78-.65-.67-.9-.68l-.76-.01c-.26 0-.7.1-1.06.5-.36.4-1.4 1.36-1.4 3.32 0 1.96 1.43 3.85 1.63 4.12.2.27 2.82 4.3 6.83 6.03.95.41 1.7.66 2.28.84.96.3 1.83.26 2.52.16.77-.12 2.37-.97 2.7-1.9.34-.94.34-1.74.24-1.9-.1-.17-.36-.27-.76-.47z"
      />
    </svg>
  );
}

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
          <div className="flex items-center gap-2.5">
            <Link href="/" className="rounded-sm">
              <Logo size={34} />
            </Link>
            <span
              className="rounded-full border px-2 py-0.5 text-[10px] font-medium text-teal"
              style={{ borderColor: 'rgba(0,194,168,0.3)' }}
            >
              Producto
            </span>
          </div>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[13px] text-soft transition-colors duration-200 hover:text-text"
          >
            <span
              aria-hidden="true"
              className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 transition-colors duration-200 group-hover:border-teal/50"
            >
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                className="transition-transform duration-200 group-hover:-translate-x-[2px]"
              >
                <path d="M6 1 L1 6 L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Volver a Zentriq
          </Link>
        </div>
      </header>

      <main>
        {/* Hero — fondo con gradiente de marca (negro → teal oscuro hacia la ventana) */}
        <section
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(125deg, #0A0A0F 32%, #0c2a26 76%, #0e463c 100%)' }}
        >
          <div className="relative mx-auto max-w-[1200px] px-6 pt-16 pb-20 md:pt-24 md:pb-28">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:items-center lg:gap-16">
              {/* Columna izquierda — texto de venta (HTML real, SSR) */}
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="w-full min-w-0"
              >
                <motion.p
                  variants={fadeUp}
                  className="mb-5 text-[13px] font-medium font-sans"
                  style={{ color: '#33D4BE' }}
                >
                  Producto Zentriq
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  className="font-sans text-[clamp(40px,4.5vw,52px)] leading-[1.05] font-semibold tracking-[-0.03em]"
                  style={{ color: '#F5F5F7' }}
                >
                  Tus clientes escriben.
                  <br />
                  <span className="text-teal">Zlot agenda.</span>
                </motion.h1>

                <motion.p variants={fadeUp} className="mt-6 max-w-[560px] text-[15px] text-soft leading-[1.6]">
                  La agenda inteligente por WhatsApp. Confirma, recuerda y llena tu calendario — sin
                  apps extra y sin perder un solo mensaje.
                </motion.p>

                <motion.ul variants={fadeUp} className="mt-7 flex list-none flex-col gap-3.5">
                  <li className="flex items-center gap-3">
                    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px]" style={{ background: 'rgba(0,194,168,0.1)' }}>
                      <ClockIcon />
                    </span>
                    <span className="text-[14px] text-soft leading-[1.5]">
                      Responde en segundos, 24/7 — incluso con tu negocio cerrado.
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px]" style={{ background: 'rgba(0,194,168,0.1)' }}>
                      <BellIcon />
                    </span>
                    <span className="text-[14px] text-soft leading-[1.5]">
                      Menos ausencias con recordatorios automáticos.
                    </span>
                  </li>
                </motion.ul>

                <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Button
                    as="a"
                    href="mailto:contacto@zentriq.mx"
                    variant="primary"
                    size="default"
                    className="gap-2 whitespace-nowrap shadow-[0_10px_36px_rgba(0,194,168,0.4)]"
                  >
                    <WhatsAppMono />
                    Automatizar mis citas
                  </Button>
                  <a
                    href="#como-funciona"
                    className="text-[14px] text-soft underline decoration-white/20 underline-offset-4 transition-colors duration-300 hover:text-text hover:decoration-white/40"
                  >
                    Ver cómo funciona
                  </a>
                </motion.div>

                <motion.p variants={fadeUp} className="mt-3 text-[12px] text-text-3">
                  Sin tarjeta · Listo en minutos
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  className="mt-8 flex items-center gap-2.5 border-t border-white/[0.06] pt-5"
                >
                  <WhatsAppGlyph />
                  <p className="text-[12.5px] text-soft leading-[1.5]">
                    Plataforma <span className="text-text">oficial de WhatsApp Business</span> · Meta
                    Tech Provider
                  </p>
                </motion.div>
              </motion.div>

              {/* Columna derecha — ventana de chat liquid glass (enhancement) */}
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={reduce ? undefined : { opacity: 1, scale: 1 }}
                transition={reduce ? undefined : { delay: 0.7, duration: 0.6, ease: EASE_EXPO }}
                className="relative flex justify-center"
              >
                {/* glow teal detrás de la ventana */}
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: 'radial-gradient(closest-side, rgba(0,194,168,0.13), transparent)', filter: 'blur(50px)' }}
                />
                <ChatGlass />
              </motion.div>
            </div>
          </div>
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
        <section id="como-funciona" className="bg-bg">
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

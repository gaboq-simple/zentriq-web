'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const; // ease-out-expo

const steps = [
  { num: '01', title: 'Escuchamos', description: 'Entendemos el problema real, no el síntoma' },
  { num: '02', title: 'Diseñamos', description: 'Prototipamos rápido, validamos contigo' },
  { num: '03', title: 'Construimos', description: 'Código real, no demos bonitas' },
  { num: '04', title: 'Funciona', description: 'Deploy, soporte, iteración continua' },
];

// Progreso de scroll en el que cada paso se "activa" (afinable en vivo).
const THRESHOLDS = [0.12, 0.38, 0.64, 0.9];

type StepMode = 'scroll' | 'cascade' | 'active';

function Step({
  step,
  isLast,
  mode,
  activeAt,
  progress,
  fadeUp,
}: {
  step: (typeof steps)[number];
  isLast: boolean;
  mode: StepMode;
  activeAt: number;
  progress: MotionValue<number>;
  fadeUp: Variants;
}) {
  const restNum = 'rgba(255,255,255,0.12)';
  const activeNum = isLast ? '#33D4BE' : '#00C2A8';
  const restTitle = '#9A9AA5'; // text-soft (legible en reposo)
  const activeTitle = isLast ? '#33D4BE' : '#E8E8ED';

  const a0 = Math.max(0, activeAt - 0.1);
  // Transforms ligados al scroll (solo se aplican en mode 'scroll').
  const numColor = useTransform(progress, [a0, activeAt], [restNum, activeNum]);
  const titleColor = useTransform(progress, [a0, activeAt], [restTitle, activeTitle]);
  const x = useTransform(progress, [a0, activeAt], [-8, 0]);

  const liClass = 'py-7 first:pt-0 border-t border-white/[0.06] first:border-t-0';
  const numClass = 'font-mono text-[40px] font-light leading-none';
  const titleClass = 'font-sans text-[18px] font-semibold';

  if (mode === 'scroll') {
    return (
      <motion.li style={{ x }} className={liClass}>
        <div className="flex items-baseline gap-4">
          <motion.span aria-hidden="true" style={{ color: numColor }} className={numClass}>
            {step.num}
          </motion.span>
          <motion.h3 style={{ color: titleColor }} className={titleClass}>
            {step.title}
          </motion.h3>
        </div>
        <p className="mt-3 max-w-md text-[14px] text-soft leading-[1.6]">{step.description}</p>
      </motion.li>
    );
  }

  // 'active' (reduced-motion) → todos los pasos activos. 'cascade' (móvil) → reposo editorial.
  const activeView = mode === 'active';
  const numStyle = { color: activeView ? activeNum : isLast ? '#00C2A8' : restNum };
  const titleStyle = { color: activeView ? activeTitle : isLast ? '#00C2A8' : '#E8E8ED' };

  return (
    <motion.li variants={mode === 'cascade' ? fadeUp : undefined} className={liClass}>
      <div className="flex items-baseline gap-4">
        <span aria-hidden="true" style={numStyle} className={numClass}>
          {step.num}
        </span>
        <h3 style={titleStyle} className={titleClass}>
          {step.title}
        </h3>
      </div>
      <p className="mt-3 max-w-md text-[14px] text-soft leading-[1.6]">{step.description}</p>
    </motion.li>
  );
}

export default function Process() {
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const stepsWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    // matchMedia no existe en SSR → leer tras montar (no se puede en el initializer).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Progreso del scroll DENTRO de la columna de pasos (afinable: offset).
  const { scrollYProgress } = useScroll({
    target: stepsWrapRef,
    offset: ['start center', 'end center'],
  });
  const dotTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const scrollMode = isDesktop && !reduce;
  const showThread = isDesktop; // animado si scrollMode; completo estático si reduce
  const stepMode: StepMode = scrollMode ? 'scroll' : reduce ? 'active' : 'cascade';

  const leftStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const stepsStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
  };
  const fadeUp: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
      };

  return (
    <section id="proceso" className="bg-bg">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-2 md:py-32 lg:gap-20">
        {/* Izquierda — entrada simple whileInView */}
        <motion.div
          variants={leftStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUp} className="mb-5 text-[13px] font-medium text-teal font-sans">
            Proceso
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-sans text-text text-[clamp(32px,5vw,48px)] font-semibold tracking-[-0.03em] leading-[1.1]"
          >
            Cómo trabajamos<span className="text-teal">.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-sm text-[14px] text-soft leading-[1.6]">
            Cuatro pasos, sin vueltas. De la primera llamada a un sistema funcionando.
          </motion.p>
        </motion.div>

        {/* Derecha — pasos + hilo (espina) */}
        <div ref={stepsWrapRef} className="relative md:pl-12">
          {/* Hilo: carril w-10 (40px) → viewBox ancho 40 = escala X 1 (stroke correcto) */}
          {showThread && (
            <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 hidden w-10 md:block">
              <svg
                viewBox="0 0 40 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  <linearGradient
                    id="proceso-hilo"
                    gradientUnits="userSpaceOnUse"
                    x1="20"
                    y1="0"
                    x2="20"
                    y2="100"
                  >
                    <stop offset="0" stopColor="#00C2A8" />
                    <stop offset="1" stopColor="#33D4BE" />
                  </linearGradient>
                </defs>
                {/* riel tenue */}
                <line x1="20" y1="0" x2="20" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                {/* hilo dibujado (scroll) o completo (reduced-motion) */}
                {scrollMode ? (
                  <motion.path
                    d="M20 0 L20 100"
                    stroke="url(#proceso-hilo)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    style={{ pathLength: scrollYProgress }}
                  />
                ) : (
                  <path
                    d="M20 0 L20 100"
                    stroke="url(#proceso-hilo)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                )}
              </svg>
              {/* punto de luz con glow, a la cabeza del trazo */}
              {scrollMode && (
                <motion.div
                  className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    top: dotTop,
                    backgroundColor: '#33D4BE',
                    boxShadow: '0 0 12px 2px rgba(51,212,190,0.55)',
                  }}
                />
              )}
            </div>
          )}

          {stepMode === 'cascade' ? (
            <motion.ol
              variants={stepsStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="list-none"
            >
              {steps.map((s, i) => (
                <Step
                  key={s.num}
                  step={s}
                  isLast={i === steps.length - 1}
                  mode="cascade"
                  activeAt={THRESHOLDS[i]}
                  progress={scrollYProgress}
                  fadeUp={fadeUp}
                />
              ))}
            </motion.ol>
          ) : (
            <ol className="list-none">
              {steps.map((s, i) => (
                <Step
                  key={s.num}
                  step={s}
                  isLast={i === steps.length - 1}
                  mode={stepMode}
                  activeAt={THRESHOLDS[i]}
                  progress={scrollYProgress}
                  fadeUp={fadeUp}
                />
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
  type Variants,
} from 'framer-motion';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const; // ease-out-expo

type Seg = { t: string; teal?: boolean };

// Las 4 frases del manifiesto (una a la vez en el pin).
const PHRASES: Seg[][] = [
  [{ t: 'No somos una consultora.' }],
  [{ t: 'Somos los que ' }, { t: 'lo resuelven', teal: true }, { t: '.' }],
  [{ t: 'Sin slides. Sin promesas.' }],
  [{ t: 'Software que ' }, { t: 'funciona', teal: true }, { t: ' de verdad.' }],
];

const PRINCIPLES = [
  { n: '01', title: 'En producción, no en slides', desc: 'Entregamos sistemas que corren, no presentaciones.' },
  { n: '02', title: 'Lo operamos contigo', desc: 'No desaparecemos en el deploy: seguimos operando y evolucionando contigo.' },
  { n: '03', title: 'Resultados, no promesas', desc: 'Medimos por lo que cambia en tu operación, no por lo que prometimos.' },
];

// Estilo compartido de las frases (clamp dramático — tope ≤96px).
const PHRASE_CLASS =
  'font-sans font-semibold tracking-[-0.03em] leading-[1.05] text-text text-balance text-[clamp(40px,7vw,84px)]';

const TRACK_VH = 415; // alto del track = largo del pin (calibrado en vivo)
const RAMP = 0.16; // fade in/out como fracción del segmento → meseta larga (tunable)
const XOVER = 0.06; // medio solape del crossfade, fracción del segmento (tunable)
const LAST_HOLD = 0.12; // meseta de la frase 04 antes de soltar el pin (tunable) → recorta el tramo estático del final

function renderSegs(segs: Seg[]) {
  return segs.map((s, i) =>
    s.teal ? (
      <span key={i} className="text-teal">
        {s.t}
      </span>
    ) : (
      <span key={i}>{s.t}</span>
    ),
  );
}

// Frase del modo pin: opacity + translateY atadas al progreso, ventanas solapadas
// en los bordes → crossfade (una sola frase a foco a la vez).
function PinnedPhrase({
  segs,
  index,
  total,
  progress,
}: {
  segs: Seg[];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const isLast = index === total - 1;
  const ramp = RAMP * seg;
  const xo = XOVER * seg;
  const s = index * seg;
  const e = (index + 1) * seg;
  // framer-motion 12 mapea el input range a offsets WAAPI → deben quedar en [0,1].
  const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
  const t0 = clamp01(s - xo); // empieza fade in
  const t1 = clamp01(s - xo + ramp); // full → inicio de meseta
  const t2 = clamp01(e + xo - ramp); // fin de meseta → empieza fade out
  const t3 = clamp01(e + xo); // fade out completo
  // La última frase: stop inicial en 0 → se mantiene invisible (clampeada) durante
  // 01-03, entra en su turno y se sostiene plena hasta soltar el pin (sin fade-out,
  // sin tail negro). El stop en input 0 evita que WAAPI la filtre antes de su entrada.
  const fullAt = clamp01(1 - LAST_HOLD);
  const stops = isLast ? [0, t0, fullAt, 1] : [t0, t1, t2, t3];
  const opacity = useTransform(progress, stops, isLast ? [0, 0, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, stops, isLast ? [40, 40, 0, 0] : [40, 0, 0, -40]);
  return (
    <motion.p
      style={{ opacity, y }}
      className={`absolute inset-0 flex items-center justify-center px-6 text-center ${PHRASE_CLASS}`}
    >
      <span className="max-w-5xl">{renderSegs(segs)}</span>
    </motion.p>
  );
}

export default function Manifesto() {
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    // matchMedia no existe en SSR → leer tras montar (no en el initializer).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  const scrollMode = isDesktop && !reduce;
  const total = PHRASES.length;
  const seg = 1 / total;

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!scrollMode) return;
    const idx = Math.min(total - 1, Math.max(0, Math.floor(v / seg)));
    setActive((cur) => (cur === idx ? cur : idx));
  });

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
  };
  const fadeUp: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EXPO } },
      };

  return (
    <section id="manifiesto" className="bg-bg">
      <h2 className="sr-only">Manifiesto</h2>

      {/* trackRef envuelve ambos modos → useScroll siempre tiene target */}
      <div
        ref={trackRef}
        className={scrollMode ? 'relative' : ''}
        style={scrollMode ? { height: `${TRACK_VH}vh` } : undefined}
      >
        {scrollMode ? (
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="relative mx-auto h-full max-w-6xl px-6">
              {/* eyebrow fijo arriba durante el pin */}
              <p
                aria-hidden="true"
                className="absolute left-6 right-6 top-24 text-center text-[13px] font-medium text-teal font-sans"
              >
                Manifiesto
              </p>

              {/* frases (apiladas, crossfade por scroll) */}
              <div className="relative h-full">
                {PHRASES.map((p, i) => (
                  <PinnedPhrase key={i} segs={p} index={i} total={total} progress={scrollYProgress} />
                ))}
              </div>

              {/* pista de progreso */}
              <div
                aria-hidden="true"
                className="absolute bottom-16 left-1/2 flex -translate-x-1/2 gap-2"
              >
                {PHRASES.map((_, i) => (
                  <span
                    key={i}
                    className={`h-0.5 rounded-full transition-all duration-300 ${
                      i === active ? 'w-10 bg-teal' : 'w-6 bg-white/15'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Móvil (cascada) / reduced-motion (estático): frases apiladas, legibles */
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-24 md:py-32"
          >
            <motion.p variants={fadeUp} className="text-[13px] font-medium text-teal font-sans">
              Manifiesto
            </motion.p>
            {PHRASES.map((p, i) => (
              <motion.p key={i} variants={fadeUp} className={PHRASE_CLASS}>
                {renderSegs(p)}
              </motion.p>
            ))}
          </motion.div>
        )}
      </div>

      {/* Cierre — 3 principios (flujo normal en ambos modos) */}
      <div className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid list-none gap-8 border-t border-white/[0.08] pt-10 sm:grid-cols-3"
        >
          {PRINCIPLES.map((p) => (
            <motion.li key={p.n} variants={fadeUp}>
              <span aria-hidden="true" className="mb-3 block font-mono text-[12px] text-teal">
                {p.n}
              </span>
              <h3 className="text-[17px] font-medium text-text leading-snug">{p.title}</h3>
              <p className="mt-2 text-[14px] text-soft leading-[1.6]">{p.desc}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

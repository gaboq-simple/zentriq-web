'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Verde de WhatsApp: vive SOLO dentro de esta ventana. El teal de marca solo en el
// glow de la tarjeta de confirmación y el estado "en línea".
const C = {
  bot: '#1F2C34',
  green: '#00A884',
  tickGray: '#9DB0BA',
  tickBlue: '#53BDEB',
  blue: '#53BDEB',
  verified: '#34B7F1',
  text: '#E9EDEF',
  sub: '#8696A0',
  online: '#4FD8C4',
};

const CLIENT_GRAD = 'linear-gradient(145deg,#016d58,#005C4B)';
const BOT_GRAD = 'linear-gradient(145deg,rgba(43,57,66,0.9),rgba(32,44,51,0.9))';
const BAND_GRAD = 'linear-gradient(135deg,#00b89a,#00A884)';
const CARD_GLOW = '0 8px 22px rgba(0,194,168,0.22), 0 0 0 1px rgba(0,194,168,0.4)';

type Item =
  | { id: number; kind: 'msg'; from: 'client' | 'bot'; text: string; time: string }
  | { id: number; kind: 'quick'; from: 'bot'; text: string; time: string; options: string[] }
  | { id: number; kind: 'card'; from: 'bot'; time: string };

// Conversación (sin fecha fija: el bot habla de "mañana").
const ITEMS: Item[] = [
  { id: 0, kind: 'msg', from: 'client', text: 'Hola, ¿tienen lugar mañana para un corte?', time: '9:41' },
  {
    id: 1,
    kind: 'quick',
    from: 'bot',
    text: 'Hola, soy el asistente de El Corte. ¡Claro! ¿Tienes barbero de preferencia o te asigno al primero disponible?',
    time: '9:41',
    options: ['Con Beto', 'Con Charly', 'El primero disponible'],
  },
  { id: 2, kind: 'msg', from: 'client', text: 'El primero disponible', time: '9:41' },
  {
    id: 3,
    kind: 'quick',
    from: 'bot',
    text: 'Perfecto, te toca con Charly. Para mañana tiene estos horarios:',
    time: '9:42',
    options: ['10:00 a.m.', '4:00 p.m.', '6:00 p.m.'],
  },
  { id: 4, kind: 'msg', from: 'client', text: '4:00 p.m.', time: '9:42' },
  { id: 5, kind: 'card', from: 'bot', time: '9:42' },
  {
    id: 6,
    kind: 'msg',
    from: 'bot',
    text: 'Recordatorio: tu cita es hoy a las 4:00 p.m. ¡Te esperamos!',
    time: '9:42',
  },
];
const PICKED_FULL: Record<number, string> = { 1: 'El primero disponible', 3: '4:00 p.m.' };

// ─── Piezas ────────────────────────────────────────────────────────────────────
function Ticks({ reduce }: { reduce: boolean }) {
  const [read, setRead] = useState(reduce);
  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => setRead(true), 700);
    return () => window.clearTimeout(t);
  }, [reduce]);
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden="true" style={{ color: read ? C.tickBlue : C.tickGray }}>
      <path d="M1 6 L3.6 8.6 L8.4 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6 L8.6 8.6 L13.4 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MetaTime({ time, client, reduce }: { time: string; client: boolean; reduce: boolean }) {
  return (
    <span className="float-right ml-2 mt-1.5 flex items-center gap-1 text-[10px]" style={{ color: 'rgba(233,237,239,0.45)' }}>
      {time}
      {client && <Ticks reduce={reduce} />}
    </span>
  );
}

function QuickReplies({ options, picked }: { options: string[]; picked?: string }) {
  return (
    <div className="-mx-3 mt-2 border-t border-white/15">
      {options.map((opt) => {
        const sel = picked === opt;
        return (
          <div
            key={opt}
            aria-hidden="true"
            className="border-b border-white/10 px-3 py-2.5 text-center text-[13px] font-medium tracking-[0.01em] transition-colors duration-200 last:border-b-0"
            style={{ color: sel ? '#fff' : C.blue, background: sel ? 'rgba(0,168,132,0.22)' : 'transparent' }}
          >
            {opt}
          </div>
        );
      })}
    </div>
  );
}

function ConfirmationCard({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      className="relative w-[82%] overflow-hidden rounded-2xl rounded-bl-[4px]"
      style={{ background: '#111B21', boxShadow: CARD_GLOW }}
      initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
      animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={reduce ? undefined : { type: 'spring', stiffness: 420, damping: 28 }}
    >
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: BAND_GRAD }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" />
          <motion.path
            d="M7 12.5 L10.5 16 L17 8.5"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 0.5, delay: 0.25, ease: 'easeInOut' }}
          />
        </svg>
        <div className="leading-tight">
          <p className="text-[12.5px] font-semibold text-white">Cita confirmada</p>
          <p className="text-[10.5px] text-white/80">El Corte · Barbería</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-3 py-2.5">
        <p className="text-[13px] font-medium" style={{ color: C.text }}>
          Corte de cabello · con Charly
        </p>
        <p className="text-[12.5px]" style={{ color: C.sub }}>
          Mañana · 4:00 p.m.
        </p>
        <p className="mt-1 text-[11.5px]" style={{ color: C.sub }}>
          Te enviaré un recordatorio una hora antes
        </p>
        <div className="mt-2 border-t border-white/10 pt-2">
          <span className="text-[12.5px] font-medium" style={{ color: C.green }}>
            Agregar al calendario
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <div className="w-fit rounded-2xl rounded-bl-[4px] px-3.5 py-3" style={{ background: BOT_GRAD, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: C.sub }}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Ventana glass ───────────────────────────────────────────────────────────
export default function ChatGlass() {
  const reduce = useReducedMotion() ?? false;
  const [count, setCount] = useState(0);
  const [picked, setPicked] = useState<Record<number, string>>({});
  const [typing, setTyping] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Pausa la secuencia cuando el hero no está visible.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Driver de la secuencia (enhancement; solo cliente, solo en vista).
  useEffect(() => {
    if (reduce || !inView) return;
    let cancelled = false;
    const timers = new Set<number>();
    const wait = (ms: number) =>
      new Promise<void>((res) => {
        const t = window.setTimeout(() => {
          timers.delete(t);
          res();
        }, ms);
        timers.add(t);
      });
    const type = async (ms: number) => {
      setTyping(true);
      await wait(ms);
      if (!cancelled) setTyping(false);
    };

    (async () => {
      while (!cancelled) {
        setCount(0);
        setPicked({});
        setTyping(false);
        await wait(1000); // deja entrar la ventana antes del primer mensaje
        if (cancelled) return;
        setCount(1);
        await wait(900);
        if (cancelled) return;
        await type(1400);
        if (cancelled) return;
        setCount(2);
        await wait(1100);
        if (cancelled) return;
        setPicked({ 1: 'El primero disponible' });
        await wait(700);
        if (cancelled) return;
        setCount(3);
        await wait(900);
        if (cancelled) return;
        await type(1400);
        if (cancelled) return;
        setCount(4);
        await wait(1300);
        if (cancelled) return;
        setPicked((p) => ({ ...p, 3: '4:00 p.m.' }));
        await wait(700);
        if (cancelled) return;
        setCount(5);
        await wait(900);
        if (cancelled) return;
        await type(1600);
        if (cancelled) return;
        setCount(6);
        await wait(2200);
        if (cancelled) return;
        setCount(7);
        await wait(2300);
        if (cancelled) return;
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reduce, inView]);

  // reduced-motion: conversación completa + selecciones, derivado en render.
  const effCount = reduce ? ITEMS.length : count;
  const effPicked = reduce ? PICKED_FULL : picked;

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [effCount, typing, reduce]);

  const visible = ITEMS.slice(0, effCount);

  return (
    <div ref={rootRef} aria-hidden="true" className="relative w-[380px] max-w-full">
      <div
        className="relative flex h-[560px] flex-col overflow-hidden rounded-[22px] border border-white/[0.12] bg-[rgba(20,30,36,0.85)] supports-[backdrop-filter]:bg-[linear-gradient(145deg,rgba(30,44,52,0.55),rgba(11,20,26,0.45))] supports-[backdrop-filter]:backdrop-blur-[20px]"
        style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.18)' }}
      >
        {/* Header */}
        <div className="relative z-10 flex shrink-0 items-center gap-2.5 border-b border-white/[0.08] px-4 py-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold text-white"
            style={{ background: 'linear-gradient(145deg,#00c79a,#00735d)', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
          >
            EC
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="flex items-center gap-1">
              <span className="truncate text-[14px] font-semibold text-white">El Corte</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill={C.verified} />
                <path d="M7.5 12.5 L10.5 15.5 L16.5 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[11px]" style={{ color: typing ? C.green : C.online }}>
              {typing ? 'escribiendo…' : 'en línea'}
            </span>
          </div>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: C.sub }}>
            <rect x="2" y="6" width="13" height="12" rx="3" />
            <path d="M16 10 L21.5 7 V17 L16 14 Z" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: C.sub }}>
            <path d="M6.6 3 C5.1 3 3.1 4 3.1 6 C3.1 14 10 20.9 18 20.9 C20 20.9 21.1 19.3 20.9 17.7 L17.6 15.3 C17.3 15.1 16.9 15.1 16.6 15.4 L15 17 C12.2 16 8 11.8 7 9 L8.6 7.4 C8.9 7.1 8.9 6.7 8.7 6.4 L6.6 3 Z" />
          </svg>
        </div>

        {/* Mensajes (alto fijo + scroll interno, scrollbar oculto) */}
        <div
          ref={chatRef}
          className="relative z-10 min-h-0 flex-1 overflow-y-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visible.map((it, i) => {
            const prev = visible[i - 1];
            const gap = i === 0 ? '' : prev && prev.from === it.from ? 'mt-1.5' : 'mt-4';

            if (it.kind === 'card') {
              return (
                <div key={it.id} className={`flex justify-start ${gap}`}>
                  <ConfirmationCard reduce={reduce} />
                </div>
              );
            }

            const client = it.from === 'client';
            return (
              <motion.div
                key={it.id}
                className={`flex ${client ? 'justify-end' : 'justify-start'} ${gap}`}
                initial={reduce ? false : { opacity: 0, y: 8, scale: 0.96 }}
                animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
                transition={reduce ? undefined : { type: 'spring', stiffness: 520, damping: 30 }}
              >
                <div
                  className={`relative max-w-[82%] rounded-2xl px-3 py-2 text-[13px] leading-[1.4] ${client ? 'rounded-br-[4px]' : 'rounded-bl-[4px]'}`}
                  style={{
                    background: client ? CLIENT_GRAD : BOT_GRAD,
                    color: C.text,
                    boxShadow: client ? '0 3px 10px rgba(0,0,0,0.25)' : '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  <span>{it.text}</span>
                  {it.kind === 'quick' && <QuickReplies options={it.options} picked={effPicked[it.id]} />}
                  <MetaTime time={it.time} client={client} reduce={reduce} />
                  <span className="clear-both block" />
                </div>
              </motion.div>
            );
          })}

          {typing && (
            <div className="mt-4 flex justify-start">
              <TypingDots />
            </div>
          )}
        </div>

        {/* Highlight de vidrio (mitad superior) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1/2"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06), transparent)' }}
        />
      </div>
    </div>
  );
}

"use client";

/**
 * HowItWorks — Sección "¿Cómo funciona?" de /zlot  (v10 — estilo Linear, sin vuelos)
 *
 * Flujo: chat (estilo glass del hero) → la tarjeta de confirmación se desvanece →
 * Zlot pulsa → las citas se agendan en CASCADA en el calendario (cada slot se enciende
 * con un pulso de luz y revela su cita). Sin objetos volando. Estética Linear.
 *
 * Reemplaza por completo el componente actual.
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const C = {
  text: "#E9EDEF",
  sub: "#8696A0",
  online: "#4FD8C4",
  green: "#00A884",
  tickBlue: "#53BDEB",
  verified: "#34B7F1",
};
const CLIENT_GRAD = "linear-gradient(145deg,#016d58,#005C4B)";
const BOT_GRAD = "linear-gradient(145deg,rgba(43,57,66,0.9),rgba(32,44,51,0.9))";
const BAND_GRAD = "linear-gradient(135deg,#00b89a,#00A884)";
const CARD_GLOW = "0 8px 22px rgba(0,194,168,0.22), 0 0 0 1px rgba(0,194,168,0.4)";
const FICHA_BG = "linear-gradient(145deg,rgba(0,194,168,0.16),rgba(0,194,168,0.04))";
const FICHA_BORDER = "1px solid rgba(0,194,168,0.35)";

type Cita = { n: string; s: string; slot: number; t: string };
const SEQ: Cita[] = [
  { n: "Ana L.", s: "Tinte", slot: 0, t: "10:00" },
  { n: "Luis G.", s: "Corte", slot: 1, t: "11:30" },
  { n: "Beto R.", s: "Barba", slot: 2, t: "13:00" },
  { n: "Carlos M.", s: "Corte", slot: 3, t: "16:00" },
  { n: "Sofía P.", s: "Corte", slot: 4, t: "17:30" },
];
const SLOTS = ["10:00", "11:30", "13:00", "16:00", "17:30"];
const STEPS = [
  { n: "01", t: "Conecta tu WhatsApp", d: "En minutos, sin cambiar tu número." },
  { n: "02", t: "Configura tus servicios", d: "Horarios y equipo. Una sola vez." },
  { n: "03", t: "Tus clientes agendan solos", d: "Zlot responde, confirma y recuerda." },
];

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const EASE_OUT = [0.22, 0.61, 0.36, 1] as const;

type ChatMsg =
  | { kind: "out"; text: string; time: string }
  | { kind: "in"; text: string; time: string }
  | { kind: "typing" };

function Ticks() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" style={{ color: C.tickBlue }}>
      <path d="M1 6 L3.6 8.6 L8.4 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6 L8.6 8.6 L13.4 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HowItWorks() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [headerState, setHeaderState] = useState<"en línea" | "escribiendo…">("en línea");
  const [guide, setGuide] = useState("");

  const [confirmInChat, setConfirmInChat] = useState(false);
  const [filledSlots, setFilledSlots] = useState<number[]>([]);
  const [justFilled, setJustFilled] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const [zlotPulse, setZlotPulse] = useState(0);

  const runIdRef = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!reduce) return;
    // Estado final estático para reduced-motion (set único e intencional, SSR-safe).
    /* eslint-disable react-hooks/set-state-in-effect */
    setMsgs([
      { kind: "out", text: "Hola, ¿tienen lugar hoy?", time: "15:58" },
      { kind: "in", text: "¡Claro! Tengo a las 16:00 ¿te va?", time: "15:58" },
      { kind: "out", text: "Perfecto, sí", time: "15:59" },
    ]);
    setFilledSlots([0, 1, 2, 3, 4]);
    setCount(5);
    setGuide("Tu agenda, llena. Sola.");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;

    runIdRef.current += 1;
    const myRun = runIdRef.current;
    const alive = () => runIdRef.current === myRun && inView;

    if (!inView) return;

    const reset = () => {
      setMsgs([]);
      setConfirmInChat(false);
      setFilledSlots([]);
      setJustFilled(null);
      setCount(0);
      setGuide("");
      setHeaderState("en línea");
    };

    const run = async () => {
      await sleep(180);
      if (!alive()) return;
      reset();
      await sleep(400);

      while (alive()) {
        reset();
        await sleep(500);
        if (!alive()) return;

        setGuide("Tu cliente escribe por WhatsApp");
        await sleep(600);
        setMsgs((m) => [...m, { kind: "out", text: "Hola, ¿tienen lugar hoy?", time: "15:58" }]);
        await sleep(1300);
        if (!alive()) return;

        setGuide("Zlot responde al instante");
        setHeaderState("escribiendo…");
        setMsgs((m) => [...m, { kind: "typing" }]);
        await sleep(1400);
        setMsgs((m) => m.filter((x) => x.kind !== "typing"));
        setHeaderState("en línea");
        setMsgs((m) => [...m, { kind: "in", text: "¡Claro! Tengo a las 16:00 ¿te va?", time: "15:58" }]);
        await sleep(1500);
        if (!alive()) return;

        setMsgs((m) => [...m, { kind: "out", text: "Perfecto, sí", time: "15:59" }]);
        await sleep(1300);
        if (!alive()) return;

        setGuide("La cita queda confirmada");
        setConfirmInChat(true);
        await sleep(1500);
        if (!alive()) return;

        setGuide("Zlot la recibe y la agenda");
        setConfirmInChat(false);
        setZlotPulse((n) => n + 1);
        await sleep(800);
        if (!alive()) return;

        setZlotPulse((n) => n + 1);
        setFilledSlots((s) => [...s, 3]);
        setJustFilled(3);
        setCount((c) => c + 1);
        await sleep(420);
        setJustFilled(null);
        await sleep(900);
        if (!alive()) return;

        setGuide("Y una tras otra, sin que muevas un dedo");
        await sleep(500);
        const rest = SEQ.filter((c) => c.slot !== 3);
        for (let k = 0; k < rest.length; k++) {
          if (!alive()) return;
          setZlotPulse((n) => n + 1);
          await sleep(120);
          setFilledSlots((s) => [...s, rest[k].slot]);
          setJustFilled(rest[k].slot);
          setCount((c) => c + 1);
          await sleep(380);
          setJustFilled(null);
          await sleep(420);
        }
        if (!alive()) return;

        setGuide("Tu agenda, llena. Sola.");
        await sleep(2800);
      }
    };

    run();
    return () => {
      runIdRef.current += 1;
    };
  }, [reduce, inView]);

  return (
    <section ref={sectionRef} id="como-funciona" className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 text-center">
        <p className="mb-2 text-[13px] font-medium tracking-wide text-[#33D4BE]">Cómo funciona</p>
        <h2 className="text-[clamp(32px,4vw,40px)] font-semibold tracking-tight text-[#F5F5F7]">
          Del mensaje a la cita, solo
        </h2>
        <div className="mt-3 flex h-6 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span key={guide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="text-[14px] text-[#9A9AA5]">
              {guide}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative mx-auto mb-14 grid max-w-3xl items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
        {/* ── CHAT ── */}
        <div
          className="relative z-10 flex h-[420px] flex-col overflow-hidden rounded-[22px] border border-white/[0.12] bg-[rgba(20,30,36,0.85)] supports-[backdrop-filter]:bg-[linear-gradient(145deg,rgba(30,44,52,0.55),rgba(11,20,26,0.45))] supports-[backdrop-filter]:backdrop-blur-[20px]"
          style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.18)" }}
        >
          <div className="relative z-10 flex shrink-0 items-center gap-2.5 border-b border-white/[0.08] px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: "linear-gradient(145deg,#00c79a,#00735d)", boxShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
              EC
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="flex items-center gap-1">
                <span className="truncate text-[14px] font-semibold text-white">El Corte</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill={C.verified} />
                  <path d="M7.5 12.5 L10.5 15.5 L16.5 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[11px]" style={{ color: headerState === "escribiendo…" ? C.green : C.online }}>
                {headerState}
              </span>
            </div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ color: C.sub }}>
              <rect x="2" y="6" width="13" height="12" rx="3" />
              <path d="M16 10 L21.5 7 V17 L16 14 Z" />
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: C.sub }}>
              <path d="M6.6 3 C5.1 3 3.1 4 3.1 6 C3.1 14 10 20.9 18 20.9 C20 20.9 21.1 19.3 20.9 17.7 L17.6 15.3 C17.3 15.1 16.9 15.1 16.6 15.4 L15 17 C12.2 16 8 11.8 7 9 L8.6 7.4 C8.9 7.1 8.9 6.7 8.7 6.4 L6.6 3 Z" />
            </svg>
          </div>

          <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-start overflow-hidden px-4 py-3">
            <AnimatePresence initial={false} mode="popLayout">
              {msgs.map((m, i) => {
                if (m.kind === "typing") {
                  return (
                    <motion.div key="typing" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 flex justify-start">
                      <div className="w-fit rounded-2xl rounded-bl-[4px] px-3.5 py-3" style={{ background: BOT_GRAD, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                        <div className="flex items-center gap-1">
                          {[0, 1, 2].map((dd) => (
                            <motion.span key={dd} className="h-1.5 w-1.5 rounded-full" style={{ background: C.sub }} animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }} transition={{ duration: 1, repeat: Infinity, delay: dd * 0.18, ease: "easeInOut" }} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                }
                const client = m.kind === "out";
                return (
                  <motion.div key={m.kind + "-" + i} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 520, damping: 38 }} className={"mt-3 flex " + (client ? "justify-end" : "justify-start")}>
                    <div className={"relative max-w-[82%] rounded-2xl px-3 py-2 text-[13px] leading-[1.4] " + (client ? "rounded-br-[4px]" : "rounded-bl-[4px]")} style={{ background: client ? CLIENT_GRAD : BOT_GRAD, color: C.text, boxShadow: client ? "0 3px 10px rgba(0,0,0,0.25)" : "0 2px 8px rgba(0,0,0,0.2)" }}>
                      <span>{m.text}</span>
                      <span className="float-right ml-2 mt-1.5 flex items-center gap-1 text-[10px]" style={{ color: "rgba(233,237,239,0.45)" }}>
                        {m.time}
                        {client && <Ticks />}
                      </span>
                      <span className="clear-both block" />
                    </div>
                  </motion.div>
                );
              })}

              {confirmInChat && (
                <motion.div key="confirm" layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ type: "spring", stiffness: 420, damping: 30 }} className="mt-3 flex justify-start">
                  <div className="relative w-[82%] overflow-hidden rounded-2xl rounded-bl-[4px]" style={{ background: "#111B21", boxShadow: CARD_GLOW }}>
                    <div className="flex items-center gap-2 px-3 py-2" style={{ background: BAND_GRAD }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" />
                        <path d="M7 12.5 L10.5 16 L17 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="leading-tight">
                        <p className="text-[12.5px] font-semibold text-white">Cita confirmada</p>
                        <p className="text-[10.5px] text-white/80">El Corte · Barbería</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 px-3 py-2.5">
                      <p className="text-[13px] font-medium" style={{ color: C.text }}>Corte · con Carlos M.</p>
                      <p className="text-[12.5px]" style={{ color: C.sub }}>Hoy · 16:00</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1/2" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), transparent)" }} />
        </div>

        {/* ── ZLOT ── */}
        <div className="relative z-20 flex flex-col items-center">
          <motion.div
            key={"zlot-" + zlotPulse}
            animate={zlotPulse ? { scale: [1, 1.14, 0.97, 1], y: [0, -5, 0, 0] } : {}}
            transition={{ duration: 0.62, ease: [0.34, 1.56, 0.64, 1], times: [0, 0.4, 0.7, 1] }}
            className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C2A8] to-[#008f76]"
            style={{ boxShadow: "0 0 25px rgba(0,194,168,0.35)" }}
          >
            <motion.div
              key={zlotPulse}
              initial={{ opacity: 0 }}
              animate={zlotPulse ? { opacity: [0, 0.85, 0] } : { opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{ boxShadow: "0 0 48px rgba(0,194,168,0.85)" }}
            />
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <path d="M8 9h16L8 23h16" />
            </svg>
          </motion.div>
          <div className="mt-1.5 text-[9px] font-semibold text-[#33D4BE]">Zlot</div>
        </div>

        {/* ── CALENDARIO (cascada estilo Linear) ── */}
        <div className="relative z-10 rounded-2xl border border-white/10 bg-[#101018] p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.4)]">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-[#E8E8ED]">Hoy</span>
            <motion.span key={count} initial={{ scale: 1 }} animate={{ scale: [1, 1.16, 1] }} transition={{ duration: 0.35 }} className="rounded-full bg-[#00C2A8]/10 px-2 py-0.5 text-[9px] text-[#33D4BE]">
              {count} {count === 1 ? "cita" : "citas"}
            </motion.span>
          </div>
          <div className="flex flex-col gap-1.5">
{SLOTS.map((time, i) => {
              const cita = SEQ.find((c) => c.slot === i) ?? null;
              const isFilled = cita ? filledSlots.includes(i) : false;
              const isJust = justFilled === i;
              return (
                <div key={i} className="flex items-center gap-2 rounded-lg px-2.5" style={{ height: 40 }}>
                  <span className="w-[32px] font-mono text-[9px] text-[#7D7D88]">{time}</span>
                  <div className="relative flex h-[28px] flex-1 items-center">
                    <AnimatePresence>
                      {isFilled && cita ? (
                        <motion.div
                          key="filled"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            boxShadow: isJust
                              ? ["0 0 0 rgba(0,194,168,0)", "0 0 18px rgba(0,194,168,0.55)", "0 4px 14px rgba(0,194,168,0.25)"]
                              : "0 4px 14px rgba(0,194,168,0.25)",
                          }}
                          transition={{ duration: 0.45, ease: EASE_OUT }}
                          className="absolute inset-0 flex items-center whitespace-nowrap rounded-md px-2.5"
                          style={{ background: FICHA_BG, border: FICHA_BORDER }}
                        >
                          <span className="text-[9px]" style={{ color: "#E8E8ED" }}>
                            <b>{cita.n}</b> · {cita.s}
                          </span>
                        </motion.div>
                      ) : (
                        <motion.span key="empty" initial={{ opacity: 0.4 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} className="text-[9px] text-[#5a5a64]">
                          —
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-6 border-t border-white/5 pt-8 md:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n}>
            <div className="mb-1.5 font-mono text-[13px] font-bold text-[#33D4BE]">{s.n}</div>
            <div className="mb-1 text-[12.5px] font-semibold text-[#E8E8ED]">{s.t}</div>
            <div className="text-[11px] leading-snug text-[#9A9AA5]">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

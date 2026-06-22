"use client";

/**
 * BusinessDashboard — Sección "Tu negocio, en tu bolsillo" de /zlot
 *
 * Dashboard SIN teléfono y SIN inclinación 3D: tarjetas DE FRENTE que "flotan"
 * sobre el negro por elevación (sombras profundas, capas), no por rotación.
 * Tabs Día/Semana/Mes cambian todos los datos y la forma de la gráfica.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ─────────────────────────  DATOS (verificados coherentes)  ───────────────────────── */

type Periodo = "dia" | "semana" | "mes";

const DATA: Record<
  Periodo,
  {
    ingresos: string;
    citas: string;
    ocupacion: string;
    trend: string;
    chartLabel: string;
    axis: string[];
    bars: number[];
    peak: number;
    servicios: { name: string; pct: number; val: string }[];
  }
> = {
  dia: {
    ingresos: "1,850",
    citas: "6",
    ocupacion: "76%",
    trend: "↑ 8%",
    chartLabel: "Ingresos por hora",
    axis: ["9", "11", "13", "15", "17", "19"],
    bars: [30, 45, 55, 40, 70, 95],
    peak: 5,
    servicios: [
      { name: "Corte", pct: 80, val: "4" },
      { name: "Barba", pct: 20, val: "1" },
      { name: "Tinte", pct: 20, val: "1" },
    ],
  },
  semana: {
    ingresos: "11,200",
    citas: "38",
    ocupacion: "82%",
    trend: "↑ 12%",
    chartLabel: "Ingresos por día",
    axis: ["L", "M", "M", "J", "V", "S", "D"],
    bars: [50, 68, 42, 84, 64, 96, 28],
    peak: 5,
    servicios: [
      { name: "Corte", pct: 85, val: "24" },
      { name: "Barba", pct: 38, val: "9" },
      { name: "Tinte", pct: 21, val: "5" },
    ],
  },
  mes: {
    ingresos: "44,800",
    citas: "152",
    ocupacion: "79%",
    trend: "↑ 9%",
    chartLabel: "Ingresos por semana",
    axis: ["S1", "S2", "S3", "S4"],
    bars: [62, 78, 70, 96],
    peak: 3,
    servicios: [
      { name: "Corte", pct: 88, val: "96" },
      { name: "Barba", pct: 36, val: "36" },
      { name: "Tinte", pct: 20, val: "20" },
    ],
  },
};

const BENEFICIOS = [
  {
    icon: <path d="M3 3v18h18M7 14l4-4 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />,
    t: "Ingresos en tiempo real",
    d: "Cuánto vas a facturar, al instante.",
  },
  {
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
      </>
    ),
    t: "Citas y ocupación",
    d: "Qué tan llena va tu agenda.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" />
      </>
    ),
    t: "Tus mejores horarios",
    d: "Descubre tus días y horas pico.",
  },
];

/* ─────────────────────────  COMPONENTE  ───────────────────────── */

export default function BusinessDashboard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [periodo, setPeriodo] = useState<Periodo>("semana");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const d = DATA[periodo];
  const animate = inView && !reduce;

  // sombra de elevación (volumen sin inclinación)
  const elevated = (depth: number) =>
    ({
      boxShadow: `0 ${depth}px ${depth * 2}px -${Math.round(depth / 2)}px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.04)`,
    } as const);

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-6 py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 78% 50%, rgba(0,194,168,0.07), transparent 70%)",
        }}
      />

      <div className="relative grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        {/* columna de texto */}
        <div>
          <p className="mb-2.5 text-[12px] font-medium text-[#33D4BE]">Tu negocio, en tu bolsillo</p>
          <h2 className="mb-3 text-[clamp(28px,3.4vw,40px)] font-semibold leading-[1.1] tracking-tight text-[#F5F5F7]">
            Toda la claridad de tu negocio, en tu mano
          </h2>
          <p className="mb-4 max-w-md text-[13px] leading-relaxed text-[#9A9AA5]">
            Ingresos, citas y ocupación — por día, semana o mes. Tus números, ordenados y solo para ti.
            Toma mejores decisiones sin estar en el local.
          </p>

          <div className="mb-6 inline-flex items-center gap-2 rounded-[10px] border border-[#00C2A8]/20 bg-[#00C2A8]/[0.07] px-3 py-2.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#33D4BE" strokeWidth="2" className="shrink-0">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
            </svg>
            <span className="text-[12px] text-[#C5C5CD]">
              Tus números son <b className="text-[#E8E8ED]">100% privados</b> — solo tú los ves.
            </span>
          </div>

          <div className="flex flex-col">
            {BENEFICIOS.map((b, i) => (
              <motion.div
                key={b.t}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={animate ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className="flex items-center gap-3.5 border-t border-white/[0.07] py-3 last:border-b"
              >
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] border border-[#00C2A8]/25 bg-[#00C2A8]/10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#33D4BE" strokeWidth="2">
                    {b.icon}
                  </svg>
                </div>
                <div>
                  <div className="text-[12.5px] font-semibold text-[#E8E8ED]">{b.t}</div>
                  <div className="text-[10.5px] text-[#9A9AA5]">{b.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* dashboard (de frente, volumen por elevación) */}
        <div className="flex flex-col gap-3">
          {/* header */}
          <div
            className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#16161d] to-[#101016] px-4 py-3"
            style={elevated(14)}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#00C2A8] to-[#008f76] text-[11px] font-bold text-white">
                EC
              </div>
              <div>
                <div className="text-[13px] font-semibold text-white">El Corte</div>
                <div className="text-[9px] text-[#9FD8CE]">Resumen del negocio</div>
              </div>
            </div>
          </div>

          {/* tabs */}
          <div
            className="flex gap-1 rounded-xl border border-white/[0.06] bg-[#121218] p-1"
            style={elevated(10)}
            role="tablist"
            aria-label="Período"
          >
            {(["dia", "semana", "mes"] as Periodo[]).map((p) => {
              const active = periodo === p;
              const label = p === "dia" ? "Día" : p === "semana" ? "Semana" : "Mes";
              return (
                <button
                  key={p}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPeriodo(p)}
                  className={`flex-1 rounded-lg px-3 py-2 text-[11px] transition-colors ${
                    active
                      ? "bg-[#00C2A8] font-semibold text-[#04130F] shadow-[0_4px_12px_rgba(0,194,168,0.4)]"
                      : "text-[#9FBFB8] hover:text-[#cfe9e3]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* ingresos */}
          <div
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#181820] to-[#101016] px-5 py-4"
            style={elevated(24)}
          >
            <div className="mb-1 text-[10px] text-[#9FD8CE]">Ingresos estimados</div>
            <div className="flex items-baseline gap-1">
              <span className="text-[17px] font-semibold text-[#33D4BE]">$</span>
              <span className="text-[34px] font-bold tracking-tight text-white" style={{ textShadow: "0 2px 12px rgba(0,194,168,0.25)" }}>
                {d.ingresos}
              </span>
              <span className="ml-1 text-[12px] text-[#33D4BE]">{d.trend}</span>
            </div>
            <div className="mt-1 text-[10px] text-[#7FA39C]">vs. período anterior</div>
          </div>

          {/* gráfica */}
          <div
            className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#16161d] to-[#0e0e13] px-4 py-4"
            style={elevated(18)}
          >
            <div className="mb-2.5 text-[9px] text-[#9FBFB8]">{d.chartLabel}</div>
            <div className="mb-1.5 flex h-[60px] items-end gap-1.5">
              {d.bars.map((h, i) => {
                const isPeak = i === d.peak;
                return (
                  <motion.div
                    key={`${periodo}-${i}`}
                    initial={{ height: 0 }}
                    animate={{ height: animate ? `${h}%` : 0 }}
                    transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 rounded-t"
                    style={{
                      background: isPeak
                        ? "linear-gradient(180deg,#5FE8D2,#00C2A8)"
                        : `linear-gradient(180deg,rgba(0,194,168,${0.5 + h / 250}),rgba(0,194,168,0.25))`,
                      boxShadow: "0 4px 10px -2px rgba(0,194,168,0.3)",
                    }}
                  />
                );
              })}
            </div>
            <div className="flex justify-between text-[7px] text-[#7FA39C]">
              {d.axis.map((a, i) => (
                <span key={i}>{a}</span>
              ))}
            </div>
          </div>

          {/* citas + ocupación */}
          <div className="flex gap-3">
            <div className="flex-1 rounded-xl border border-white/[0.07] bg-gradient-to-br from-[#16161d] to-[#0e0e13] px-4 py-3" style={elevated(12)}>
              <div className="mb-0.5 text-[8px] text-[#9FBFB8]">Citas</div>
              <span className="text-[20px] font-bold text-white">{d.citas}</span>
            </div>
            <div className="flex-1 rounded-xl border border-white/[0.07] bg-gradient-to-br from-[#16161d] to-[#0e0e13] px-4 py-3" style={elevated(12)}>
              <div className="mb-0.5 text-[8px] text-[#9FBFB8]">Ocupación</div>
              <span className="text-[20px] font-bold text-[#33D4BE]">{d.ocupacion}</span>
            </div>
          </div>

          {/* servicios */}
          <div className="rounded-xl border border-white/[0.06] bg-gradient-to-br from-[#141419] to-[#0d0d12] px-4 py-3.5" style={elevated(10)}>
            <div className="mb-2.5 text-[8px] text-[#9FBFB8]">Servicios más pedidos</div>
            {d.servicios.map((s, i) => (
              <div key={s.name} className={`flex items-center gap-2 ${i < 2 ? "mb-2" : ""}`}>
                <span className="w-9 text-[9px] text-[#E8E8ED]">{s.name}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: animate ? `${s.pct}%` : 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-[#00C2A8] to-[#33D4BE]"
                  />
                </div>
                <span className="w-[18px] text-right text-[8px] text-[#9FBFB8]">{s.val}</span>
              </div>
            ))}
          </div>

          <div className="text-center text-[7.5px] text-[#6a8a83]">Ejemplo de tu panel · datos ilustrativos</div>
        </div>
      </div>
    </section>
  );
}

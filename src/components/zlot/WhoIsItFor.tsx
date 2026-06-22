"use client";

const SECTORES = ["Barberías", "Salones", "Spas", "Estética"];

export default function WhoIsItFor() {
  return (
    <section id="para-quien-es" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <div className="max-w-xl">
          <p className="mb-4 text-[13px] font-medium tracking-wide text-[#33D4BE]">
            Para quién es
          </p>
          <h2 className="font-sans text-[clamp(32px,5vw,48px)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#F5F5F7]">
            Si tu negocio vive
            <br />
            de las <span className="text-[#63E8D6]">citas</span>,
            <br />
            Zlot es para ti.
          </h2>
          <div className="mt-9 flex max-w-md flex-wrap gap-2.5">
            {SECTORES.map((s) => (
              <span
                key={s}
                className="cursor-default rounded-full border border-white/[0.14] px-[18px] py-2 text-[14px] text-[#E8E8ED] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-0.5 hover:border-[#00C2A8]/60 hover:text-white hover:shadow-[0_0_22px_rgba(0,194,168,0.28)]"
              >
                {s}
              </span>
            ))}
            <span className="cursor-default rounded-full border border-white/[0.07] px-[18px] py-2 text-[14px] text-[#7D7D88] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-0.5 hover:border-[#00C2A8]/40 hover:text-[#9A9AA5] hover:shadow-[0_0_18px_rgba(0,194,168,0.18)]">
              + cualquier negocio de citas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

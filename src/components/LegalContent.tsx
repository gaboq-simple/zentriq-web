import Link from "next/link";

/* Componentes de tipografía para documentos legales (dark/teal).
 * Se usan dentro de <LegalLayout>. */

export function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24">
      <h2 className="mb-4 flex gap-3 font-sans text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#F5F5F7]">
        <span className="text-[#33D4BE]">{n}.</span>
        <span>{title}</span>
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-[1.75] text-[#B8B8C0]">{children}</p>
  );
}

export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] font-medium leading-[1.7] text-[#E8E8ED]">
      {children}
    </p>
  );
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2.5 pl-1">{children}</ul>;
}

export function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[15px] leading-[1.7] text-[#B8B8C0]">
      <span className="mt-[10px] h-[5px] w-[5px] flex-none rounded-full bg-[#00C2A8]" />
      <span>{children}</span>
    </li>
  );
}

export function Mail({ children }: { children?: React.ReactNode }) {
  return (
    <a
      href="mailto:contacto@zentriq.mx"
      className="text-[#63E8D6] underline-offset-2 transition-colors hover:text-[#8FF0E2] hover:underline"
    >
      {children ?? "contacto@zentriq.mx"}
    </a>
  );
}

export function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#63E8D6] underline-offset-2 transition-colors hover:text-[#8FF0E2] hover:underline"
    >
      {children}
    </a>
  );
}

export function Int({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[#63E8D6] underline-offset-2 transition-colors hover:text-[#8FF0E2] hover:underline"
    >
      {children}
    </Link>
  );
}

/* Bloque destacado (ej. plantilla de solicitud, nota importante) */
export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
      {children}
    </div>
  );
}

/* Subtítulo dentro de una sección (para apartados a), b), c)) */
export function Sub({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[14px] font-semibold leading-[1.6] text-[#E8E8ED]">
      {children}
    </p>
  );
}

import Link from "next/link";
import { Logo } from "@/components/icons/Logo";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  eyebrow?: string;
  children: React.ReactNode;
}

export default function LegalLayout({
  title,
  lastUpdated,
  eyebrow,
  children,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#E8E8ED]">
      {/* Header */}
      <header className="border-b border-white/[0.08]">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/" className="rounded-sm transition-opacity duration-300 hover:opacity-80">
            <Logo size={34} />
          </Link>
          <Link
            href="/"
            className="text-[13px] text-[#9A9AA5] transition-colors duration-300 hover:text-[#E8E8ED]"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {eyebrow && (
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.08em] text-[#33D4BE]">
            {eyebrow}
          </p>
        )}
        <h1 className="font-sans text-[clamp(28px,4vw,40px)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#F5F5F7]">
          {title}
        </h1>
        <p className="mt-4 text-[13px] text-[#7D7D88]">
          Última actualización: {lastUpdated}
        </p>

        <div className="mt-14 space-y-12">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
          <p className="text-[12px] tracking-wide text-[#7D7D88]">
            © {new Date().getFullYear()} ZENTRIQ MÉXICO. Todos los derechos reservados.
          </p>
          <nav className="flex items-center gap-6">
            <Link href="/privacidad" className="text-[13px] text-[#9A9AA5] transition-colors duration-300 hover:text-[#E8E8ED]">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-[13px] text-[#9A9AA5] transition-colors duration-300 hover:text-[#E8E8ED]">
              Términos
            </Link>
            <Link href="/eliminacion-de-datos" className="text-[13px] text-[#9A9AA5] transition-colors duration-300 hover:text-[#E8E8ED]">
              Eliminación de datos
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

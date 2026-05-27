import Link from 'next/link';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
  showDraftBanner?: boolean;
}

export default function LegalLayout({
  title,
  lastUpdated,
  children,
  showDraftBanner = false,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <header className="border-b border-cream/[0.08]">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-cream group"
          >
            <svg
              width="22"
              height="25"
              viewBox="0 0 28 32"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M14 1L26.124 8V22L14 29L1.876 22V8L14 1Z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <circle cx="14" cy="15" r="2" fill="currentColor" opacity="0.6" />
            </svg>
            <span className="font-heading text-meta font-medium tracking-[0.2em] uppercase">
              Zentriq
            </span>
          </Link>
          <Link
            href="/"
            className="text-meta text-cream/60 hover:text-cream transition-colors duration-300"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {showDraftBanner && (
          <div className="mb-8 border border-coral/30 bg-coral/5 rounded-sm px-5 py-3">
            <p className="text-meta text-coral font-heading font-medium">
              Este documento está en proceso de revisión legal. Versión preliminar.
            </p>
          </div>
        )}

        <h1 className="font-heading text-cream text-heading-md sm:text-heading font-medium tracking-tight mb-3">
          {title}
        </h1>
        <p className="text-meta text-cream/50 mb-12">
          Última actualización: {lastUpdated}
        </p>

        <div className="prose-legal space-y-8 text-cream/75 text-body-lg leading-relaxed font-body">
          {children}
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-cream/[0.08]">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

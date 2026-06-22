// ─── SectionDivider — regla discreta entre secciones de la home ──────────────
// Línea 1px blanca muy tenue (white/0.07), ancho completo. Organiza el scroll
// sin llamar la atención; el teal queda reservado para acentos. Decorativa.

export default function SectionDivider() {
  return <div aria-hidden="true" className="h-px w-full bg-white/[0.07]" />;
}

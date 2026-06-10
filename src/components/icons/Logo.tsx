// ─── Logo Zentriq ────────────────────────────────────────────────────────────
// Marca: 2 curvas de nivel concéntricas (elipses) en teal graduado que convergen
// sin cruzarse hacia un punto teal vivo arriba-derecha (la "cima").
// Geometría EXACTA (coords del diseñador). El viewBox se ciñe al bounding box del
// contenido (elipses + punto) con el margen mínimo para que el non-scaling-stroke
// (1.4px) no se corte → el dibujo llena su caja y se ve grande, no perdido.
//
// LogoMark  → solo el símbolo (size = ALTURA del símbolo; el ancho sale del aspect).
// Logo      → lockup símbolo + wordmark "zentriq".
// MARK_DATA_URI → el símbolo como data-URI (para PNGs de Satori: favicon / OG).

type Theme = 'dark' | 'light';

interface LogoProps {
  size?: number;
  theme?: Theme;
  className?: string;
}

// bbox del contenido ≈ x[306.3,349.7] y[66.7,101.3]; + ~1.3 de margen para el stroke.
const VIEW_W = 46;
const VIEW_H = 38;
const ASPECT = VIEW_W / VIEW_H;

function colors(theme: Theme) {
  return theme === 'light'
    ? { curve: '#0E8C79', dot: '#00A892', text: '#16161C' }
    : { curve: '#00C2A8', dot: '#33D4BE', text: '#E8E8ED' };
}

export function LogoMark({ size = 38, theme = 'dark', className }: LogoProps) {
  const c = colors(theme);
  return (
    <svg
      width={Math.round(size * ASPECT)}
      height={size}
      viewBox="305 65 46 38"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <ellipse
        cx="328" cy="84" rx="22" ry="17"
        transform="rotate(-14 328 84)"
        fill="none" stroke={c.curve} strokeWidth="1.4" strokeOpacity="0.30"
        vectorEffect="non-scaling-stroke"
      />
      <ellipse
        cx="334" cy="78" rx="11" ry="9"
        transform="rotate(-8 334 78)"
        fill="none" stroke={c.curve} strokeWidth="1.4" strokeOpacity="0.62"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="340" cy="72" r="4" fill={c.dot} />
    </svg>
  );
}

export function Logo({ size = 34, theme = 'dark', className }: LogoProps) {
  const c = colors(theme);
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ''}`}>
      <LogoMark size={size} theme={theme} />
      <span
        className="font-sans font-semibold lowercase"
        style={{ color: c.text, fontSize: Math.round(size * 0.78), letterSpacing: '-1px' }}
      >
        zentriq
      </span>
    </span>
  );
}

// Símbolo (tema oscuro) como data-URI, para imágenes generadas por Satori
// (apple-icon, opengraph) donde se rasteriza un <img> SVG con geometría exacta.
const MARK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="46" height="38" viewBox="305 65 46 38" fill="none">' +
  '<ellipse cx="328" cy="84" rx="22" ry="17" transform="rotate(-14 328 84)" fill="none" stroke="#00C2A8" stroke-width="1.4" stroke-opacity="0.3"/>' +
  '<ellipse cx="334" cy="78" rx="11" ry="9" transform="rotate(-8 334 78)" fill="none" stroke="#00C2A8" stroke-width="1.4" stroke-opacity="0.62"/>' +
  '<circle cx="340" cy="72" r="4" fill="#33D4BE"/>' +
  '</svg>';

export const MARK_DATA_URI = `data:image/svg+xml,${encodeURIComponent(MARK_SVG)}`;
export const MARK_ASPECT = ASPECT;

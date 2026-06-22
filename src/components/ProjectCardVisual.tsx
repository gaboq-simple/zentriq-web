export type ProjectVisual = 'marketplace' | 'automation' | 'data';

interface Props {
  variant: ProjectVisual;
}

// ─── Marketplace ─────────────────────────────────────────────────────────────
// Matching oferta/demanda: nodos llenos (oferta) a la izquierda + nodos huecos
// (demanda) a la derecha; curvas finas convergen a un hub central ("match").

const HUB = { x: 100, y: 70 };

const SUPPLY = [ // izquierda, rellenos
  { x: 28, y: 42 }, { x: 28, y: 70 }, { x: 28, y: 98 },
];
const DEMAND = [ // derecha, huecos
  { x: 172, y: 42 }, { x: 172, y: 70 }, { x: 172, y: 98 },
];

function MarketplaceVisual() {
  const curve = (n: { x: number; y: number }) => {
    const cxp = (n.x + HUB.x) / 2;
    const cyp = n.y + (HUB.y - n.y) * 0.18;
    return `M ${n.x},${n.y} Q ${cxp},${cyp} ${HUB.x},${HUB.y}`;
  };

  return (
    <svg
      className="absolute inset-0"
      viewBox="0 0 200 140"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      {/* Curvas convergentes — se dibujan de los nodos al hub al hover (.flow-line) */}
      {[...SUPPLY, ...DEMAND].map((n, i) => (
        <path
          key={i}
          className="flow-line"
          d={curve(n)}
          fill="none"
          stroke="var(--teal)"
          strokeWidth={0.85}
          strokeOpacity={0.5}
          strokeDasharray={200}
          strokeDashoffset={0}
        />
      ))}

      {/* Onda — anillo que escala y se desvanece desde el hub al hover (.ripple) */}
      <circle
        className="ripple"
        cx={HUB.x} cy={HUB.y}
        r={9}
        fill="none"
        stroke="var(--teal)"
        strokeWidth={1}
        opacity={0}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />

      {/* Oferta — nodos rellenos */}
      {SUPPLY.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={2.6} fill="var(--teal)" />
      ))}

      {/* Demanda — nodos huecos (borde teal, relleno del fondo) */}
      {DEMAND.map((n, i) => (
        <circle
          key={i}
          cx={n.x} cy={n.y} r={2.6}
          fill="var(--card-float)"
          stroke="var(--teal)"
          strokeWidth={0.9}
        />
      ))}

      {/* Hub central ("match") — borde + punto sólido, latido constante (.hub-beat) */}
      <g
        className="hub-beat"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <circle cx={HUB.x} cy={HUB.y} r={9} fill="none" stroke="var(--teal)" strokeWidth={1} />
        <circle cx={HUB.x} cy={HUB.y} r={3.5} fill="var(--teal)" />
      </g>
    </svg>
  );
}

// ─── Automation ───────────────────────────────────────────────────────────────
// Panel de tareas que se procesan solas: marco de ventana con barra de título +
// lista de filas (casilla + barra de texto + check). Al hover, un escaneo recorre
// la lista y los checks se dibujan en secuencia.

const ROW_Y = [52, 70, 88, 106];

function AutomationVisual() {
  return (
    <svg
      className="absolute inset-0"
      viewBox="0 0 200 140"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="auto-clip">
          <rect x={18} y={38} width={164} height={82} />
        </clipPath>
      </defs>

      {/* Marco de ventana */}
      <rect
        x={18} y={20} width={164} height={100} rx={8}
        fill="none" stroke="var(--teal)" strokeOpacity={0.3} strokeWidth={1}
      />
      {/* Barra de título: divisoria + 2 controles */}
      <line x1={18} y1={38} x2={182} y2={38} stroke="var(--teal)" strokeOpacity={0.3} strokeWidth={0.8} />
      <circle cx={30} cy={29} r={1.6} fill="var(--teal)" fillOpacity={0.5} />
      <circle cx={37} cy={29} r={1.6} fill="var(--teal)" fillOpacity={0.5} />

      {/* Escaneo — línea + banda tenue que recorre la lista (.scan-vert) */}
      <g clipPath="url(#auto-clip)" className="scan-vert" style={{ opacity: 0 }}>
        <rect x={18} y={40} width={164} height={12} fill="var(--teal)" fillOpacity={0.06} />
        <rect x={18} y={51} width={164} height={1.4} fill="var(--teal)" fillOpacity={0.5} />
      </g>

      {/* Filas */}
      {ROW_Y.map((y, i) => (
        <g key={i}>
          {/* Casilla */}
          <rect
            x={26} y={y - 5} width={10} height={10} rx={2}
            fill="none" stroke="var(--teal)" strokeOpacity={0.4} strokeWidth={1}
          />
          {/* Barra de texto */}
          <rect
            x={44} y={y - 2.5} width={96} height={5} rx={2.5}
            fill="var(--teal)" fillOpacity={0.18}
          />
          {/* Check — se dibuja en secuencia al hover (.check-draw-N) */}
          <path
            className={`check-draw-${i + 1}`}
            d={`M ${151},${y} L ${155},${y + 4} L ${164},${y - 5}`}
            fill="none"
            stroke="var(--teal)"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={20}
            strokeDashoffset={20}
          />
        </g>
      ))}
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// Pipeline: gráfica de línea ascendente con ejes finos, malla tenue, área
// degradada bajo la línea y puntos huecos; el último punto sólido late.

const PLOT_POINTS: [number, number][] = [
  [40, 102], [76, 90], [112, 80], [148, 56], [180, 40],
];
const BASELINE = 118;

function DataVisual() {
  const lineD = PLOT_POINTS.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x},${y}`).join(' ');
  const areaD = `${lineD} L ${PLOT_POINTS[PLOT_POINTS.length - 1][0]},${BASELINE} L ${PLOT_POINTS[0][0]},${BASELINE} Z`;
  const lastIdx = PLOT_POINTS.length - 1;

  return (
    <svg
      className="absolute inset-0"
      viewBox="0 0 200 140"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="data-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--teal)" stopOpacity={0.18} />
          <stop offset="1" stopColor="var(--teal)" stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Malla horizontal tenue */}
      {[38, 62, 86].map((y) => (
        <line key={y} x1={26} y1={y} x2={190} y2={y} stroke="var(--teal)" strokeOpacity={0.09} strokeWidth={0.6} />
      ))}

      {/* Ejes */}
      <line x1={26} y1={14} x2={26} y2={BASELINE} stroke="var(--teal)" strokeOpacity={0.16} strokeWidth={0.8} />
      <line x1={26} y1={BASELINE} x2={190} y2={BASELINE} stroke="var(--teal)" strokeOpacity={0.16} strokeWidth={0.8} />

      {/* Área bajo la línea */}
      <path d={areaD} fill="url(#data-area)" />

      {/* Línea — se dibuja sola al hover (.line-chart-path) */}
      <path
        className="line-chart-path"
        d={lineD}
        fill="none"
        stroke="var(--teal)"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={200}
        strokeDashoffset={0}
      />

      {/* Puntos huecos; el último sólido, más grande y latiendo */}
      {PLOT_POINTS.map(([x, y], i) =>
        i === lastIdx ? (
          <circle key={i} className="data-last-beat" cx={x} cy={y} r={3.2} fill="var(--teal)" />
        ) : (
          <circle
            key={i}
            cx={x} cy={y} r={2.4}
            fill="var(--card-float)"
            stroke="var(--teal)"
            strokeWidth={1}
          />
        ),
      )}
    </svg>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function ProjectCardVisual({ variant }: Props) {
  if (variant === 'marketplace') return <MarketplaceVisual />;
  if (variant === 'automation') return <AutomationVisual />;
  return <DataVisual />;
}

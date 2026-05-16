export type ProjectVisual = 'marketplace' | 'automation' | 'data';

interface Props {
  variant: ProjectVisual;
}

// ─── Marketplace ─────────────────────────────────────────────────────────────

function MarketplaceVisual() {
  const cx = 100, cy = 70, r = 48;

  const peripheralNodes = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  return (
    <svg
      className="absolute inset-0"
      viewBox="0 0 200 140"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      {/* Connector lines: center → each peripheral node */}
      {peripheralNodes.map((node, i) => (
        <line
          key={i}
          x1={cx} y1={cy}
          x2={node.x} y2={node.y}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
      ))}

      {/* Peripheral nodes — pulse on card hover via CSS (.node-pulse-N) */}
      {peripheralNodes.map((node, i) => (
        <circle
          key={i}
          cx={node.x}
          cy={node.y}
          r="6"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          className={`node-pulse-${i + 1}`}
          style={{ opacity: 0.5 }}
        />
      ))}

      {/* Center node — coral accent */}
      <circle
        cx={cx} cy={cy}
        r="9"
        fill="none"
        stroke="var(--coral)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// ─── Automation ───────────────────────────────────────────────────────────────

const HIGHLIGHTED_CELLS = new Set(['0,0', '4,0', '1,1', '2,1', '0,2', '3,2', '4,3']);

function AutomationVisual() {
  const startX = 68, startY = 45;
  const cellSize = 8, gap = 6, cols = 5, rows = 4;
  const step = cellSize + gap;
  const gridW = cols * step - gap;
  const gridH = rows * step - gap;

  const cells = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cells.push({ col, row, hi: HIGHLIGHTED_CELLS.has(`${col},${row}`) });
    }
  }

  return (
    <svg
      className="absolute inset-0"
      viewBox="0 0 200 140"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="scan-clip">
          <rect x={startX} y={startY} width={gridW} height={gridH} />
        </clipPath>
      </defs>

      {/* Grid cells */}
      {cells.map(({ col, row, hi }) => (
        <rect
          key={`${col}-${row}`}
          x={startX + col * step}
          y={startY + row * step}
          width={cellSize}
          height={cellSize}
          fill={hi ? 'var(--coral)' : 'none'}
          fillOpacity={hi ? 0.6 : 0}
          stroke={hi ? 'none' : 'rgba(255,255,255,0.15)'}
          strokeWidth={hi ? 0 : 1}
        />
      ))}

      {/* Scan beam — clipped to grid, animated on card hover via CSS (.scan-line) */}
      <g clipPath="url(#scan-clip)">
        <rect
          className="scan-line"
          x={startX}
          y={startY}
          width={2}
          height={gridH}
          fill="var(--coral)"
          opacity={0}
        />
      </g>
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BARS = [
  { widthPct: 0.60, y: 22 },
  { widthPct: 0.85, y: 36 },
  { widthPct: 0.45, y: 50 },
];

const MAX_BAR_W = 140;
const BAR_START_X = 30;

// 6 ascending data points for the mini line chart
const LINE_POINTS: [number, number][] = [
  [30, 115], [58, 107], [86, 99], [114, 90], [142, 80], [170, 70],
];

function DataVisual() {
  const pathD = LINE_POINTS
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x},${y}`)
    .join(' ');

  return (
    <svg
      className="absolute inset-0"
      viewBox="0 0 200 140"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      {/* Horizontal bars — fill animates on card hover via CSS (.bar-fill-N) */}
      {BARS.map((bar, i) => (
        <rect
          key={i}
          x={BAR_START_X}
          y={bar.y}
          width={Math.round(MAX_BAR_W * bar.widthPct)}
          height={4}
          rx={2}
          fill="rgba(255,255,255,0.2)"
          className={`bar-fill-${i + 1}`}
        />
      ))}

      {/* Line chart path — draws on card hover via CSS (.line-chart-path) */}
      <path
        className="line-chart-path"
        d={pathD}
        stroke="var(--coral)"
        strokeWidth={1.5}
        fill="none"
        strokeDasharray={200}
        strokeDashoffset={0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data point dots */}
      {LINE_POINTS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill="var(--coral)" />
      ))}
    </svg>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function ProjectCardVisual({ variant }: Props) {
  if (variant === 'marketplace') return <MarketplaceVisual />;
  if (variant === 'automation') return <AutomationVisual />;
  return <DataVisual />;
}

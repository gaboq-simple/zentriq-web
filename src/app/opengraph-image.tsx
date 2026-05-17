import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Zentriq — Estudio de software a la medida';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1C1917',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <svg width="48" height="56" viewBox="0 0 28 32" fill="none">
            <path
              d="M14 1 L26 8 V24 L14 31 L2 24 V8 Z"
              stroke="#FAF6F1"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="14" cy="16" r="2" fill="#D85A30" />
          </svg>
          <span
            style={{
              color: '#FAF6F1',
              fontSize: '32px',
              letterSpacing: '0.1em',
              fontWeight: 500,
            }}
          >
            ZENTRIQ
          </span>
        </div>

        {/* Middle: tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              color: '#D85A30',
              fontSize: '20px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Estudio de software a la medida
          </div>
          <div
            style={{
              color: '#FAF6F1',
              fontSize: '64px',
              lineHeight: 1.1,
              fontWeight: 600,
              maxWidth: '900px',
            }}
          >
            Construimos automatización, datos y software.{' '}
            <span style={{ color: '#D85A30' }}>Producción en 6-8 semanas.</span>
          </div>
        </div>

        {/* Bottom: location + URL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#B5AFA8',
            fontSize: '20px',
            letterSpacing: '0.08em',
          }}
        >
          <span>CDMX · México</span>
          <span>zentriq.mx</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

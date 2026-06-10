import { ImageResponse } from 'next/og';
import { MARK_DATA_URI } from '@/components/icons/Logo';

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
          background: '#0A0A0F',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src={MARK_DATA_URI} width={66} height={55} alt="" />
          <span
            style={{
              color: '#E8E8ED',
              fontSize: '36px',
              letterSpacing: '-1px',
              fontWeight: 600,
            }}
          >
            zentriq
          </span>
        </div>

        {/* Middle: tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              color: '#00C2A8',
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
              color: '#E8E8ED',
              fontSize: '64px',
              lineHeight: 1.1,
              fontWeight: 600,
              maxWidth: '900px',
            }}
          >
            Construimos automatización, datos y software.{' '}
            <span style={{ color: '#00C2A8' }}>Producción en 6-8 semanas.</span>
          </div>
        </div>

        {/* Bottom: location + URL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#9A9AA5',
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

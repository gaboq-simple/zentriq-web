import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1C1917',
          borderRadius: '36px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <span style={{ color: '#D85A30', fontSize: '110px', fontWeight: 700 }}>Z</span>
      </div>
    ),
    { ...size },
  );
}

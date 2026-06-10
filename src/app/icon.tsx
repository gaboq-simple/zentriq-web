import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// A 16px las curvas se pierden; domina el punto teal vivo sobre el cuadro oscuro.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#15151D',
          borderRadius: '7px',
        }}
      >
        <div style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#33D4BE' }} />
      </div>
    ),
    { ...size },
  );
}

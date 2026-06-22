import { ImageResponse } from 'next/og';
import { MARK_DATA_URI } from '@/components/icons/Logo';

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
          background: '#15151D',
          borderRadius: '40px',
        }}
      >
        {/* Símbolo exacto rasterizado desde el data-URI */}
        <img src={MARK_DATA_URI} width={132} height={110} alt="" />
      </div>
    ),
    { ...size },
  );
}

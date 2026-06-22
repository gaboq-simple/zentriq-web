'use client';

import { MotionConfig } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  // Lenis (scroll suave) global, salvo que el usuario pida menos movimiento.
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Patrón SSR-safe correcto: `window.matchMedia` no existe en el servidor, así
    // que no puede ir en el initializer de useState; hay que leerlo tras el montaje.
    // El setState inicial aquí es intencional y único (no genera renders en cascada).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const content = <MotionConfig reducedMotion="user">{children}</MotionConfig>;

  if (reducedMotion) return content;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {content}
    </ReactLenis>
  );
}

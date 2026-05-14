'use client';

import { useEffect, useRef } from 'react';
import {
  createHexNetwork,
  animate,
  resizeCanvas,
  destroyHexNetwork,
} from '@/lib/hexNetwork';

interface HexNetworkProps {
  nodeCount?: number;
  className?: string;
}

export default function HexNetwork({ nodeCount = 40, className = '' }: HexNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = createHexNetwork(canvas, nodeCount);

    // Mouse tracking
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      state.mouseX = e.clientX - rect.left;
      state.mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      state.mouseX = -1000;
      state.mouseY = -1000;
    };

    // Resize handling
    const handleResize = () => resizeCanvas(canvas, state);

    // Intersection Observer — pause when off-screen
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !state.isActive) {
          state.isActive = true;
          animate(canvas, state);
        } else if (!entry.isIntersecting) {
          state.isActive = false;
          if (state.animId !== null) cancelAnimationFrame(state.animId);
        }
      },
      { threshold: 0.1 },
    );
    observerRef.current.observe(canvas);

    // Start animation
    animate(canvas, state);

    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      destroyHexNetwork(state);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      observerRef.current?.disconnect();
    };
  }, [nodeCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'auto' }}
    />
  );
}

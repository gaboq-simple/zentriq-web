'use client';

import { useEffect, useRef } from 'react';
import Globe, { type GlobeInstance } from 'globe.gl';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

const TEAL = '#00C2A8';
const BG = 0x0a0a0f;

// Ciudades (solo extremos de los arcos — sin marcadores visibles).
const CDMX: [number, number] = [19.4326, -99.1332];
const NYC: [number, number] = [40.7128, -74.006];
const MADRID: [number, number] = [40.4168, -3.7038];
const SAO: [number, number] = [-23.5505, -46.6333];
const TOKYO: [number, number] = [35.6762, 139.6503];
const LONDON: [number, number] = [51.5074, -0.1278];

interface ArcDatum {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  gap: number; // initial dash gap → desfase de la estela por arco
}

const PAIRS: [[number, number], [number, number]][] = [
  [CDMX, NYC],
  [MADRID, SAO],
  [CDMX, TOKYO],
  [NYC, LONDON],
  [CDMX, MADRID],
  [LONDON, TOKYO],
  [CDMX, SAO],
  [SAO, NYC],
  [CDMX, LONDON],
  [MADRID, LONDON],
];

// Estelas escalonadas: cada arco arranca su dash en distinta fase → siempre
// hay varias viajando, desincronizadas y repartidas por el globo.
const ARCS: ArcDatum[] = PAIRS.map(([from, to], i) => ({
  startLat: from[0],
  startLng: from[1],
  endLat: to[0],
  endLng: to[1],
  gap: (i / PAIRS.length) * 2,
}));

// Resolución del muestreo del land mask + paso (densidad de puntos).
const SAMPLE_W = 1024;
const SAMPLE_H = 512;
const LAT_STEP_DESKTOP = 1.0; // ~12k puntos
const LAT_STEP_MOBILE = 1.5; // ~la mitad → menos carga en móvil

// Puntos de referencia (lat,lng) inequívocos para auto-detectar la polaridad y
// el umbral de la máscara (robusto ante cualquier mapa tierra/agua).
const LAND_REF: [number, number][] = [
  [5, 20], // África central
  [-5, -62], // Amazonas
  [55, 90], // Siberia
  [-25, 133], // Australia central
];
const OCEAN_REF: [number, number][] = [
  [0, -150], // Pacífico central
  [-30, -120], // Pacífico sur
  [-20, 75], // Índico
  [40, -40], // Atlántico norte
];

// Construye los puntos de los continentes muestreando el land mask y
// posicionándolos con la MISMA proyección de three-globe (getCoords) → quedan
// alineados con los arcos. Mapeo equirectangular estándar (plate carrée):
// x = (lng+180)/360 · width ; y = (90-lat)/180 · height.
function buildLandDots(
  globe: GlobeInstance,
  img: HTMLImageElement,
  latStep: number,
): THREE.Points | null {
  const canvas = document.createElement('canvas');
  canvas.width = SAMPLE_W;
  canvas.height = SAMPLE_H;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, SAMPLE_W, SAMPLE_H);
  const data = ctx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data;

  const lumaAt = (lat: number, lng: number) => {
    const u = (lng + 180) / 360;
    const v = (90 - lat) / 180;
    const px = Math.min(SAMPLE_W - 1, Math.max(0, Math.floor(u * SAMPLE_W)));
    const py = Math.min(SAMPLE_H - 1, Math.max(0, Math.floor(v * SAMPLE_H)));
    const idx = (py * SAMPLE_W + px) * 4;
    return (data[idx] + data[idx + 1] + data[idx + 2]) / 3 / 255;
  };

  // Auto-polaridad: ¿la tierra es más clara o más oscura que el agua?
  const avg = (pts: [number, number][]) =>
    pts.reduce((s, [la, lo]) => s + lumaAt(la, lo), 0) / pts.length;
  const landAvg = avg(LAND_REF);
  const oceanAvg = avg(OCEAN_REF);
  const landIsBright = landAvg > oceanAvg;
  const threshold = (landAvg + oceanAvg) / 2;
  const isLand = (lat: number, lng: number) => {
    const l = lumaAt(lat, lng);
    return landIsBright ? l > threshold : l < threshold;
  };

  const positions: number[] = [];
  for (let lat = -85; lat <= 85; lat += latStep) {
    const lngStep = latStep / Math.max(Math.cos((lat * Math.PI) / 180), 0.15); // densidad pareja por área
    for (let lng = -180; lng < 180; lng += lngStep) {
      if (isLand(lat, lng)) {
        const { x, y, z } = globe.getCoords(lat, lng, 0.005);
        positions.push(x, y, z);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: new THREE.Color(TEAL),
    size: 0.8,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
  });
  return new THREE.Points(geometry, material);
}

export default function ConnectionGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Móvil: pixelRatio y densidad menores para reducir consumo (desktop intacto).
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    const latStep = isMobile ? LAT_STEP_MOBILE : LAT_STEP_DESKTOP;
    let disposed = false;
    let dots: THREE.Points | null = null;

    const globe = new Globe(el, { rendererConfig: { alpha: true, antialias: true } })
      .backgroundColor('rgba(0,0,0,0)')
      .showGlobe(true)
      .globeMaterial(new THREE.MeshBasicMaterial({ color: BG })) // esfera oscura: ocluye los puntos traseros
      .showAtmosphere(true)
      .atmosphereColor(TEAL)
      .atmosphereAltitude(0.18) // glow teal sutil
      .arcsData(ARCS)
      .arcColor(() => ['rgba(0,194,168,0)', 'rgba(0,194,168,0.9)']) // cola transparente → cabeza teal
      .arcStroke(0.5)
      .arcDashLength(0.4)
      .arcDashGap(2)
      .arcDashInitialGap((d) => (d as ArcDatum).gap)
      .arcDashAnimateTime(reduce ? 0 : 3500)
      .arcsTransitionDuration(0)
      .enablePointerInteraction(false); // decorativo

    // Tamaño + nitidez.
    const size = el.clientWidth;
    globe.width(size).height(size);
    globe.renderer().setPixelRatio(dpr);

    // Puntos de los continentes (land mask, async).
    const img = new Image();
    img.onload = () => {
      if (disposed) return;
      dots = buildLandDots(globe, img, latStep);
      if (dots) globe.scene().add(dots);
    };
    img.src = '/earth-water.png';

    // Encuadre inicial (América al frente).
    globe.pointOfView({ lat: 12, lng: -70, altitude: 2.3 });

    // Controles: solo auto-rotación lenta, sin interacción del usuario.
    const controls = globe.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.autoRotate = !reduce;
    controls.autoRotateSpeed = 0.5;

    if (reduce) {
      // Estático: arcos completos visibles, sin viaje ni rotación.
      globe.arcDashLength(0.95).arcDashGap(0.1).arcDashAnimateTime(0);
    }

    // Responsivo.
    const ro = new ResizeObserver(() => {
      const s = el.clientWidth;
      globe.width(s).height(s);
    });
    ro.observe(el);

    // Pausa el loop de WebGL (render + rotación + estelas) cuando el globo no
    // está visible → ahorra CPU/batería en móvil.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) globe.resumeAnimation();
        else globe.pauseAnimation();
      },
      { threshold: 0 },
    );
    io.observe(el);

    // Fade-in suave del canvas.
    const canvas = globe.renderer().domElement;
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 1s ease';
    const fade = window.setTimeout(() => {
      canvas.style.opacity = '1';
    }, 0);

    return () => {
      disposed = true;
      ro.disconnect();
      io.disconnect();
      window.clearTimeout(fade);
      controls.autoRotate = false;
      if (dots) {
        dots.geometry.dispose();
        (dots.material as THREE.Material).dispose();
      }
      globe._destructor();
    };
  }, [reduce]);

  return (
    <div className="w-full max-w-[520px] mx-auto aspect-square">
      <div ref={containerRef} aria-hidden="true" className="h-full w-full" />
    </div>
  );
}

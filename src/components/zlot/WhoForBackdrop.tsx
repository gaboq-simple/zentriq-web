"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const ROT_X = -1.16;
const ROT_Z = -0.9;
const LOOK_Y = 18;
const FIELD_OFFSET_X = 180;
const LOOK_X = 130;
const WAVE_SPEED = 0.0006;
const GX = 100;
const GZ = 88;
const SPACING = 4.8;

function makeDotTexture(): THREE.Texture {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = S;
  c.height = S;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  grd.addColorStop(0, "rgba(170,255,244,1)");
  grd.addColorStop(0.25, "rgba(90,235,215,0.95)");
  grd.addColorStop(0.55, "rgba(40,200,180,0.5)");
  grd.addColorStop(1, "rgba(0,194,168,0)");
  g.fillStyle = grd;
  g.beginPath();
  g.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2);
  g.fill();
  const tex = new THREE.Texture(c);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

export default function WhoForBackdrop({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion() ?? false;
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let W = mount.clientWidth || 640;
    let H = mount.clientHeight || 800;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 3000);
    camera.position.set(0, 70, 330);
    camera.lookAt(LOOK_X, LOOK_Y, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(W, H);
    mount.appendChild(renderer.domElement);

    const N = GX * GZ;
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const baseR = 0.27;
    const baseG = 0.84;
    const baseB = 0.76;

    let i = 0;
    for (let ix = 0; ix < GX; ix++) {
      for (let iz = 0; iz < GZ; iz++) {
        const px = (ix - GX / 2) * SPACING;
        const pz = (iz - GZ / 2) * SPACING;
        positions[i * 3] = px;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = pz;

        const nx = ix / (GX - 1);
        const fadeRight = Math.min(1, Math.max(0, (nx - 0.02) / 0.45));
        const edgeRight = 1 - Math.max(0, (nx - 0.9) / 0.1);
        const nz = iz / (GZ - 1);
        const fadeZ = Math.pow(Math.sin(nz * Math.PI), 0.7);
        const f = fadeRight * edgeRight * fadeZ;

        colors[i * 3] = baseR * f;
        colors[i * 3 + 1] = baseG * f;
        colors[i * 3 + 2] = baseB * f;
        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const dotTexture = makeDotTexture();
    const material = new THREE.PointsMaterial({
      size: 2.0,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 1,
    });

    const points = new THREE.Points(geometry, material);
    points.rotation.x = ROT_X;
    points.rotation.z = ROT_Z;
    points.position.x = FIELD_OFFSET_X;
    scene.add(points);

    const posAttr = geometry.attributes.position as THREE.BufferAttribute;

    const computeWave = (t: number) => {
      const arr = posAttr.array as Float32Array;
      let k = 0;
      for (let ix = 0; ix < GX; ix++) {
        const px = (ix - GX / 2) * SPACING;
        for (let iz = 0; iz < GZ; iz++) {
          const pz = (iz - GZ / 2) * SPACING;
          arr[k * 3 + 1] =
            Math.sin(px * 0.05 + t * 1.6) * 14 +
            Math.cos(pz * 0.052 + t * 1.35) * 13 +
            Math.sin((px + pz) * 0.03 + t * 0.9) * 5;
          k++;
        }
      }
      posAttr.needsUpdate = true;
    };

    let rafId = 0;
    let running = false;

    const renderOnce = (t: number) => {
      computeWave(t);
      camera.lookAt(LOOK_X, LOOK_Y, 0);
      renderer.render(scene, camera);
    };

    const animate = (now: number) => {
      rafId = requestAnimationFrame(animate);
      renderOnce(now * WAVE_SPEED);
    };

    const startLoop = () => {
      if (running || reduce) return;
      running = true;
      rafId = requestAnimationFrame(animate);
    };
    const stopLoop = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    renderOnce(0);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      { threshold: 0.02 },
    );
    io.observe(mount);

    const ro = new ResizeObserver(() => {
      W = mount.clientWidth || W;
      H = mount.clientHeight || H;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
      if (!running) renderOnce(0);
    });
    ro.observe(mount);

    return () => {
      stopLoop();
      io.disconnect();
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      dotTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reduce]);

  return (
    <div className="relative overflow-hidden bg-[#0A0A0F]">
      <div
        ref={mountRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse at 92% 42%, #0e1c19 0%, #0A0A0F 56%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(90deg, rgba(10,10,15,0.99) 36%, rgba(10,10,15,0.7) 52%, rgba(10,10,15,0.15) 78%, transparent 92%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-28"
        style={{ background: "linear-gradient(180deg, #0A0A0F 0%, rgba(10,10,15,0) 100%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-72"
        style={{ background: "linear-gradient(0deg, #0A0A0F 0%, #0A0A0F 26%, rgba(10,10,15,0) 100%)" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

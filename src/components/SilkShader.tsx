'use client';

import { useEffect, useRef } from 'react';

// ─── Silk shader · ondulación líquida sobre la imagen real de seda ─────────────
// WebGL crudo (0 dependencias). Desplaza las UVs de la textura con 2 capas de
// ruido lento → la seda ondula como líquido, sutil y premium.
//
// Es PURAMENTE ADITIVO: se pinta encima de la <Image> estática (Ken Burns), que
// queda siempre debajo como fallback. Si cualquier puerta falla (sin WebGL,
// móvil, gama baja, reduced-motion, error de carga/compilación), el componente
// no inicia y se ve la imagen estática, sin romper nada.

// ─── Calibración (ajusta estos dos números) ───────────────────────────────────
// AMP   = cantidad de distorsión / ondulación. ~0.035 se nota bien y elegante.
//         Sube para más ondulación, baja para más sutil.
// SPEED = velocidad del tiempo del shader. Mantener en rango lento-premium.
// ─── Calibración (ajusta estos números) ───────────────────────────────────────
// AMP        = cantidad de ondulación (bajísima = nítida, sin deformar).
// SPEED      = velocidad global del tiempo (más bajo = más en calma).
// FLOW_SPEED = qué tan rápido "fluye"/avanza el patrón en diagonal.
// FLOW_DIR   = dirección del flujo, normalizada (+x derecha, +y arriba).
// IRREG      = toque sutil de irregularidad (baja frecuencia, no arruga).
// WARP       = deformación orgánica de BAJA frecuencia del campo → agua en calma.
const AMP = 0.03;
const SPEED = 0.00032;
const FLOW_SPEED = 0.18;
const FLOW_DIR = [0.707, 0.707] as const;
const IRREG = 0.18;
const WARP = 0.12;

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_img;

void main() {
  // cover-fit: replica object-cover respetando el aspecto de la imagen
  float canvasAspect = u_res.x / u_res.y;
  float imgAspect = u_img.x / u_img.y;
  vec2 scale = vec2(1.0);
  if (canvasAspect > imgAspect) {
    scale.y = imgAspect / canvasAspect;
  } else {
    scale.x = canvasAspect / imgAspect;
  }
  vec2 uv = (v_uv - 0.5) * scale + 0.5;

  // inset: zoom hacia adentro → margen para que el desplazamiento no toque el
  // borde (evita el estiramiento por clamp). Un poco más de margen que antes.
  uv = (uv - 0.5) * 0.94 + 0.5;

  // atenuación SUAVE: basada en la distancia a la orilla más cercana (no en el
  // producto x*y, que mataba las esquinas). Piso 0.40 → esquinas y bordes siguen
  // con vida; solo la banda exterior (12%) se calma lo justo para no distorsionar.
  float edgeDist = min(min(v_uv.x, 1.0 - v_uv.x), min(v_uv.y, 1.0 - v_uv.y));
  float edgeMask = 0.40 + 0.60 * smoothstep(0.0, 0.12, edgeDist);

  // ondulado suave: 2 capas lentas de seno. El patrón AVANZA en diagonal (flujo).
  float t = u_time;
  vec2 p = uv + vec2(${FLOW_DIR[0].toFixed(4)}, ${FLOW_DIR[1].toFixed(4)}) * t * ${FLOW_SPEED.toFixed(4)};

  // domain warp orgánico de BAJA frecuencia → mece el campo como agua en calma,
  // sin arrugar (frecuencias ~1.0 = ondas grandes y suaves, no pliegues).
  vec2 warp = vec2(sin(p.y * 1.1 + t * 0.30), cos(p.x * 0.9 - t * 0.25));
  p += warp * ${WARP.toFixed(4)};

  vec2 d;
  d.x = sin(p.y * 3.0 + t) + 0.5 * sin(p.y * 5.0 - t * 0.8);
  d.y = cos(p.x * 3.0 - t * 0.9) + 0.5 * cos(p.x * 5.0 + t * 0.7);
  // irregularidad sutil de baja frecuencia (rompe la repetición sin arrugar)
  d.x += ${IRREG.toFixed(4)} * sin(p.y * 1.7 + p.x * 0.9 + t * 0.45);
  d.y += ${IRREG.toFixed(4)} * cos(p.x * 1.3 - p.y * 1.1 + t * 0.40);

  uv += d * ${AMP.toFixed(4)} * edgeMask; // amplitud calibrable, atenuada a las orillas

  gl_FragColor = texture2D(u_tex, uv);
}
`;

export default function SilkShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Puertas de degradación → si alguna aplica, no iniciamos (queda estática)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile =
      window.matchMedia('(max-width: 767px)').matches ||
      window.matchMedia('(pointer: coarse)').matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowEnd =
      (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2) ||
      (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2);
    if (reduced || isMobile || lowEnd) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl =
        (canvas.getContext('webgl', { alpha: true, antialias: false, depth: false }) as
          | WebGLRenderingContext
          | null) ||
        (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    } catch {
      gl = null;
    }
    if (!gl) return; // sin WebGL → estática

    const glc = gl;
    let rafId = 0;
    let running = false;
    let ready = false;
    let start = 0;
    let imgW = 1;
    let imgH = 1;
    let program: WebGLProgram | null = null;
    let texture: WebGLTexture | null = null;
    let disposed = false;

    const compile = (type: number, src: string) => {
      const sh = glc.createShader(type);
      if (!sh) return null;
      glc.shaderSource(sh, src);
      glc.compileShader(sh);
      if (!glc.getShaderParameter(sh, glc.COMPILE_STATUS)) {
        glc.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      glc.viewport(0, 0, w, h);
    };

    let uTime: WebGLUniformLocation | null = null;
    let uRes: WebGLUniformLocation | null = null;
    let uImg: WebGLUniformLocation | null = null;

    const init = (img: HTMLImageElement) => {
      const vs = compile(glc.VERTEX_SHADER, VERT);
      const fs = compile(glc.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return false;

      program = glc.createProgram();
      if (!program) return false;
      glc.attachShader(program, vs);
      glc.attachShader(program, fs);
      glc.linkProgram(program);
      if (!glc.getProgramParameter(program, glc.LINK_STATUS)) return false;
      glc.useProgram(program);

      // quad full-screen (triangle strip)
      const buf = glc.createBuffer();
      glc.bindBuffer(glc.ARRAY_BUFFER, buf);
      glc.bufferData(
        glc.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        glc.STATIC_DRAW,
      );
      const aPos = glc.getAttribLocation(program, 'a_pos');
      glc.enableVertexAttribArray(aPos);
      glc.vertexAttribPointer(aPos, 2, glc.FLOAT, false, 0, 0);

      // textura desde la imagen real (non-power-of-two → CLAMP + LINEAR, sin mipmaps)
      texture = glc.createTexture();
      glc.bindTexture(glc.TEXTURE_2D, texture);
      glc.pixelStorei(glc.UNPACK_FLIP_Y_WEBGL, true);
      glc.texImage2D(glc.TEXTURE_2D, 0, glc.RGBA, glc.RGBA, glc.UNSIGNED_BYTE, img);
      glc.texParameteri(glc.TEXTURE_2D, glc.TEXTURE_WRAP_S, glc.CLAMP_TO_EDGE);
      glc.texParameteri(glc.TEXTURE_2D, glc.TEXTURE_WRAP_T, glc.CLAMP_TO_EDGE);
      glc.texParameteri(glc.TEXTURE_2D, glc.TEXTURE_MIN_FILTER, glc.LINEAR);
      glc.texParameteri(glc.TEXTURE_2D, glc.TEXTURE_MAG_FILTER, glc.LINEAR);

      uTime = glc.getUniformLocation(program, 'u_time');
      uRes = glc.getUniformLocation(program, 'u_res');
      uImg = glc.getUniformLocation(program, 'u_img');
      const uTex = glc.getUniformLocation(program, 'u_tex');
      glc.uniform1i(uTex, 0);

      imgW = img.naturalWidth;
      imgH = img.naturalHeight;
      resize();
      return true;
    };

    const frame = (now: number) => {
      if (disposed) return;
      if (!start) start = now;
      const t = (now - start) * SPEED; // tiempo lento (calibrable desde SPEED)
      glc.uniform1f(uTime, t);
      glc.uniform2f(uRes, canvas.width, canvas.height);
      glc.uniform2f(uImg, imgW, imgH);
      glc.drawArrays(glc.TRIANGLE_STRIP, 0, 4);
      if (!ready) {
        ready = true;
        canvas.style.opacity = '1'; // fade-in al primer frame
      }
      rafId = requestAnimationFrame(frame);
    };

    const startLoop = () => {
      if (running || !program || disposed) return;
      running = true;
      rafId = requestAnimationFrame(frame);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const onResize = () => {
      if (program) resize();
    };
    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    const onContextLost = (e: Event) => {
      e.preventDefault();
      stopLoop();
      canvas.style.opacity = '0'; // revela la imagen estática debajo
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) startLoop();
          else stopLoop();
        }
      },
      { threshold: 0 },
    );

    // carga de la textura: la imagen real
    const img = new window.Image();
    img.decoding = 'async';
    img.src = '/hero-seda.jpg';
    img.onload = () => {
      if (disposed) return;
      try {
        if (init(img)) {
          window.addEventListener('resize', onResize);
          document.addEventListener('visibilitychange', onVisibility);
          canvas.addEventListener('webglcontextlost', onContextLost);
          io.observe(canvas);
          startLoop();
        }
      } catch {
        stopLoop(); // cualquier fallo → queda la estática
      }
    };
    img.onerror = () => {
      /* error de carga → no iniciamos, queda la estática */
    };

    return () => {
      disposed = true;
      stopLoop();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      io.disconnect();
      if (texture) glc.deleteTexture(texture);
      if (program) glc.deleteProgram(program);
      glc.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700"
    />
  );
}

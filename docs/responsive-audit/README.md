# Auditoría responsive — Zentriq

Capturas de referencia del sitio en los breakpoints clave, tomadas el 2026-06-09
con Chromium (Playwright) tras los arreglos P1/P2 del globo.

## Breakpoints
- **375px** — móvil chico (referencia mínima del proyecto)
- **414px** — móvil grande
- **768px** — tablet (activa navbar desktop + grids de 2–3 columnas)

## Resultado
- **Sin scroll horizontal** en ningún breakpoint (`scrollWidth == viewport` medido en 375 / 414 / 768).
- Todos los grids colapsan correctamente: Soluciones 2×2 → 1 col; Proyectos 3 → 1 col; Footer 4 → 1 col; Proceso (timeline 2 col) → 1 col; Conexión (globo + texto) → 1 col.
- Hero: el titular envuelve limpio (sin apretarse ni desbordar); shader de seda desactivado en móvil (fallback a imagen estática).
- Globo: continentes nítidos, bien dimensionado a la columna, no se corta ni desborda. Pausa el loop WebGL fuera del viewport (P1) y usa menos densidad/pixelRatio en móvil (P2).

## Archivos
| Archivo | Qué muestra |
|---|---|
| `375-overview.png` | Página completa a 375px* |
| `375-manifiesto.png` · `375-soluciones.png` · `375-proceso.png` · `375-proyectos.png` · `375-faq.png` · `375-cta-footer.png` | Secciones a 375px (reveals disparados) |
| `375-conexion-globo.png` | Globo + texto a 375px |
| `414-overview.png` · `414-conexion-globo.png` | Overview y globo a 414px |
| `768-overview.png` · `768-conexion-globo.png` | Overview y globo a 768px (navbar desktop + globo 2 columnas) |

\* Nota: en las capturas `*-overview.png` (página completa), algunas secciones bajo
el fold pueden verse en negro: es un artefacto de captura (las animaciones
`whileInView` no se disparan en un screenshot full-page sin scroll). En el
navegador real aparecen al hacer scroll. Las capturas por sección (`375-*.png`)
sí tienen los reveals disparados y reflejan el render real.

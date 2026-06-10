# Sistema de diseño Zentriq — Guía para Claude Code

> Documento de referencia para construir la página web de Zentriq.
> Estudio de software a la medida · CDMX · Vibra: laboratorio técnico y preciso.

---

## 0. Usar la skill UI/UX Pro Max (léelo primero)

Si tienes instalada la skill **UI/UX Pro Max** en Claude Code, esta se activa
automáticamente cuando pides trabajo de UI/UX. La skill puede generar sistemas de
diseño desde cero — pero **nosotros ya tenemos uno definido y fijo** (este
documento). No queremos que lo reemplace, sino que lo refuerce.

Pega este mensaje en Claude Code **antes** del prompt inicial de la sección 2:

```
Tengo la skill UI/UX Pro Max instalada y quiero que la uses en este proyecto,
PERO con una condición importante: ya tengo un sistema de diseño definido y fijo
(te lo paso a continuación). NO generes un sistema de diseño nuevo ni cambies mis
colores, fuentes ni estilo.

Usa la skill únicamente para:
- Validar accesibilidad: ratios de contraste de mis colores (teal #00C2A8 sobre
  fondo oscuro #0A0A0F), estados de foco visibles, etiquetas ARIA.
- Aplicar sus guías de UX: estados de carga, comportamiento responsive,
  micro-interacciones, áreas táctiles adecuadas en móvil.
- Generar código idiomático para mi stack: Next.js + TypeScript + Tailwind CSS.
- Correr su checklist de pre-entrega al terminar cada sección.

A continuación te paso mi sistema de diseño y empezamos sección por sección.
```

Notas:
- Su fuerte para nosotros son los chequeos de contraste/accesibilidad y el
  checklist de pre-entrega. Pídele explícitamente que los corra al cerrar cada
  sección.
- La skill trae un script de Python (`scripts/search.py`) que consulta datos
  locales. Es seguro, pero como buena práctica puedes revisarlo antes de correrlo.
- Si en algún momento la skill propone cambiar un color o una fuente, recuérdale
  que el sistema de diseño de este documento es la fuente de verdad.

---

## 1. Identidad visual

### Colores

| Uso | Hex |
|-----|-----|
| Fondo principal | `#0A0A0F` |
| Surface | `#12121A` |
| Cards | `#1A1A24` |
| Elevated | `#24242F` |
| **Acento principal (teal)** | `#00C2A8` |
| Acento hover / claro | `#33D4BE` |
| Borde sutil | `rgba(0,194,168, 0.12)` |
| Borde hover | `rgba(0,194,168, 0.3)` |
| Fondo sutil acento | `rgba(0,194,168, 0.04)` |
| Texto principal | `#E8E8ED` |
| Texto secundario | `#6B6B78` |
| Texto terciario | `#4A4A55` |

### Tipografía

- **Font principal:** Inter (Google Fonts)
- **Headlines:** peso 600
- **Body:** peso 400
- **Números decorativos:** peso 300, tamaño 32–36px, color `rgba(0,194,168, 0.07)`
- **Monospace (JetBrains Mono):** SOLO para el stack técnico y badges de tecnologías
- **Etiquetas de sección:** Inter 13px, color `#00C2A8`, texto simple (sin uppercase, sin monospace, sin línea decorativa)
- **Navegación:** Inter 13px, peso 500

### Reglas de estilo

- Grid sutil de fondo: líneas de 1px `rgba(0,194,168, 0.02)` cada 20px
- Cards con `border-left` 2px `rgba(0,194,168, 0.12)`, sin border-radius del lado izquierdo
- Hover en cards: el `border-left` se vuelve `#00C2A8` sólido, el número sube a `rgba(0,194,168, 0.45)`, el título se vuelve `#00C2A8`, la descripción sube a `#A0A0AD`. Transición 350ms ease.

### Evitar (importante)

Gradientes neón, mesh backgrounds, partículas brillantes, stock photos de "equipo feliz", íconos 3D, emojis, colores saturados, y tipografía monospace fuera del stack técnico. Esto mantiene la marca diferenciada y evita el look genérico de startup tech.

---

## 2. Prompt inicial para Claude Code

Copia esto como tu primer mensaje en Claude Code:

```
Estoy reconstruyendo la página web de Zentriq (zentriq.mx), un estudio de
software a la medida en CDMX. El proyecto usa Next.js + TypeScript + Tailwind CSS,
desplegado en Vercel.

Quiero una página muy elaborada visualmente, con animaciones e interacciones
sofisticadas, pero con una vibra de laboratorio técnico y preciso — NO el look
genérico de startup tech.

Instala estas librerías:
- framer-motion (animaciones de componentes)
- gsap + @gsap/react (animaciones ligadas al scroll, con ScrollTrigger)
- lenis (scroll suave)

SISTEMA DE DISEÑO:

Fondos: principal #0A0A0F, surface #12121A, cards #1A1A24, elevated #24242F
Acento: #00C2A8 (teal), hover #33D4BE
Bordes: rgba(0,194,168, 0.12), hover rgba(0,194,168, 0.3)
Texto: principal #E8E8ED, secundario #6B6B78, terciario #4A4A55

Tipografía:
- Inter para todo (headlines peso 600, body peso 400)
- Números decorativos: peso 300, 32-36px, color rgba(0,194,168, 0.07)
- JetBrains Mono SOLO para el stack técnico y badges de tecnologías
- Etiquetas de sección: Inter 13px color #00C2A8, texto simple sin uppercase
- Navegación: Inter 13px peso 500

Grid sutil de fondo: líneas 1px rgba(0,194,168, 0.02) cada 20px.

Animaciones con Framer Motion: las secciones hacen fade-in desde abajo
(y: 20 → 0, opacity: 0 → 1) al entrar al viewport, con stagger de 100ms
entre elementos.

NO usar: gradientes neón, mesh backgrounds, partículas brillantes, stock photos,
emojis, colores saturados, monospace fuera del stack técnico.

Empecemos configurando el proyecto, Lenis para el scroll suave, e Inter +
JetBrains Mono desde Google Fonts. Luego seguimos sección por sección.
```

---

## 3. Fondo animado — Corrientes de datos (hero)

Este es el efecto que afinamos juntos. Pásale el código directo a Claude Code para
que no tenga que adivinar los valores. Pídele que lo convierta en un componente de
React/Next.js con `'use client'` y un `<canvas>` a pantalla completa detrás del hero.

**Comportamiento:** partículas finas que fluyen siguiendo corrientes ondulantes,
muy sutiles pero vivas. El cursor dispersa suavemente las corrientes cercanas (las
empuja a un lado sin deshacerlas) y las hace un poco más visibles a su paso.

**Valores finales:** cantidad 620, ondulación 17, vida 12, dispersión 16,
visibilidad 20 (opacidad base 0.20).

```javascript
// Lógica central del campo de flujo (adaptar a un componente React con useRef + useEffect)
const T = '0,194,168';            // color teal en RGB
const count = 620;                // cantidad de partículas
const wave = 17;                  // ondulación
const life = 12;                  // energía del movimiento
const disp = 16;                  // fuerza de dispersión del cursor
const baseOp = 0.20;              // visibilidad base (visibilidad 20 / 100)

let parts = [];
for (let i = 0; i < count; i++) {
  parts.push({
    x: Math.random() * W,
    y: Math.random() * H,
    px: 0, py: 0,
    age: Math.random() * 200,
    spd: 0.6 + Math.random() * 0.8
  });
}

let t = 0;
function field(x, y) {
  const scale = wave / 1000;
  return (Math.sin(x * scale + t)
        + Math.cos(y * scale - t * 0.8)
        + Math.sin((x + y) * scale * 0.5 + t * 0.5)) * Math.PI;
}

function loop() {
  // estela: fondo semitransparente en lugar de clear, da el efecto "vivo"
  ctx.fillStyle = 'rgba(10,10,15,0.10)';
  ctx.fillRect(0, 0, W, H);
  t += 0.0015 + life * 0.00012;

  parts.forEach(p => {
    const a = field(p.x, p.y);
    const speed = p.spd * (life / 10);
    p.px = p.x; p.py = p.y;
    p.x += Math.cos(a) * speed;
    p.y += Math.sin(a) * speed;

    // dispersión suave del cursor (mx, my = posición del mouse)
    const dx = p.x - mx, dy = p.y - my, dist = Math.hypot(dx, dy);
    let extra = 0;
    if (dist < 100 && dist > 0.5) {
      const f = (1 - dist / 100);
      const push = f * disp * 0.12;
      p.x += (dx / dist) * push;
      p.y += (dy / dist) * push;
      extra = f * 0.4;
    }

    // reciclar partícula al salir o envejecer
    p.age++;
    if (p.x < 0 || p.x > W || p.y < 0 || p.y > H || p.age > 220) {
      p.x = Math.random() * W; p.y = Math.random() * H;
      p.px = p.x; p.py = p.y; p.age = 0;
    }

    ctx.beginPath();
    ctx.moveTo(p.px, p.py);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = 'rgba(' + T + ',' + (baseOp + extra) + ')';
    ctx.lineWidth = 0.6 + extra;
    ctx.stroke();
  });

  requestAnimationFrame(loop);
}
```

**Nota para Claude Code:** usar `window.devicePixelRatio` para nitidez en retina,
escuchar `mousemove` sobre el canvas (y poner `mx = my = -500` en `mouseleave`),
manejar el `resize`, y respetar `prefers-reduced-motion` (si está activo, mostrar
el fondo estático sin animación).

---

## 4. Cards con inclinación 3D

Para las secciones de Soluciones y Proceso. Las cards se inclinan hacia donde
apunta el cursor, como objetos físicos, y la línea teal del borde se ilumina.

```
Quiero que las cards de soluciones tengan un efecto de inclinación 3D:
- Al mover el cursor sobre una card, se inclina suavemente hacia esa dirección
  usando perspective(800px) rotateX/rotateY, máximo 12 grados en cada eje.
- Transición de 0.15s ease-out para que se sienta fluido.
- Al quitar el cursor (mouseleave), vuelve suavemente a 0 grados.
- En hover: el border-left pasa de rgba(0,194,168,0.12) a #00C2A8 sólido,
  el número decorativo sube de opacidad, y el título se vuelve teal.
- Calcular la inclinación con la posición relativa del mouse dentro de la card:
  x = (mouseX - rect.left) / rect.width - 0.5, igual para y.
  rotateY = x * 12, rotateX = -y * 12.
```

---

## 5. Números que cuentan

Para una sección de métricas (ej: semanas promedio de entrega, proyectos
entregados, retención de clientes). Los números suben desde 0 hasta su valor
real cuando la sección entra en pantalla.

```
Agrega una sección de métricas con números que cuentan hacia arriba.
- Cada número arranca en 0 y sube hasta su valor final cuando la sección
  entra al viewport (usar IntersectionObserver o el whileInView de Framer Motion).
- La animación dura aproximadamente 1.2s con easing suave.
- Los números van en color #00C2A8, tamaño grande (~48px), peso 300,
  con font-variant-numeric: tabular-nums para que no "salten" al cambiar.
- Debajo de cada número, una etiqueta en #6B6B78 tamaño 12px.
- Solo deben contar una vez (no repetir cada vez que entran y salen del viewport).
```

---

## 6. Orden de construcción sugerido

Trabaja una sección a la vez. Cuando estés contento con una, pasa a la siguiente:

1. **Setup** — proyecto, Lenis (scroll suave), fuentes, sistema de colores en Tailwind config
2. **Hero** — con el fondo de corrientes de datos animado
3. **Manifiesto** — "No somos una consultora. Somos los que lo resuelven."
4. **Soluciones** — 4 cards con inclinación 3D
5. **Proceso** — 4 pasos (Escuchamos, Diseñamos, Construimos, Funciona)
6. **Métricas** — números que cuentan (sección nueva, opcional)
7. **Proyectos** — los 3 casos (Marketplace, Asistencia, Pipeline de datos)
8. **FAQ** — acordeón con animación de apertura suave
9. **CTA + Footer** — "Tienes un problema. Nosotros tenemos la forma."

---

## 7. Tips para iterar con Claude Code

- Si algo no te gusta, **no regeneres desde cero** — dile el cambio exacto:
  "el título se ve pequeño, hazlo 48px" o "la animación va lenta, bájala a 200ms".
- Pídele que te muestre el resultado y haz ajustes finos uno por uno.
- Cuando un efecto te guste, dile "guarda este patrón y úsalo también en X sección"
  para mantener consistencia.
- Para el rendimiento: pídele que las animaciones de canvas se pausen cuando la
  sección no está visible, y que respete `prefers-reduced-motion`.
- Al cerrar cada sección, pídele a la skill UI/UX Pro Max que corra sus chequeos
  de accesibilidad y su checklist de pre-entrega sobre esa sección. Presta
  atención al contraste de textos y botones — fue justo donde tuvimos dudas.

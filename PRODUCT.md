# Product

## Register

brand

## Users

Directores de operaciones, COOs, fundadores y líderes de tecnología en empresas
medianas mexicanas (con base o foco en CDMX). Llegan al sitio cansados de
procesos manuales que les cuestan tiempo y de consultoras que venden discovery
de 6 semanas y presentaciones de 40 slides. Su contexto al visitar: evalúan en
minutos si Zentriq es gente que de verdad construye o una agencia más que
promete. El trabajo que quieren resolver: encontrar a alguien que entienda su
problema operativo y lo resuelva con software, automatización y data pipelines
a la medida, sin teatro.

## Product Purpose

Zentriq es un laboratorio de tecnología aplicada con base en CDMX. Construye
software, automatización y data pipelines a la medida para empresas que quieren
dejar de perder tiempo en procesos manuales. El sitio es el entregable de marca:
su trabajo es transmitir autoridad técnica y percepción premium en los primeros
segundos, y convertir a un líder operativo escéptico en una conversación.
Posicionamiento anti-consultora: "No somos una consultora, somos los que lo
resuelven." Éxito = el sitio se siente nivel Linear / Vercel / Stripe (objetivo
9/10 en autoridad/percepción premium, partiendo de un 4/10) y el visitante
asume competencia técnica antes de leer un solo caso.

## Brand Personality

Directo, técnico, sin jerga, anti-marketing-corporativo. Tres palabras:
**preciso, confiado, sin teatro.** La voz demuestra en lugar de prometer:
muestra el trabajo, no adjetivos sobre el trabajo. Debe evocar la confianza de
hablar con un ingeniero senior que ya resolvió tu problema antes, no la ansiedad
de un pitch de ventas. Español impecable con acentos correctos (un acento
faltante es un bug crítico).

## Anti-references

- **Consultora corporativa** (Accenture / Deloitte / McKinsey-shaped): stock de
  gente en juntas, slides, "transformación digital", lenguaje vago que no dice
  qué se construye. Este es el anti-referente #1; el posicionamiento entero es
  anti-consultora.
- **Plantilla SaaS genérica de 2026**: el landing de IA por defecto. Hero-métrica
  (número gigante + label + stats), grids de cards idénticas con icono+título+
  texto, eyebrows en mayúsculas tracked sobre cada sección, fondo cream/beige
  por reflejo, gradient text. Si se parece a la landing modal de la categoría,
  reiniciar.
- Cualquier cosa que se sienta "plantilla". El sitio fue evaluado en 4/10
  precisamente por leerse genérico.

## Design Principles

1. **Demostrar, no prometer.** Cada sección prueba competencia técnica con algo
   real (trabajo, mecánica, precisión visual), no con adjetivos. Sin Lorem Ipsum,
   sin placeholders tipo "VISTA DEL PROYECTO": si no hay contenido real, se
   elimina la sección.
2. **Densidad y precisión sobre relleno (Linear).** Tipografía afilada, espaciado
   milimétrico, jerarquía que se siente construida con intención. Cero relleno.
3. **Autoridad por contraste y reducción (Vercel).** La confianza se transmite
   quitando, no agregando. Contraste fuerte, una idea dominante por fold.
4. **Claridad del mensaje sin jerga (Stripe).** Explicar lo técnico en lenguaje
   llano; cuando ayude, un diagrama o ilustración que enseña en lugar de decorar.
5. **Motion con propósito.** Animación de entrada orquestada que se siente
   premium, no fade-on-scroll genérico en cada sección. El motion es parte del
   build, no un afterthought.
6. **Dark mode técnico, teal como único acento.** Fondo oscuro #0A0A0F como
   base; el teal #00C2A8 es el único acento y se usa como línea, texto y glow
   sutil, nunca como relleno saturado grande. El lenguaje visual es corrientes
   de datos / campo de flujo + grid técnico sutil: de laboratorio, nunca neón.

## Accessibility & Inclusion

- Contraste WCAG AA mínimo en todo texto (body ≥4.5:1, large ≥3:1). En el tema
  oscuro vigilar: texto secundario #6B6B78 y terciario #4A4A55 sobre fondo
  #0A0A0F (el terciario sólo para large/decorativo, no para body). El teal
  #00C2A8 como texto/etiqueta sobre #0A0A0F debe validarse; usar #33D4BE si el
  ratio queda corto. Verificar foco visible (no depender sólo del color).
- Mobile first: todo debe verse igual de bien a 375px de ancho.
- `prefers-reduced-motion: reduce` obligatorio en toda animación (ya implementado
  para las visuales de tarjeta; mantener el estándar en todo motion nuevo).
- Español es el idioma del sitio; acentos correctos son requisito de accesibilidad
  y de marca a la vez.

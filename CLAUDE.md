@AGENTS.md
# Zentriq — Sitio web

## Qué es Zentriq
Zentriq es un "laboratorio de tecnología aplicada" basado en CDMX. Construye 
software, automatización y data pipelines a la medida para empresas que 
quieren dejar de perder tiempo en procesos manuales. El posicionamiento es 
anti-consultora: "No somos una consultora, somos los que lo resuelven."

## Audiencia objetivo
Directores de operaciones, COOs, fundadores y líderes de tecnología en 
empresas medianas mexicanas que necesitan software custom y odian los 
discovery de 6 semanas y las presentaciones de 40 slides.

## Identidad visual
- Tema: dark mode técnico. Fondo principal #0A0A0F, surfaces #12121A / #1A1A24 /
  #24242F.
- Color signature: teal #00C2A8 (acento único; hover #33D4BE). Se usa como línea,
  texto y glow sutil, NUNCA como relleno saturado grande.
- Lenguaje visual: corrientes de datos / campo de flujo + grid técnico sutil
  (líneas 1px rgba(0,194,168,0.02) cada 20px). Preciso, de laboratorio, no neón.
- Tono: directo, técnico, sin jerga, anti-marketing-corporativo
- El sitio debe sentirse premium: nivel Linear / Vercel / Stripe, no plantilla
- La fuente y el tratamiento de cards son la fuente de verdad de zentriq-sistema-diseno.md.

## Reglas no negociables
1. **Acentos siempre correctos.** Este es un sitio en español. Cualquier 
   palabra sin acento es un bug crítico.
2. **TypeScript strict mode** en todo el código nuevo.
3. **Credenciales solo en env vars.**
4. **El teal #00C2A8 es el único acento.** Línea, texto y glow sutil; nunca
   relleno saturado grande ni neón. Evitar gradientes neón, mesh, partículas
   brillantes y colores saturados.
5. **Sin Lorem Ipsum, sin placeholders tipo "VISTA DEL PROYECTO".** Si no 
   hay contenido real, mejor eliminar la sección.
6. **Mobile first responsive.** Todos los cambios deben verse igual de bien 
   en 375px de ancho.
7. **Accesibilidad:** contraste WCAG AA mínimo en todo texto.

## Estado actual y objetivo
El sitio fue evaluado en 4/10 en autoridad/percepción premium. Se está 
transformando a 9/10 mediante un plan en 5 fases. Ver el plan completo en 
este archivo de prompts.
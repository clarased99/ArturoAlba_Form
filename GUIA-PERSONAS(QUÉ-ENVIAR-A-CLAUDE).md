# Qué enviar a Claude para añadir una pregunta

## Antes de escribir a Claude

1. Sube la(s) imagen(es) del producto a `assets/images/` en GitHub.
   Nómbralas `test-N-producto.png` (ej. `test-6-serum.png`).
2. Anota qué plantilla quieres:
   - **A** = imagen a la derecha
   - **B** = imagen a la izquierda
   - **C** = 4 imágenes de respuesta (una foto por cada opción)

## Prompt 1 — contexto

Adjunta estos 4 archivos y pega esto:

> Voy a añadir una pregunta nueva al quiz. Te adjunto el README del
> proyecto, la guía de cómo añadir preguntas, la última pregunta
> actual y la página de resultados. Léelos y confírmame que estás
> listo para generar la pregunta nueva.

**Archivos a adjuntar:**
- `README.md`
- `PARA-CLAUDE.md`
- `test-[última pregunta actual].html` (ej. `test-5.html`)
- `z-final.html`

## Prompt 2 — datos de la pregunta

> Genera la pregunta número **[N]**, plantilla **[A / B / C]**.
>
> - Pregunta: [texto de la pregunta]
> - A: [respuesta A]
> - B: [respuesta B]
> - C: [respuesta C]
> - D: [respuesta D]
> - Correcta: [A / B / C / D]
> - Imagen(es): [nombre(s) exacto(s) de archivo subido(s)]
> - ¿Es la última pregunta del quiz? [Sí / No — si no, indica cuál va después]
>
> Dame: el HTML completo de la pregunta nueva, el bloque para
> `z-final.html`, y el cambio exacto que hay que hacer en
> `test-[última pregunta actual].html` para enlazarla.

## Al recibir la respuesta de Claude

1. Crea `test-[N].html` en GitHub ("Add file" → "Create new file") y pega el HTML que te dé.
2. Edita `test-[última pregunta actual].html` (lápiz ✏️) y aplica el cambio del enlace "Siguiente".
3. Edita `z-final.html` (lápiz ✏️) y pega el bloque nuevo justo antes de `</section>`.
4. Guarda los 3 cambios (commit).
5. Espera 1-2 min al despliegue de Vercel y prueba el quiz completo.

## Si algo no cuadra

Pégale a Claude una captura o descríbele qué ves distinto a lo
esperado — igual que harías con cualquier otro ajuste de diseño.

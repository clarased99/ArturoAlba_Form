# Cómo añadir una nueva pregunta — instrucciones para Claude

Este documento está escrito para que lo lea **Claude** (la IA), como
contexto de un proyecto real, cuando alguien del equipo le pida
ayuda para añadir una pregunta nueva al quiz. La persona que lo pide
no sabe programar — Claude debe generar el código completo y
explicarle exactamente dónde pegarlo, sin dar por hecho que sabe
leer HTML/CSS/JS.

## Qué es este proyecto (resumen)

Un quiz de 5 preguntas (ampliable) sobre productos de la marca
Arturo Alba, en HTML/CSS/JS puro, sin backend. Cada pregunta es una
página independiente (`test-1.html`, `test-2.html`...) que guarda la
respuesta del usuario en `sessionStorage`. La página final
(`z-final.html`) lee esas respuestas, calcula la puntuación (`X/N`,
donde N es el número de preguntas que haya) y muestra un mensaje de
marca. **La puntuación y los mensajes se recalculan solos según
cuántos bloques de pregunta existan en `z-final.html` — no hace
falta tocar `results.js` ni `quiz.js` para añadir una pregunta.**

Para más contexto general del proyecto, consulta también
`README.md` si está disponible en la conversación.

## Qué necesitas saber ANTES de generar nada

Si la persona no te ha dado ya esta información en su mensaje,
pregúntasela (puedes hacerlo todo en una sola pregunta):

1. **Número de la pregunta nueva** (ej. `6`) — normalmente el
   siguiente número disponible después de la última pregunta que
   exista en el proyecto.
2. **Qué plantilla quiere** — plantilla A (imagen a la derecha),
   B (imagen a la izquierda) o C (4 imágenes de respuesta). Si no lo
   tiene claro, pregúntale cómo es la imagen que tiene: una sola
   foto de producto → A o B; cuatro fotos de producto distintas para
   elegir → C.
3. **El texto de la pregunta.**
4. **Las 4 respuestas** (texto de cada una).
5. **Cuál de las 4 es la correcta** (A, B, C o D).
6. **El/los nombre(s) de archivo de la(s) imagen(es)** que ya ha
   subido a `assets/images/` (pídeselo si no te lo da — no
   inventes un nombre de archivo).
7. **Si esta es la última pregunta del quiz, o si va a añadir más
   después.** Esto determina a dónde debe apuntar el botón
   "Siguiente" de la pregunta nueva:
    - Si es la última → debe apuntar a `z-final.html`.
    - Si vendrán más → debe apuntar a `test-[N+1].html`.
8. Para hacer el enlace correctamente **también necesitas ver el
   archivo de la pregunta que hasta ahora era la última** (para
   saber su nombre y poder decirle a la persona qué línea cambiar
   en ese archivo), y **el `z-final.html` actual** (para insertar el
   bloque nuevo en el sitio correcto y saber qué `data-question` usar
   sin repetir uno existente). Pídeselos si no te los ha adjuntado.

No inventes nombres de archivo, textos de producto ni datos de la
marca que no te hayan dado — pregunta si falta algo.

## Las 3 plantillas — código exacto a reutilizar

Usa estos esqueletos literalmente, sustituyendo solo lo que está
entre `[corchetes]`. No cambies clases CSS, estructura de etiquetas,
ni el orden de los bloques — el CSS del proyecto depende de que la
estructura sea exactamente esta.

### Plantilla A — imagen a la derecha

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pregunta [N] — La Fórmula del Saber | Arturo Alba</title>
<link rel="icon" href="assets/images/favicon.png">
<link rel="stylesheet" href="css/main.css">
</head>
<body class="quiz quiz--q[N]" data-question="[N]">

  <a href="index.html" class="quiz__restart">
    <span class="quiz__restart-arrow" aria-hidden="true">←</span>
    <span>Volver a empezar</span>
  </a>

  <main class="quiz__panel quiz__panel--question">
    <div class="quiz__content">
      <h1 class="quiz__question">[PREGUNTA]</h1>

      <ul class="quiz__options" role="listbox" aria-label="Opciones de respuesta">
        <li role="presentation">
          <button type="button" class="quiz__option" data-value="A" role="option" aria-selected="false">
            <span class="quiz__option-icon" aria-hidden="true">→</span>
            <span class="quiz__option-text">[RESPUESTA_A]</span>
          </button>
        </li>
        <li role="presentation">
          <button type="button" class="quiz__option" data-value="B" role="option" aria-selected="false">
            <span class="quiz__option-icon" aria-hidden="true">→</span>
            <span class="quiz__option-text">[RESPUESTA_B]</span>
          </button>
        </li>
        <li role="presentation">
          <button type="button" class="quiz__option" data-value="C" role="option" aria-selected="false">
            <span class="quiz__option-icon" aria-hidden="true">→</span>
            <span class="quiz__option-text">[RESPUESTA_C]</span>
          </button>
        </li>
        <li role="presentation">
          <button type="button" class="quiz__option" data-value="D" role="option" aria-selected="false">
            <span class="quiz__option-icon" aria-hidden="true">→</span>
            <span class="quiz__option-text">[RESPUESTA_D]</span>
          </button>
        </li>
      </ul>
    </div>

    <a href="[SIGUIENTE_HREF]" class="quiz__next" id="nextBtn" aria-disabled="true">
      <span>SIGUIENTE</span>
      <span class="quiz__next-arrow" aria-hidden="true">→</span>
    </a>
  </main>

  <div class="quiz__panel quiz__panel--visual">
    <img
      src="assets/images/[IMAGEN]"
      alt="[DESCRIPCIÓN DEL PRODUCTO]"
      class="quiz__visual-image">
  </div>

  <script src="js/quiz.js"></script>
</body>
</html>
```

### Plantilla B — imagen a la izquierda

Idéntica a la A, pero con el `<div class="quiz__panel quiz__panel--visual">`
**antes** del `<main class="quiz__panel quiz__panel--question">` en el
HTML (el orden de aparición en el código es lo único que decide qué
lado ocupa cada uno — no hay que cambiar nada de CSS):

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pregunta [N] — La Fórmula del Saber | Arturo Alba</title>
<link rel="icon" href="assets/images/favicon.png">
<link rel="stylesheet" href="css/main.css">
</head>
<body class="quiz quiz--q[N]" data-question="[N]">

  <a href="index.html" class="quiz__restart">
    <span class="quiz__restart-arrow" aria-hidden="true">←</span>
    <span>Volver a empezar</span>
  </a>

  <div class="quiz__panel quiz__panel--visual">
    <img
      src="assets/images/[IMAGEN]"
      alt="[DESCRIPCIÓN DEL PRODUCTO]"
      class="quiz__visual-image">
  </div>

  <main class="quiz__panel quiz__panel--question">
    <div class="quiz__content">
      <h1 class="quiz__question">[PREGUNTA]</h1>

      <ul class="quiz__options" role="listbox" aria-label="Opciones de respuesta">
        <li role="presentation">
          <button type="button" class="quiz__option" data-value="A" role="option" aria-selected="false">
            <span class="quiz__option-icon" aria-hidden="true">→</span>
            <span class="quiz__option-text">[RESPUESTA_A]</span>
          </button>
        </li>
        <li role="presentation">
          <button type="button" class="quiz__option" data-value="B" role="option" aria-selected="false">
            <span class="quiz__option-icon" aria-hidden="true">→</span>
            <span class="quiz__option-text">[RESPUESTA_B]</span>
          </button>
        </li>
        <li role="presentation">
          <button type="button" class="quiz__option" data-value="C" role="option" aria-selected="false">
            <span class="quiz__option-icon" aria-hidden="true">→</span>
            <span class="quiz__option-text">[RESPUESTA_C]</span>
          </button>
        </li>
        <li role="presentation">
          <button type="button" class="quiz__option" data-value="D" role="option" aria-selected="false">
            <span class="quiz__option-icon" aria-hidden="true">→</span>
            <span class="quiz__option-text">[RESPUESTA_D]</span>
          </button>
        </li>
      </ul>
    </div>

    <a href="[SIGUIENTE_HREF]" class="quiz__next" id="nextBtn" aria-disabled="true">
      <span>SIGUIENTE</span>
      <span class="quiz__next-arrow" aria-hidden="true">→</span>
    </a>
  </main>

  <script src="js/quiz.js"></script>
</body>
</html>
```

### Plantilla C — 4 imágenes de respuesta (pantalla oscura)

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pregunta [N] — La Fórmula del Saber | Arturo Alba</title>
<link rel="icon" href="assets/images/favicon.png">
<link rel="stylesheet" href="css/main.css">
</head>
<body class="quiz quiz--full quiz--q[N]" data-question="[N]">

  <a href="index.html" class="quiz__restart">
    <span class="quiz__restart-arrow" aria-hidden="true">←</span>
    <span>Volver a empezar</span>
  </a>

  <main class="quiz__panel--full">
    <div class="quiz__full-inner">
      <h1 class="quiz__question quiz__question--center">[PREGUNTA]</h1>

      <ul class="quiz__image-options" role="listbox" aria-label="Opciones de respuesta">
        <li role="presentation">
          <button type="button" class="quiz__image-option quiz__answer" data-value="A" role="option" aria-selected="false">
            <img src="assets/images/[IMAGEN_A]" alt="[DESCRIPCIÓN PRODUCTO A]">
            <span class="quiz__image-option-label">[NOMBRE_PRODUCTO_A]</span>
          </button>
        </li>
        <li role="presentation">
          <button type="button" class="quiz__image-option quiz__answer" data-value="B" role="option" aria-selected="false">
            <img src="assets/images/[IMAGEN_B]" alt="[DESCRIPCIÓN PRODUCTO B]">
            <span class="quiz__image-option-label">[NOMBRE_PRODUCTO_B]</span>
          </button>
        </li>
        <li role="presentation">
          <button type="button" class="quiz__image-option quiz__answer" data-value="C" role="option" aria-selected="false">
            <img src="assets/images/[IMAGEN_C]" alt="[DESCRIPCIÓN PRODUCTO C]">
            <span class="quiz__image-option-label">[NOMBRE_PRODUCTO_C]</span>
          </button>
        </li>
        <li role="presentation">
          <button type="button" class="quiz__image-option quiz__answer" data-value="D" role="option" aria-selected="false">
            <img src="assets/images/[IMAGEN_D]" alt="[DESCRIPCIÓN PRODUCTO D]">
            <span class="quiz__image-option-label">[NOMBRE_PRODUCTO_D]</span>
          </button>
        </li>
      </ul>
    </div>

    <a href="[SIGUIENTE_HREF]" class="quiz__next" id="nextBtn" aria-disabled="true">
      <span>SIGUIENTE</span>
      <span class="quiz__next-arrow" aria-hidden="true">→</span>
    </a>
  </main>

  <script src="js/quiz.js"></script>
</body>
</html>
```

En la plantilla C, `[NOMBRE_PRODUCTO_A]` puede llevar un `<br>` en
medio si el nombre es largo y conviene partirlo en dos líneas (mira
`test-3.html` como referencia real de cómo queda).

### Bloque para `z-final.html`

Además de crear `test-[N].html`, genera SIEMPRE este bloque y dile a
la persona que lo pegue dentro de `z-final.html`, justo antes de
`</section>` (el cierre de `<section class="results__detail" id="detalle">`):

```html
<article class="results__question-block" data-question="[N]">
  <h2 class="results__question">[PREGUNTA]</h2>
  <ul class="results__options">
    <li><button type="button" class="results__option" data-value="A"[MARCA_SI_ES_A]><span class="results__option-icon" aria-hidden="true">→</span><span class="results__option-text">[RESPUESTA_A]</span></button></li>
    <li><button type="button" class="results__option" data-value="B"[MARCA_SI_ES_B]><span class="results__option-icon" aria-hidden="true">→</span><span class="results__option-text">[RESPUESTA_B]</span></button></li>
    <li><button type="button" class="results__option" data-value="C"[MARCA_SI_ES_C]><span class="results__option-icon" aria-hidden="true">→</span><span class="results__option-text">[RESPUESTA_C]</span></button></li>
    <li><button type="button" class="results__option" data-value="D"[MARCA_SI_ES_D]><span class="results__option-icon" aria-hidden="true">→</span><span class="results__option-text">[RESPUESTA_D]</span></button></li>
  </ul>
</article>
```

Donde `[MARCA_SI_ES_X]` es literalmente el texto ` data-correct="true"`
**solo en la respuesta correcta**, y una cadena vacía en las otras
tres. No añadas `data-correct="false"` en las incorrectas — se
omite el atributo entero.

## Los otros dos cambios que SIEMPRE hay que hacer

Generar `test-[N].html` y el bloque de `z-final.html` no es
suficiente — sin estos dos pasos la pregunta nueva existe pero nadie
llega nunca a verla:

1. **Reenganchar la pregunta anterior.** En el archivo que hasta
   ahora era la última pregunta del quiz, busca su botón "Siguiente"
   (`<a href="z-final.html" class="quiz__next" ...>`) y cambia ese
   `href` para que apunte a `test-[N].html` en vez de a
   `z-final.html`. Indícaselo a la persona con precisión: nombre de
   archivo, línea antes y línea después.

2. **El propio `href` de "Siguiente" de la pregunta nueva** — ya
   resuelto en la plantilla como `[SIGUIENTE_HREF]`, pero confirma
   que coincide con lo que te dijo la persona en el punto 7 de la
   sección anterior (si es la última pregunta, `z-final.html`; si no,
   `test-[N+1].html`).

## Color de acento (opcional)

Si la persona quiere que esta pregunta tenga un color de marca
distinto al naranja por defecto, indícale que añada esto en
`css/main.css`, junto a las reglas `body.quiz--q1`, `body.quiz--q2`...
ya existentes:

```css
body.quiz--q[N] {
    --accent: #ff6b00;
    --accent-text: #302e2b;
}
```

(sustituyendo `#ff6b00` por el color que quiera en `--accent`). Si no
lo piden, no hace falta añadir nada — el color por defecto ya
funciona sin esta regla.

## Cómo debes entregar la respuesta

Da a la persona, en este orden, con encabezados claros:

1. El contenido completo de `test-[N].html`, listo para copiar y
   pegar en un archivo nuevo con ese nombre.
2. La línea exacta a cambiar en la pregunta anterior (con el "antes"
   y el "después").
3. El bloque a pegar en `z-final.html`, indicando textualmente que va
   "justo antes de `</section>`".
4. Un resumen en 3-4 pasos de qué tiene que hacer con cada cosa en
   GitHub (crear archivo nuevo con "Add file", editar los otros dos
   con el lápiz ✏️, hacer commit).

No asumas que la persona sabe qué es un commit, un `<article>` o un
`href` — explícalo en una frase si lo mencionas.

## Qué NO hay que tocar

- `js/quiz.js` y `js/results.js` — son genéricos, no dependen del
  número de preguntas.
- El resto de páginas de pregunta que no sean la anterior a la nueva.
- `css/main.css`, salvo el bloque opcional de color de acento.

## Después de subir los cambios

Recuérdale a la persona que:
- Vercel despliega automáticamente 1-2 minutos después del `push`.
- Debe probar el test completo de principio a fin, comprobando que
  la puntuación final muestra `X/[N]` correctamente y que la pregunta
  nueva aparece en el detalle de "Ver respuestas" con la opción
  correcta en verde.
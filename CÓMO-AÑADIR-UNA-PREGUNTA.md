# Cómo añadir una nueva pregunta

Esta guía está pensada para poder añadir preguntas **sin programar ni
usar un editor de código especial** — todo se puede hacer desde el
propio GitHub, usando el botón de editar (el lápiz ✏️) en cada
archivo, y el botón "Add file → Upload files" para subir imágenes.

No hace falta tocar nada de JavaScript. El sistema calcula solo la
puntuación (`X/6`, `X/7`...) y reutiliza los mismos mensajes de
resultado ajustándolos al nuevo total de preguntas.

## Resumen rápido (checklist)

Para añadir una pregunta nueva (por ejemplo, una pregunta 6):

1. Elige una de las 3 plantillas (ver abajo) según cómo quieras mostrar la imagen.
2. Sube la(s) imagen(es) del producto a `assets/images/`.
3. Copia el archivo `test-N.html` de la plantilla elegida, renómbralo a `test-6.html`.
4. Edita dentro de `test-6.html`: el texto de la pregunta, las 4 respuestas, y la ruta de la imagen.
5. Cambia el enlace "Siguiente" de la **última pregunta actual** (`test-5.html`) para que apunte a `test-6.html` en vez de a `z-final.html`.
6. Dentro de `test-6.html`, comprueba que su propio botón "Siguiente" apunta a `z-final.html` (o a `test-7.html` si añades más de una).
7. Añade un bloque nuevo en `z-final.html` con la pregunta y sus 4 respuestas (marcando cuál es la correcta).
8. Sube los cambios (`git push`) y espera el despliegue automático en Vercel.

Nada más. El contador de preguntas, la puntuación y los mensajes de
resultado se recalculan solos.

---

## Las 3 plantillas disponibles

El quiz tiene 3 formatos de pregunta ya montados. Elige el que mejor
encaje con la imagen del producto que tengas:

| Plantilla | Cómo se ve | Archivo de ejemplo |
|---|---|---|
| **A — Imagen a la derecha** | Pregunta y respuestas de texto a la izquierda (fondo blanco), imagen del producto ocupando toda la mitad derecha | `test-1.html`, `test-4.html` |
| **B — Imagen a la izquierda** | Igual que la A pero en espejo: imagen a la izquierda, pregunta a la derecha | `test-2.html`, `test-5.html` |
| **C — 4 imágenes de respuesta** | Pantalla completa oscura, la pregunta arriba centrada, y las 4 respuestas son imágenes de producto (no texto) en una fila | `test-3.html` |

Las plantillas A y B son idénticas en estructura, solo cambia el
orden en el HTML (cuál va primero, si el bloque de la imagen o el de
la pregunta) — el CSS ya se encarga del resto automáticamente.

**Importante sobre las imágenes**: en las plantillas A y B, la imagen
debe llevar el texto del producto ya integrado (no se añade texto por
encima en la web) y debe estar recortada para verse bien ocupando
media pantalla. En la plantilla C, las 4 imágenes son cuadradas y
llevan el nombre del producto como texto aparte, debajo de cada una
(ese sí se escribe en el HTML, no en la imagen).

---

## Paso a paso detallado

### 1. Sube las imágenes

Ve a la carpeta `assets/images/` en GitHub → "Add file" → "Upload
files". Sigue la misma nomenclatura que las existentes, por ejemplo
`test-6-nombredelproducto.png`.

### 2. Copia el archivo de plantilla

Abre el archivo de la plantilla que quieras usar (por ejemplo
`test-1.html` para la plantilla A), copia todo su contenido, crea un
archivo nuevo llamado `test-6.html` en la raíz del proyecto (mismo
sitio que los demás `test-N.html`), y pega el contenido ahí.

### 3. Edita el contenido del archivo nuevo

Dentro de `test-6.html`, cambia:

- **La clase y el número de pregunta** en la etiqueta `<body>`:
  ```html
  <body class="quiz quiz--q6" data-question="6">
  ```
  (cambia `quiz--q1`/`data-question="1"` por `quiz--q6`/`data-question="6"`, o el número que corresponda)

- **El texto de la pregunta**, dentro de `<h1 class="quiz__question">`.

- **Las 4 respuestas**, dentro de cada `<span class="quiz__option-text">`. No hace falta marcar cuál es la correcta aquí — eso se hace solo en `z-final.html` (paso 7).

- **La imagen**, cambiando la ruta `src` del `<img>` por la que hayas subido en el paso 1.

- **El enlace del botón "Siguiente"** (`<a href="test-2.html" class="quiz__next" ...>`) — debe apuntar a la página que vaya después de esta. Si esta es la última pregunta, debe apuntar a `z-final.html`.

- **Si quieres un color de acento distinto** al naranja de marca para esta pregunta, añade en `css/main.css`, junto a las reglas `body.quiz--q1`, `body.quiz--q2`... una nueva:
  ```css
  body.quiz--q6 {
      --accent: #ff6b00;
      --accent-text: #302e2b;
  }
  ```
  (puedes dejar el mismo naranja o poner un color distinto en `--accent`)

### 4. Enlaza la pregunta nueva desde la anterior

Abre la que hasta ahora era la última pregunta (`test-5.html`) y
cambia su botón "Siguiente":
```html
<a href="z-final.html" class="quiz__next" ...>
```
por:
```html
<a href="test-6.html" class="quiz__next" ...>
```

### 5. Añade el bloque en la página de resultados

Abre `z-final.html` y busca la sección que empieza así:
```html
<section class="results__detail" id="detalle">
```
Dentro de ella verás un `<article class="results__question-block" data-question="...">` por cada pregunta. Copia uno entero (por ejemplo el de la pregunta 5) y pégalo justo antes de `</section>`. Después edítalo:

- Cambia `data-question="5"` por `data-question="6"`.
- Cambia el texto de la pregunta (`<h2 class="results__question">`).
- Cambia el texto de las 4 respuestas (`<span class="results__option-text">`).
- **Marca cuál es la correcta** añadiendo `data-correct="true"` en el `<button>` de esa respuesta (mira cómo está hecho en las preguntas existentes — solo una de las 4 debe llevarlo).

Ejemplo de un bloque completo:
```html
<article class="results__question-block" data-question="6">
  <h2 class="results__question">Texto de la pregunta nueva</h2>
  <ul class="results__options">
    <li><button type="button" class="results__option" data-value="A"><span class="results__option-icon" aria-hidden="true">→</span><span class="results__option-text">Respuesta A</span></button></li>
    <li><button type="button" class="results__option" data-value="B"><span class="results__option-icon" aria-hidden="true">→</span><span class="results__option-text">Respuesta B</span></button></li>
    <li><button type="button" class="results__option" data-value="C" data-correct="true"><span class="results__option-icon" aria-hidden="true">→</span><span class="results__option-text">Respuesta C (esta es la correcta)</span></button></li>
    <li><button type="button" class="results__option" data-value="D"><span class="results__option-icon" aria-hidden="true">→</span><span class="results__option-text">Respuesta D</span></button></li>
  </ul>
</article>
```

**No hace falta tocar nada más en `z-final.html` ni en ningún
archivo `.js`.** En cuanto este bloque existe en la página, el sitio
detecta automáticamente que ahora hay 6 preguntas en vez de 5, y:
- el resultado se mostrará como `X/6` en vez de `X/5`,
- los mismos mensajes de "maestría", "afinando el instinto", etc. se
  repartirán proporcionalmente entre 0 y 6 aciertos en vez de entre 0
  y 5 (por ejemplo, el mensaje que antes correspondía solo a 3/5
  puede pasar a mostrarse tanto en 3/6 como en 4/6) — no hay que
  escribir mensajes nuevos.

### 6. Sube los cambios

Con `git add`, `git commit` y `git push` (o directamente los commits
que genera GitHub al guardar cada archivo editado desde el navegador).
Vercel detecta el cambio y despliega la nueva versión en 1-2 minutos.

---

## Cómo probarlo

1. Abre la landing y haz el test completo hasta el final.
2. Comprueba que la puntuación final muestra `X/6` (o el total que corresponda).
3. Comprueba que la pregunta nueva aparece en el detalle de "Ver respuestas", con la opción correcta en verde.
4. Si has añadido más de una pregunta a la vez, revisa que cada botón "Siguiente" enlaza a la pregunta correcta y que el orden es el esperado.

## Dudas frecuentes

**¿Puedo quitar una pregunta en vez de añadirla?**
Sí — el proceso es el mismo pero al revés: elimina el archivo
`test-N.html` correspondiente, quita su bloque en `z-final.html`, y
reengancha los enlaces "Siguiente" de las preguntas contiguas para
que no quede ningún hueco en la cadena.

**¿Puedo cambiar el orden de las preguntas?**
Sí, aunque los archivos se llamen `test-1.html`, `test-2.html`... el
número del nombre no importa para el funcionamiento — lo que define
el orden real es a qué apunta cada botón "Siguiente". Eso sí: es
recomendable mantener los nombres de archivo y los `data-question`
ordenados para que el proyecto sea fácil de entender más adelante.

**¿Qué pasa si me olvido de poner `data-correct="true"` en una respuesta?**
Esa pregunta se contará siempre como fallada (nunca se le puede
acertar), pero el resto del sitio seguirá funcionando con
normalidad. Revísalo si una puntuación no cuadra con lo esperado.

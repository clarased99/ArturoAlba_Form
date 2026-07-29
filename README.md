# La Fórmula del Saber — Quiz Arturo Alba

Test interactivo de sobre los productos de Arturo Alba. El usuario responde
5 preguntas y al final ve una puntuación (X/5) junto con un mensaje de
marca según su resultado, y el detalle de qué respondió bien o mal.

No tiene backend ni base de datos: todo funciona con HTML, CSS y
JavaScript puro, sin frameworks ni pasos de compilación. Se puede abrir
directamente en un navegador o desplegar en cualquier hosting estático
(actualmente en Vercel, conectado a este repositorio de GitHub).

## Estructura del proyecto

```
├── index.html              Landing ("LA FÓRMULA DEL SABER")
├── test-1.html              Pregunta 1 — plantilla "imagen a la derecha"
├── test-2.html              Pregunta 2 — plantilla "imagen a la izquierda"
├── test-3.html              Pregunta 3 — plantilla "4 imágenes de respuesta"
├── test-4.html              Pregunta 4 — plantilla "imagen a la derecha"
├── test-5.html              Pregunta 5 — plantilla "imagen a la izquierda"
├── z-final.html             Página de resultados
├── css/
│   └── main.css             Todos los estilos del sitio, en un único archivo
├── js/
│   ├── quiz.js               Lógica compartida de las páginas de pregunta
│   └── results.js            Cálculo de la puntuación y mensajes finales
└── assets/
    ├── fonts/                Optima-Regular.woff2, Silka-Regular.woff2
    └── images/                Fotos de producto, fondos, favicon
```

`main.css` está organizado en bloques con comentarios: reset, fuentes,
landing, quiz (preguntas), y resultados. Cada bloque incluye su propia
sección `@media` para el diseño en móvil.

## Cómo funciona

1. **`index.html`** — pantalla de bienvenida, enlaza a `test-1.html`.
2. **`test-1.html` a `test-5.html`** — una pregunta por página. Al
   seleccionar una respuesta, `js/quiz.js`:
   - marca la opción elegida visualmente,
   - la guarda en `sessionStorage` (memoria temporal del navegador,
     se borra al cerrar la pestaña) con la clave `respuesta-N` (por
     ejemplo `respuesta-1`, `respuesta-2`...),
   - desbloquea el botón para pasar a la siguiente pregunta.

   Cada página de pregunta es completamente independiente — no sabe
   nada de las demás, solo lee/escribe en `sessionStorage`.
3. **`z-final.html`** — al cargar, `js/results.js`:
   - busca en el HTML todos los bloques `.results__question-block`
     (uno por pregunta),
   - por cada uno, lee la respuesta guardada en `sessionStorage` y la
     compara con la marcada como correcta (`data-correct="true"` en
     el HTML, invisible para el usuario),
   - calcula la puntuación total y el número de preguntas (contando
     los bloques que hay, no un número fijo),
   - elige un mensaje de marca según el resultado y lo escribe en
     pantalla,
   - pinta en verde la respuesta correcta de cada pregunta, y en rojo
     tachado la que marcó el usuario si falló.

**Ninguna de estas páginas depende de un número fijo de preguntas.**
El propio código cuenta cuántas hay y ajusta la puntuación (`X/5`,
`X/6`...) y los mensajes de resultado automáticamente. Esto es
importante para quien vaya a añadir preguntas nuevas — ver el
documento `CÓMO-AÑADIR-UNA-PREGUNTA.md`.

## Fuentes de marca

Las tipografías (`Optima` y `Silka`) están en `assets/fonts/` como
`.woff2`, el único formato que funciona de forma fiable en todos los
navegadores. Si en algún momento se necesita otro peso (negrita,
cursiva...) hay que extraerlo del archivo `.ttc`/`.otf` original y
convertirlo a `.woff2` — actualmente solo está la variante Regular de
cada una.

## Colores de marca

- Naranja: `#ff6b00`
- Negro/marrón oscuro: `#302e2b`

En el CSS de las preguntas se usa como variable `--accent`, definida
por cada pregunta (`body.quiz--q1`, `body.quiz--q2`...) — así, si en
el futuro una pregunta necesita un color de acento distinto, solo hay
que cambiar esa variable, sin tocar el resto del CSS.

## Cómo verlo en local

No hace falta instalar nada: se puede abrir `index.html` directamente
haciendo doble clic, o servirlo con cualquier servidor estático
(por ejemplo, la extensión "Live Server" de VS Code, o
`npx serve` desde una terminal si se tiene Node instalado).

## Despliegue

El proyecto está conectado a Vercel a través de este repositorio de
GitHub. Cualquier cambio subido (`git push`) a la rama principal se
despliega automáticamente en unos minutos — no hace falta ninguna
configuración adicional ni build.

## Compatibilidad

El sitio usa `min()`, `clamp()`, CSS Grid y `dvh`/`svh` — todas
soportadas en navegadores modernos. Se evita deliberadamente el
selector `:has()` en las reglas críticas de la landing por
compatibilidad con versiones algo antiguas de Safari/iOS.

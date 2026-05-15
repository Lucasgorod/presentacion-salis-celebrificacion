# Presentación web "Sono Silvia, non Giorgia" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir una presentación web (reveal.js, estática, sin build) de 15 escenas que aplica el marco de celebrificación de Quevedo-Redondo & Portalés-Oliva (2017) al caso Silvia Salis, para exponer en vivo y publicar en GitHub Pages.

**Architecture:** Sitio estático: `index.html` con 15 `<section>` de reveal.js; `css/theme.css` implementa el sistema visual sobrio↔detonante y el modelo de slide (título plano + cita atribuida + bullets + medio); `js/deck.js` inicializa reveal y gestiona fallback de embeds. reveal.js se carga vendorizado en `vendor/` (sin CDN para funcionar offline en el aula). Medios embebidos desde la fuente con respaldo descargado en `assets/`.

**Tech Stack:** HTML5, CSS3 (custom, sin framework), JavaScript vanilla, reveal.js 5.x (vendorizado), GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-05-15-presentacion-salis-celebrificacion-web-design.md`

**Idioma del contenido:** español (España/rioplatense neutro). Las citas en italiano se mantienen en italiano con traducción entre paréntesis la primera vez.

---

## Convenciones de verificación (este proyecto no tiene framework de tests)

No hay tests unitarios: es un deck estático. "Verificar" significa servir el sitio y comprobar render, navegación y consola.

- **Servidor local** (los `<iframe>` de embeds no funcionan con `file://`): desde la raíz del repo ejecutar `python -m http.server 8000` (o `npx --yes serve -l 8000`). Abrir `http://localhost:8000`.
- **Consola limpia:** abrir DevTools (F12) → pestaña Console. "Sin errores" = ningún error rojo (los warnings de terceros de embeds se documentan, no bloquean).
- **Navegación:** flechas ←/→ avanzan/retroceden; `F` pantalla completa; `ESC` overview; `S` vista de orador.
- **Sourcing de medios e imágenes:** usar la extensión Claude in Chrome o WebSearch para localizar URLs en fuentes confiables (Wikimedia Commons, canales oficiales del Comune di Genova / cuentas oficiales de Salis, agencias y medios de referencia). Registrar cada activo en `assets/CREDITS.md` con URL, autor/fuente, fecha y licencia/uso antes de usarlo.
- **Commits frecuentes:** un commit al final de cada tarea. Autoría: `git -c user.email="lucasgorod@gmail.com" -c user.name="Lucas" commit`. No hacer `git push` (lo decide la usuaria).

---

## File Structure

```
index.html                 Deck reveal.js: 15 <section> escenas
css/theme.css              Tokens, tipografía, modelo de slide, registros sobrio/detonante, gráfico
js/deck.js                 Init reveal.js + fallback de embeds (poster + enlace)
js/dichotomies.js          Datos y render del gráfico de las seis dicotomías
assets/fonts/              Tipografías .woff2 locales (sin Google Fonts)
assets/img/                Imágenes de Salis + posters de respaldo
assets/media/              Solo medios NO embebibles descargados
assets/CREDITS.md          Atribución de cada medio/imagen (autor, fuente, URL, licencia)
vendor/reveal/             reveal.js 5.x vendorizado (reveal.css, reveal.js, theme base mínimo)
README.md                  Qué es + cómo servir local + cómo publicar en GitHub Pages
docs/superpowers/specs/    Spec (ya commiteado)
docs/superpowers/plans/    Este plan
.gitignore                 Ya creado (ignora .superpowers/, *.pdf, guion, OS)
```

Cada archivo tiene una responsabilidad única. `index.html` solo estructura/contenido; estilo en `theme.css`; comportamiento en `deck.js`/`dichotomies.js`.

---

## Task 1: Scaffold del proyecto y reveal.js vendorizado

**Files:**
- Create: `index.html`, `css/theme.css`, `js/deck.js`, `README.md`, `assets/CREDITS.md`
- Create (descargados): `vendor/reveal/reveal.css`, `vendor/reveal/reveal.js`

- [ ] **Step 1: Crear estructura de carpetas**

Run desde la raíz del repo:
```bash
mkdir -p css js vendor/reveal assets/fonts assets/img assets/media
```

- [ ] **Step 2: Vendorizar reveal.js 5.x**

Descargar las dos piezas a `vendor/reveal/` (versión fija 5.1.0):
```bash
curl -L -o vendor/reveal/reveal.css https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.css
curl -L -o vendor/reveal/reveal.js  https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.js
```
Expected: ambos archivos > 10 KB. Verificar: `ls -la vendor/reveal/` muestra `reveal.css` y `reveal.js` con tamaño no nulo.

- [ ] **Step 3: Crear `index.html` esqueleto con las 15 secciones vacías rotuladas**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sono Silvia, non Giorgia — Celebrificación política (MUCIP, US)</title>
  <link rel="stylesheet" href="vendor/reveal/reveal.css">
  <link rel="stylesheet" href="css/theme.css">
</head>
<body>
  <div class="reveal">
    <div class="slides">
      <section data-scene="01" class="scene scene--detonante"><h2 class="s-title">01 Apertura</h2></section>
      <section data-scene="02" class="scene scene--sober"><h2 class="s-title">02 Hoja de ruta</h2></section>
      <section data-scene="03" class="scene scene--sober"><h2 class="s-title">03 Sartori</h2></section>
      <section data-scene="04" class="scene scene--sober"><h2 class="s-title">04 Seis dicotomías</h2></section>
      <section data-scene="05" class="scene scene--sober"><h2 class="s-title">05 Italia + Salis</h2></section>
      <section data-scene="06" class="scene scene--detonante"><h2 class="s-title">06 Discurso de victoria</h2></section>
      <section data-scene="07" class="scene scene--sober"><h2 class="s-title">07 Instagram</h2></section>
      <section data-scene="08" class="scene scene--sober"><h2 class="s-title">08 Barrio y aros</h2></section>
      <section data-scene="09" class="scene scene--detonante"><h2 class="s-title">09 La rave</h2></section>
      <section data-scene="10" class="scene scene--detonante"><h2 class="s-title">10 TikTok</h2></section>
      <section data-scene="11" class="scene scene--detonante"><h2 class="s-title">11 Críticas y género</h2></section>
      <section data-scene="12" class="scene scene--detonante"><h2 class="s-title">12 Silvia vs Giorgia</h2></section>
      <section data-scene="13" class="scene scene--detonante"><h2 class="s-title">13 Aparición programada</h2></section>
      <section data-scene="14" class="scene scene--sober"><h2 class="s-title">14 Tres ideas</h2></section>
      <section data-scene="15" class="scene scene--detonante"><h2 class="s-title">15 Debate</h2></section>
    </div>
  </div>
  <script src="vendor/reveal/reveal.js"></script>
  <script src="js/dichotomies.js"></script>
  <script src="js/deck.js"></script>
</body>
</html>
```

- [ ] **Step 4: Crear `js/deck.js` con init mínimo**

```js
/* Inicializa reveal.js. El fallback de embeds se añade en la Task 11. */
Reveal.initialize({
  width: 1280,
  height: 720,           // 16:9
  margin: 0.04,
  hash: true,
  slideNumber: 'c/t',
  transition: 'fade',
  controls: true,
  progress: true,
});
```

- [ ] **Step 5: Crear `css/theme.css` con reset mínimo (se completa en Task 2)**

```css
:root{ --bg-sober:#15151c; --ink:#f4f4f8; --accent:#ff2db8; }
.reveal{ font-family:system-ui, Arial, sans-serif; }
.reveal .slides section.scene{ text-align:left; }
.s-title{ font-weight:800; letter-spacing:-.5px; }
```

- [ ] **Step 6: Crear `README.md` y `assets/CREDITS.md` base**

`README.md`:
```markdown
# Sono Silvia, non Giorgia

Presentación web (reveal.js, estática) — Publicidad Política, MUCIP, Universidad de Sevilla.

## Ver en local
Servir desde la raíz (los embeds necesitan http):
`python -m http.server 8000` y abrir http://localhost:8000

## Publicar en GitHub Pages
1. Crear repo en GitHub y `git remote add origin <url>`.
2. `git push -u origin main`.
3. GitHub → Settings → Pages → Source: `main` / root. La URL queda publicada.

Navegación: ←/→ avanzar, F pantalla completa, S vista de orador, ESC overview.
```

`assets/CREDITS.md`:
```markdown
# Créditos de medios

Cada activo embebido o descargado se registra aquí antes de usarse.

| Escena | Activo | Tipo | Fuente / autor | URL | Fecha | Licencia / uso |
|--------|--------|------|----------------|-----|-------|----------------|
```

- [ ] **Step 7: Verificar**

Run: `python -m http.server 8000` y abrir `http://localhost:8000`.
Expected: se ven 15 slides navegables con flechas; cada una muestra su rótulo "NN ...". Consola sin errores. `ESC` muestra el overview con 15 miniaturas.

- [ ] **Step 8: Commit**

```bash
git add index.html css/theme.css js/deck.js README.md assets/CREDITS.md vendor/reveal/reveal.css vendor/reveal/reveal.js
git -c user.email="lucasgorod@gmail.com" -c user.name="Lucas" commit -m "feat: scaffold reveal.js vendorizado + 15 escenas rotuladas"
```

---

## Task 2: Sistema de diseño (theme.css) y modelo de slide

**Files:**
- Modify: `css/theme.css` (reemplazo completo)
- Modify: `index.html` (añadir una escena de prueba temporal y quitarla al final del task)

- [ ] **Step 1: Escribir `css/theme.css` completo**

```css
:root{
  --bg-sober:#15151c;
  --bg-sober-2:#1b1b24;
  --ink:#f4f4f8;
  --ink-dim:#b4b4c0;
  --ink-faint:#7a7a88;
  --accent:#ff2db8;
  --violet:#7b2ff7;
  --rule:#2a2a36;
  --grad-detonante:linear-gradient(155deg,#ff2db8 0%,#7b2ff7 55%,#1a0f2e 100%);
  --font-sans:"Inter", system-ui, Arial, sans-serif;
  --font-serif:"Newsreader", Georgia, "Times New Roman", serif;
}
@font-face{font-family:"Inter";src:url("../assets/fonts/Inter.woff2") format("woff2");font-weight:300 800;font-display:swap}
@font-face{font-family:"Newsreader";src:url("../assets/fonts/Newsreader-Italic.woff2") format("woff2");font-style:italic;font-display:swap}

.reveal{font-family:var(--font-sans);color:var(--ink)}
.reveal .slides{text-align:left}
.reveal .slides section.scene{height:720px;padding:56px 64px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center}

/* Registro sobrio */
.scene--sober{background:var(--bg-sober)}

/* Registro detonante */
.scene--detonante{background:var(--grad-detonante);color:#fff}
.scene--detonante::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 70% 25%,rgba(255,255,255,.18),transparent 55%);pointer-events:none}

/* Modelo de slide */
.s-kicker{font-size:14px;letter-spacing:3px;text-transform:uppercase;color:var(--ink-faint);margin:0 0 14px}
.scene--detonante .s-kicker{color:rgba(255,255,255,.8)}
.s-title{font-size:46px;line-height:1.06;font-weight:800;letter-spacing:-1px;margin:0 0 24px}
.s-title .muted{color:var(--ink-faint);font-weight:600}
.scene--detonante .s-title .muted{color:rgba(255,255,255,.7)}
.s-quote{font-family:var(--font-serif);font-style:italic;font-size:26px;line-height:1.4;border-left:4px solid var(--accent);padding-left:20px;margin:0 0 14px;max-width:60ch}
.scene--detonante .s-quote{border-left-color:#fff}
.s-cite{font-size:14px;color:var(--ink-faint);margin:0 0 26px}
.scene--detonante .s-cite{color:rgba(255,255,255,.75)}
.s-cite .verify{color:var(--accent)}
.s-bullets{list-style:none;padding:0;margin:0;font-size:20px;line-height:1.85;color:var(--ink-dim)}
.scene--detonante .s-bullets{color:rgba(255,255,255,.95)}
.s-bullets li{padding-left:22px;position:relative}
.s-bullets li::before{content:"";position:absolute;left:0;top:13px;width:8px;height:2px;background:var(--accent)}
.s-foot{position:absolute;left:64px;bottom:26px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--ink-faint)}

/* Zona de medios */
.s-media{margin:0 0 22px;border-radius:10px;overflow:hidden;background:#000}
.s-media iframe,.s-media img,.s-media video{display:block;width:100%;border:0}
.s-media--bleed{position:absolute;inset:0;margin:0;border-radius:0;z-index:0}
.s-media--bleed iframe,.s-media--bleed img,.s-media--bleed video{width:100%;height:100%;object-fit:cover}
.scene .s-over{position:relative;z-index:1}
.scene--bleedwrap{padding:0;justify-content:flex-end}
.scene--bleedwrap .s-over{padding:56px 64px;background:linear-gradient(0deg,rgba(8,4,16,.86),transparent)}

/* Split sobrio↔caso (para escenas del núcleo con comparativa) */
.s-split{display:grid;grid-template-columns:1.1fr 1fr;gap:32px;align-items:center}

/* Fallback de embed (Task 11) */
.embed-fallback{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;min-height:340px;background:#0c0c12;color:var(--ink-dim);text-align:center;padding:24px}
.embed-fallback a{color:var(--accent)}

/* Gráfico de las seis dicotomías (Task 6) */
.chart{display:flex;flex-direction:column;gap:10px;margin:8px 0 20px}
.chart-row{display:grid;grid-template-columns:230px 1fr;align-items:center;gap:14px;font-size:15px;color:var(--ink-dim)}
.chart-track{position:relative;height:22px;background:var(--bg-sober-2);border-radius:4px;overflow:hidden}
.chart-fill{position:absolute;inset:0 auto 0 0;background:linear-gradient(90deg,var(--accent),var(--violet));width:0;transition:width 1s ease}
.chart-fill .pct{position:absolute;right:8px;top:50%;transform:translateY(-50%);font-size:12px;color:#fff;font-weight:700}
.chart-row.is-key .chart-fill{box-shadow:0 0 0 2px var(--accent)}

@media print{ .scene--detonante::after{display:none} }
```

- [ ] **Step 2: Añadir tipografías locales**

Descargar dos `.woff2` de fuentes con licencia abierta (SIL OFL): Inter y Newsreader (itálica para citas).
```bash
curl -L -o assets/fonts/Inter.woff2 "https://cdn.jsdelivr.net/npm/@fontsource/inter@5/files/inter-latin-400-normal.woff2"
curl -L -o assets/fonts/Newsreader-Italic.woff2 "https://cdn.jsdelivr.net/npm/@fontsource/newsreader@5/files/newsreader-latin-400-italic.woff2"
```
Expected: ambos `.woff2` > 5 KB. Registrar en `CREDITS.md` (Inter y Newsreader, SIL OFL, fontsource).

- [ ] **Step 3: Añadir escena de prueba TEMPORAL al final de `index.html`**

Antes de `</div></div>` (cierre de `.slides`/`.reveal`) añadir, para validar el modelo en ambos registros:
```html
<section data-scene="TEST-S" class="scene scene--sober">
  <p class="s-kicker">Prueba sobrio</p>
  <h2 class="s-title">Título plano de prueba</h2>
  <p class="s-quote">«Cita de prueba para validar el bloque de cita.»</p>
  <p class="s-cite">Autor (2017) · <span class="verify">verificar literalidad</span></p>
  <ul class="s-bullets"><li>Bullet uno</li><li>Bullet dos</li><li>Bullet tres</li></ul>
  <p class="s-foot">Publicidad Política · MUCIP · Universidad de Sevilla</p>
</section>
<section data-scene="TEST-D" class="scene scene--detonante scene--bleedwrap">
  <div class="s-media s-media--bleed"><img src="assets/img/placeholder.jpg" alt=""></div>
  <div class="s-over">
    <h2 class="s-title">Detonante de prueba</h2>
    <p class="s-quote">«Cita en registro detonante.»</p>
    <p class="s-cite">Fuente (2026)</p>
    <ul class="s-bullets"><li>Punto A</li><li>Punto B</li></ul>
  </div>
</section>
```
Crear un placeholder: `curl -L -o assets/img/placeholder.jpg "https://placehold.co/1280x720/1a0f2e/ffffff.jpg"`.

- [ ] **Step 4: Verificar ambos registros**

Run: `python -m http.server 8000`, abrir `http://localhost:8000`, navegar a las dos últimas slides (TEST-S y TEST-D).
Expected: TEST-S fondo carbón, título grande, cita con barra magenta y serif itálica, "verificar literalidad" en magenta, bullets con guion magenta, pie abajo. TEST-D fondo gradiente magenta→violeta con imagen full-bleed cubierta por degradado oscuro y texto legible encima. Sin scroll dentro de la slide (entra en 1280×720). Consola sin errores.

- [ ] **Step 5: Quitar las escenas de prueba**

Eliminar de `index.html` las dos `<section data-scene="TEST-S">` y `<section data-scene="TEST-D">`. Dejar `assets/img/placeholder.jpg` (se reutiliza como poster de respaldo neutro).

- [ ] **Step 6: Commit**

```bash
git add css/theme.css assets/fonts assets/img/placeholder.jpg index.html assets/CREDITS.md
git -c user.email="lucasgorod@gmail.com" -c user.name="Lucas" commit -m "feat: sistema de diseño sobrio/detonante y modelo de slide"
```

---

## Task 3: Verificar literalidad de citas y datos contra el PDF del paper

El PDF está en la raíz (gitignored): `Imagen y comunicación política en Instagram. Celebrificación de los candidatos a la presidencia del Gobierno.pdf`. La spec exige verificar literalidad antes de dar citas por definitivas.

**Files:**
- Create: `docs/superpowers/plans/quotes-verified.md` (notas de trabajo para las tareas de escenas; se versiona como doc de proyecto, citas breves de uso académico)

- [ ] **Step 1: Leer el PDF y localizar los textos**

Usar la herramienta Read sobre el PDF (parámetro `pages` si hace falta). Localizar y transcribir literalmente:
1. La **definición de celebrificación** de las autoras.
2. La frase sobre **Sartori** ("lo que se ve" / homo videns) tal como la citan.
3. La frase del paper sobre la **apelación emocional vs. petición de voto** (el dato del ~7×).
4. Los **porcentajes exactos** de las seis dicotomías (confirmar contra la tabla del guion: 1) 34,5/65,5 · 2) 53,2/46,8 · 3) 39,7/60,3 · 4) 54,1/45,9 · 5) 17,3/82,7 · 6) 70,6/29,4) y el N de publicaciones (885) y candidatos.

- [ ] **Step 2: Escribir `quotes-verified.md`**

Formato por entrada:
```markdown
## Cita: definición de celebrificación
- Texto literal: "…"  (pág. N)
- Atribución: Quevedo-Redondo & Portalés-Oliva (2017), p. N
- Estado: VERIFICADA | PARÁFRASIS (si no aparece literal, marcar como paráfrasis atribuida)
```
Repetir para las 4 entradas. Para datos numéricos, anotar la cifra exacta del PDF y si coincide con el guion.

- [ ] **Step 3: Verificar**

Expected: `quotes-verified.md` tiene 4 entradas, cada una con texto literal o marca PARÁFRASIS y página. Cualquier discrepancia numérica con el guion queda anotada (mandan los números del PDF).

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/plans/quotes-verified.md
git -c user.email="lucasgorod@gmail.com" -c user.name="Lucas" commit -m "docs: verificación de citas y datos contra el PDF del paper"
```

---

## Task 4: Sourcing de medios e imágenes de Salis (fuentes confiables)

**Files:**
- Modify: `assets/CREDITS.md`
- Create (descargas de respaldo): archivos en `assets/img/` y `assets/media/`

Activos necesarios (uno por fila en CREDITS.md). Para cada uno: buscar con WebSearch / Claude in Chrome la URL canónica en fuente confiable; preferir Wikimedia Commons y canales oficiales (Comune di Genova, cuenta oficial de Salis) por licencia limpia; prensa de referencia con crédito como respaldo.

| Escena | Activo | Preferencia |
|--------|--------|-------------|
| 01, 09 | Video de la rave de Plaza Matteotti (11/04/2026) | Embed YouTube oficial/medio; si no embebible, descargar clip corto a `assets/media/rave.mp4` |
| 01, 09 | Foto aérea de la plaza llena (poster/fallback) | Wikimedia / agencia con crédito → `assets/img/rave.jpg` |
| 05, 12 | Retrato de Giorgia Meloni | Wikimedia Commons (oficial gobierno) → `assets/img/meloni.jpg` |
| 05, 07, 08, 12 | Retrato(s) de Silvia Salis | Wikimedia Commons / Comune di Genova → `assets/img/salis.jpg`, `assets/img/salis-barrio.jpg` |
| 06 | Video del discurso de victoria (mayo 2025) | Embed YouTube/medio |
| 07 | Post de Instagram @silvia_salis | Embed oficial de Instagram (blockquote/iframe) |
| 10 | Cuenta/clip de TikTok de Salis | Embed oficial de TikTok |
| 11 | Pieza de prensa sobre la crítica "Barbie" | Embed de artículo/tuit o captura con crédito → `assets/img/critica.jpg` |

- [ ] **Step 1: Localizar y registrar cada activo**

Para cada fila: obtener URL de embed o de descarga desde fuente confiable. Añadir fila a la tabla de `assets/CREDITS.md` con: Escena, Activo, Tipo (embed/descarga), Fuente/autor, URL, Fecha, Licencia/uso. Si una imagen no tiene licencia compatible con repo público, buscar alternativa en Wikimedia o usar `assets/img/placeholder.jpg` como respaldo y anotarlo.

- [ ] **Step 2: Descargar respaldos no embebibles**

Descargar a `assets/img/` y `assets/media/` solo lo que no se pueda embeber o sirva de poster de fallback. Mantener nombres de la tabla anterior. Verificar que cada archivo descargado abre (tamaño no nulo, imagen válida).

- [ ] **Step 3: Verificar**

Expected: `assets/CREDITS.md` tiene una fila por cada activo con licencia/uso explícito. Todo archivo en `assets/img|media` tiene su fila. Ninguna imagen sin atribución.

- [ ] **Step 4: Commit**

```bash
git add assets/CREDITS.md assets/img assets/media
git -c user.email="lucasgorod@gmail.com" -c user.name="Lucas" commit -m "feat: medios e imágenes de Salis con créditos (fuentes confiables)"
```

---

## Task 5: Bloque Apertura — escenas 01 y 02

**Files:** Modify `index.html` (reemplazar las `<section data-scene="01">` y `="02">`)

> Reemplazá el medio embebido por el `<iframe>`/`<img>` real según `CREDITS.md`. Donde haya `data-embed-fallback`, la Task 11 añade el comportamiento; el atributo debe quedar puesto ya.

- [ ] **Step 1: Escena 01 — Apertura detonante (título desnudo + rave)**

```html
<section data-scene="01" class="scene scene--detonante scene--bleedwrap">
  <div class="s-media s-media--bleed">
    <iframe src="ABOUT_RAVE_EMBED_URL" title="Rave en Plaza Matteotti, Génova, 11 abr. 2026"
            data-embed-fallback="assets/img/rave.jpg"
            data-embed-source="URL_FUENTE_RAVE" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>
  <div class="s-over">
    <h2 class="s-title">Sono Silvia, <span class="muted">non Giorgia</span></h2>
    <p class="fragment s-quote" style="border-color:#fff">¿Concierto, mitin, o las dos cosas a la vez?</p>
    <p class="s-cite">Plaza Matteotti, Génova · 11 de abril de 2026</p>
  </div>
</section>
```
Sustituir `ABOUT_RAVE_EMBED_URL` y `URL_FUENTE_RAVE` por los valores de `CREDITS.md` (escena 01). Si el video no es embebible, usar `<img src="assets/img/rave.jpg" alt="Plaza Matteotti llena durante la rave">` dentro de `.s-media--bleed` en vez del iframe.

- [ ] **Step 2: Escena 02 — Hoja de ruta (sobrio)**

```html
<section data-scene="02" class="scene scene--sober">
  <p class="s-kicker">Hoja de ruta</p>
  <h2 class="s-title">Qué responde esta presentación</h2>
  <ul class="s-bullets">
    <li class="fragment">Qué dice el marco español de 2017 sobre cómo los políticos construyen su imagen.</li>
    <li class="fragment">Cómo lo aplica una alcaldesa italiana en 2025-2026.</li>
    <li class="fragment">Qué se nos escapa hoy si solo usamos ese marco.</li>
  </ul>
  <p class="s-foot">Publicidad Política · MUCIP · Universidad de Sevilla</p>
</section>
```

- [ ] **Step 3: Verificar**

Run servidor; ir a escenas 01-02. Expected: 01 muestra el medio a sangre con el título encima; al avanzar aparece la pregunta como fragment; sin scroll. 02 sobria, los 3 puntos aparecen uno a uno. Consola sin errores (si el embed aún no resuelve, se arregla en Task 11; anotarlo, no bloquea).

- [ ] **Step 4: Commit**

```bash
git add index.html
git -c user.email="lucasgorod@gmail.com" -c user.name="Lucas" commit -m "feat: escenas 01-02 (apertura y hoja de ruta)"
```

---

## Task 6: Bloque Marco — escenas 03 y 04 (incluye gráfico de dicotomías)

**Files:**
- Create: `js/dichotomies.js`
- Modify: `index.html` (escenas 03 y 04)

Usar los textos/datos de `quotes-verified.md` (Task 3). Donde abajo aparezca una cita del paper, sustituir por el texto VERIFICADO; si quedó como PARÁFRASIS, cambiar `«…»` por redacción atribuida sin comillas y poner en `.s-cite` "paráfrasis de…".

- [ ] **Step 1: Escena 03 — Sartori → la imagen como mensaje (sobrio)**

```html
<section data-scene="03" class="scene scene--sober">
  <p class="s-kicker">El marco · punto de partida</p>
  <h2 class="s-title">De Sartori a la imagen como mensaje</h2>
  <p class="s-quote">«SARTORI_VERIFICADO»</p>
  <p class="s-cite">Sartori, <em>Homo videns</em> (1998), citado en Quevedo-Redondo &amp; Portalés-Oliva (2017) · <span class="verify">según Task 3</span></p>
  <ul class="s-bullets">
    <li>En televisión, lo que se ve pesa más que lo que se entiende.</li>
    <li>En redes, la foto no acompaña al mensaje político: <strong>es</strong> el mensaje.</li>
    <li>Celebrificación: doble cara del político, lo extraordinario y lo ordinario.</li>
  </ul>
  <p class="s-foot">Publicidad Política · MUCIP · Universidad de Sevilla</p>
</section>
```

- [ ] **Step 2: `js/dichotomies.js` — datos y render del gráfico**

```js
/* Las seis dicotomías (Quevedo-Redondo & Portalés-Oliva, 2017).
   Confirmar cifras contra quotes-verified.md (Task 3) antes de dar por bueno. */
window.DICHOTOMIES = [
  { label: "1. Estadista vs. populista",        ordinario: 65.5 },
  { label: "2. Institucional vs. cotidiano",    ordinario: 46.8 },
  { label: "3. Indumentaria formal vs. informal", ordinario: 60.3 },
  { label: "4. Compañía política vs. ciudadana", ordinario: 45.9 },
  { label: "5. Apelación racional vs. emocional", ordinario: 82.7, key: true },
  { label: "6. Temática dura vs. blanda",        ordinario: 29.4 },
];
window.renderDichotomies = function (el) {
  el.innerHTML = "";
  window.DICHOTOMIES.forEach(function (d) {
    const row = document.createElement("div");
    row.className = "chart-row" + (d.key ? " is-key" : "");
    row.innerHTML = '<span>' + d.label + '</span>' +
      '<div class="chart-track"><div class="chart-fill"><span class="pct">' +
      d.ordinario.toString().replace(".", ",") + '%</span></div></div>';
    el.appendChild(row);
    requestAnimationFrame(function(){
      row.querySelector(".chart-fill").style.width = d.ordinario + "%";
    });
  });
};
```

- [ ] **Step 3: Escena 04 — Las seis dicotomías (sobrio, dato fuerte)**

```html
<section data-scene="04" class="scene scene--sober">
  <p class="s-kicker">El marco · la herramienta</p>
  <h2 class="s-title">Las seis dicotomías de la celebrificación</h2>
  <p class="s-quote">«DEFINICION_VERIFICADA»</p>
  <p class="s-cite">Quevedo-Redondo &amp; Portalés-Oliva (2017) · <span class="verify">según Task 3</span></p>
  <div class="chart" id="chart-dicotomias" data-render-on-show></div>
  <ul class="s-bullets">
    <li>885 publicaciones · 5 candidatos · 2015-2016 (% = registro "ordinario").</li>
    <li>La apelación emocional (82,7%) septuplica la petición explícita de voto.</li>
  </ul>
  <p class="s-foot">Publicidad Política · MUCIP · Universidad de Sevilla</p>
</section>
```

- [ ] **Step 4: Activar el render del gráfico al mostrarse la escena 04 (deck.js)**

Añadir al final de `js/deck.js`:
```js
Reveal.on('slidechanged', function (e) {
  const box = e.currentSlide.querySelector('[data-render-on-show]');
  if (box && !box.dataset.done) { window.renderDichotomies(box); box.dataset.done = "1"; }
});
Reveal.on('ready', function (e) {
  const box = e.currentSlide.querySelector('[data-render-on-show]');
  if (box && !box.dataset.done) { window.renderDichotomies(box); box.dataset.done = "1"; }
});
```

- [ ] **Step 5: Verificar**

Run servidor; ir a escena 04. Expected: al entrar, las 6 barras se animan creciendo a su % (etiqueta visible con coma decimal: "82,7%"); la fila 5 tiene contorno magenta. Escena 03 muestra cita + bullets. Consola sin errores.

- [ ] **Step 6: Commit**

```bash
git add js/dichotomies.js js/deck.js index.html
git -c user.email="lucasgorod@gmail.com" -c user.name="Lucas" commit -m "feat: escenas 03-04 marco + gráfico animado de las seis dicotomías"
```

---

## Task 7: Bloque Contexto — escena 05

**Files:** Modify `index.html` (escena 05)

- [ ] **Step 1: Escena 05 — Italia 2026 y la irrupción de Salis (sobrio, split)**

```html
<section data-scene="05" class="scene scene--sober">
  <p class="s-kicker">Contexto</p>
  <h2 class="s-title">Italia 2026 y la irrupción de Salis</h2>
  <div class="s-split">
    <div>
      <p class="s-quote">«Sono Giorgia, sono una madre, sono cristiana.»<br><span style="font-size:16px;color:var(--ink-faint)">(Soy Giorgia, soy madre, soy cristiana.)</span></p>
      <p class="s-cite">Giorgia Meloni, discurso viral, 2019 · <span class="verify">verificar fuente</span></p>
      <ul class="s-bullets">
        <li>Meloni, primera ministra desde octubre de 2022 (Fratelli d'Italia).</li>
        <li>Abril 2026: pierde un referéndum clave; cae su imagen de invencibilidad.</li>
        <li>La oposición de centroizquierda lleva años sin liderazgo unificador.</li>
      </ul>
    </div>
    <div>
      <img src="assets/img/salis.jpg" alt="Silvia Salis" style="border-radius:10px;width:100%">
      <ul class="s-bullets" style="margin-top:14px">
        <li>Salis: genovesa (1985), exatleta olímpica, ex-VP del Comité Olímpico Italiano.</li>
        <li>Mayo 2025: gana la alcaldía de Génova en primera vuelta (51,48%).</li>
        <li>Outsider con equipo profesional de comunicación: la naturalidad se diseña.</li>
      </ul>
    </div>
  </div>
  <p class="s-foot">Publicidad Política · MUCIP · Universidad de Sevilla</p>
</section>
```
Sustituir `assets/img/salis.jpg` si el nombre real en `CREDITS.md` difiere.

- [ ] **Step 2: Verificar**

Run servidor; escena 05. Expected: dos columnas equilibradas, cita Meloni con traducción, imagen de Salis a la derecha, bullets legibles, todo en 1280×720 sin scroll. Consola sin errores.

- [ ] **Step 3: Commit**

```bash
git add index.html
git -c user.email="lucasgorod@gmail.com" -c user.name="Lucas" commit -m "feat: escena 05 contexto Italia + perfil Salis"
```

---

## Task 8: Núcleo A — escenas 06, 07, 08, 09

**Files:** Modify `index.html` (escenas 06-09)

- [ ] **Step 1: Escena 06 — El discurso de victoria (detonante)**

```html
<section data-scene="06" class="scene scene--detonante">
  <p class="s-kicker">Núcleo · momento</p>
  <h2 class="s-title">El discurso de victoria (26 may. 2025)</h2>
  <p class="s-quote">«Estaré entre la gente, para serviros, no para mandar.»</p>
  <p class="s-cite">Silvia Salis, discurso de victoria, mayo 2025 · <span class="verify">verificar fuente</span></p>
  <div class="s-media" style="max-width:760px">
    <iframe height="380" src="ABOUT_DISCURSO_EMBED_URL" title="Discurso de victoria de Salis"
            data-embed-fallback="assets/img/placeholder.jpg" data-embed-source="URL_FUENTE_DISCURSO"
            allowfullscreen></iframe>
  </div>
  <ul class="s-bullets"><li>Ancla → Dicotomía 5: la emoción como discurso de estilo, no sensiblería.</li></ul>
</section>
```
Sustituir las dos URLs por las de `CREDITS.md` (escena 06).

- [ ] **Step 2: Escena 07 — Instagram: el retrato curado (sobrio)**

```html
<section data-scene="07" class="scene scene--sober">
  <p class="s-kicker">Núcleo · momento</p>
  <h2 class="s-title">Instagram: el retrato curado (@silvia_salis)</h2>
  <div class="s-split">
    <div>
      <p class="s-quote">«La foto no acompaña al mensaje: es el mensaje.»</p>
      <p class="s-cite">Marco de Quevedo-Redondo &amp; Portalés-Oliva (2017) · paráfrasis atribuida</p>
      <ul class="s-bullets">
        <li>Ancla → Dicotomía 3: indumentaria y estética de alta producción.</li>
        <li>La imagen cuidada como marca personal: lo ordinario, diseñado.</li>
      </ul>
    </div>
    <div class="s-media">
      <iframe height="520" src="ABOUT_IG_EMBED_URL" title="Instagram de Silvia Salis"
              data-embed-fallback="assets/img/salis.jpg" data-embed-source="URL_FUENTE_IG" allowfullscreen></iframe>
    </div>
  </div>
  <p class="s-foot">Publicidad Política · MUCIP · Universidad de Sevilla</p>
</section>
```

- [ ] **Step 3: Escena 08 — Barrio, vecinos y los cinco aros (sobrio)**

```html
<section data-scene="08" class="scene scene--sober">
  <p class="s-kicker">Núcleo · momento</p>
  <h2 class="s-title">Barrio, vecinos y los cinco aros</h2>
  <div class="s-split">
    <div class="s-media"><img src="assets/img/salis-barrio.jpg" alt="Salis recorriendo un barrio de Génova"></div>
    <div>
      <p class="s-quote">«Infraestructuras sociales.»</p>
      <p class="s-cite">Expresión propia de Salis · <span class="verify">verificar fuente</span></p>
      <ul class="s-bullets">
        <li>Origen humilde; los cinco aros olímpicos tatuados como biografía visible.</li>
        <li>Ancla → Dicotomías 1 y 4: estadista↔populista y compañía ciudadana.</li>
        <li>Lo "duro" (obra pública) dicho en clave "blanda" (lo social).</li>
      </ul>
    </div>
  </div>
  <p class="s-foot">Publicidad Política · MUCIP · Universidad de Sevilla</p>
</section>
```

- [ ] **Step 4: Escena 09 — La rave de Plaza Matteotti (detonante fuerte, a sangre)**

```html
<section data-scene="09" class="scene scene--detonante scene--bleedwrap">
  <div class="s-media s-media--bleed">
    <iframe src="ABOUT_RAVE_EMBED_URL" title="Rave en Plaza Matteotti"
            data-embed-fallback="assets/img/rave.jpg" data-embed-source="URL_FUENTE_RAVE"
            allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>
  <div class="s-over">
    <h2 class="s-title">La rave de Plaza Matteotti (11 abr. 2026)</h2>
    <p class="s-quote" style="border-color:#fff">«Una plaza institucional convertida, por una noche, en pista de baile.»</p>
    <p class="s-cite">Crónica de prensa, abril 2026 · <span class="verify">verificar fuente</span></p>
    <ul class="s-bullets">
      <li>20.000 personas · Charlotte de Witte · la alcaldesa en el escenario.</li>
      <li>Ancla → Dicotomía 2 + Novedad 3: el evento masivo como dispositivo.</li>
      <li>Acto político con negabilidad plausible: "es solo un concierto".</li>
    </ul>
  </div>
</section>
```
Reusar la misma URL de embed de la rave que en escena 01 (`CREDITS.md`).

- [ ] **Step 5: Verificar**

Run servidor; recorrer 06→09. Expected: 06 y 09 detonante (gradiente/medio), 07 y 08 sobrias con split y `<img>` cargada; en 09 el medio cubre toda la slide con texto legible en el degradado inferior; el split de 07/08 no genera scroll. Consola sin errores (embeds pendientes de Task 11 documentados).

- [ ] **Step 6: Commit**

```bash
git add index.html
git -c user.email="lucasgorod@gmail.com" -c user.name="Lucas" commit -m "feat: escenas 06-09 (núcleo A: discurso, Instagram, barrio, rave)"
```

---

## Task 9: Núcleo B — escenas 10, 11, 12, 13

**Files:** Modify `index.html` (escenas 10-13)

- [ ] **Step 1: Escena 10 — TikTok (detonante)**

```html
<section data-scene="10" class="scene scene--detonante">
  <p class="s-kicker">Núcleo · lo que el marco no contempla</p>
  <h2 class="s-title">TikTok: hablar a los jóvenes "en su casa"</h2>
  <div class="s-split">
    <div>
      <p class="s-quote" style="border-color:#fff">«Para hablar a los jóvenes en su casa.»</p>
      <p class="s-cite">Salis sobre su TikTok (cuenta abierta 03/06/2025) · <span class="verify">verificar fuente</span></p>
      <ul class="s-bullets">
        <li>Novedad 1: el paper analiza Instagram; TikTok no existía fuera de China en 2017.</li>
        <li>Las seis dicotomías siguen; cambian los dispositivos que las producen.</li>
      </ul>
    </div>
    <div class="s-media">
      <iframe height="540" src="ABOUT_TIKTOK_EMBED_URL" title="TikTok de Silvia Salis"
              data-embed-fallback="assets/img/placeholder.jpg" data-embed-source="URL_FUENTE_TIKTOK" allowfullscreen></iframe>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Escena 11 — Críticas: "Barbie", Manolo Blahnik, el cuerpo (detonante)**

```html
<section data-scene="11" class="scene scene--detonante">
  <p class="s-kicker">Núcleo · lo que el marco no contempla</p>
  <h2 class="s-title">Las críticas: "Barbie", Manolo Blahnik, el cuerpo</h2>
  <p class="s-quote" style="border-color:#fff">«A las mujeres no nos llaman incapaces, nos llaman otra cosa.»</p>
  <p class="s-cite">Silvia Salis · <span class="verify">verificar fuente</span></p>
  <ul class="s-bullets">
    <li>Novedad 2: el género como variable estructural (los 5 candidatos del paper eran varones).</li>
    <li>Costes asimétricos: se la juzga por la indumentaria vista como vista.</li>
    <li>El cuerpo entra en la conversación pública antes que las decisiones.</li>
  </ul>
</section>
```

- [ ] **Step 3: Escena 12 — Silvia frente a Giorgia (detonante)**

```html
<section data-scene="12" class="scene scene--detonante">
  <p class="s-kicker">Núcleo · lo que el marco no contempla</p>
  <h2 class="s-title">Silvia frente a Giorgia</h2>
  <div class="s-split">
    <div style="text-align:center"><img src="assets/img/meloni.jpg" alt="Giorgia Meloni" style="width:62%;border-radius:10px">
      <p class="s-cite" style="margin-top:10px">«Sono Giorgia, sono madre, sono cristiana.»</p></div>
    <div style="text-align:center"><img src="assets/img/salis.jpg" alt="Silvia Salis" style="width:62%;border-radius:10px">
      <p class="s-cite" style="margin-top:10px">«Sono Silvia, non Giorgia.»</p></div>
  </div>
  <ul class="s-bullets" style="margin-top:16px">
    <li>La mujer en política, empujada a definirse frente a otra mujer.</li>
    <li>Novedad 2: una asimetría que el marco de 2017 no podía teorizar.</li>
  </ul>
</section>
```

- [ ] **Step 4: Escena 13 — La aparición programada (detonante, opcional)**

```html
<section data-scene="13" class="scene scene--detonante">
  <p class="s-kicker">Núcleo · la tesis · opcional</p>
  <h2 class="s-title">La aparición programada</h2>
  <p class="s-quote" style="border-color:#fff">«La familia aparece solo en los posts del domingo.»</p>
  <p class="s-cite">Rivista Studio, sobre la estrategia de Salis · <span class="verify">verificar fuente</span></p>
  <ul class="s-bullets">
    <li>Hay un calendario de aparición de cada personaje (familia, vecinos, DJs).</li>
    <li>La tesis de las autoras confirmada: la celebrificación es trabajo, no don.</li>
  </ul>
  <p class="s-foot" style="color:rgba(255,255,255,.7)">Escena opcional · comprimible para regular duración</p>
</section>
```

- [ ] **Step 5: Verificar**

Run servidor; recorrer 10→13. Expected: las 4 detonante; 10 y 12 con split (iframe / dos imágenes); 11 y 13 con cita grande + bullets; sin scroll; consola sin errores (embeds pendientes Task 11).

- [ ] **Step 6: Commit**

```bash
git add index.html
git -c user.email="lucasgorod@gmail.com" -c user.name="Lucas" commit -m "feat: escenas 10-13 (núcleo B: TikTok, género, Silvia vs Giorgia, calendario)"
```

---

## Task 10: Bloque Cierre — escenas 14 y 15

**Files:** Modify `index.html` (escenas 14-15)

- [ ] **Step 1: Escena 14 — Tres ideas para llevarse (sobrio)**

```html
<section data-scene="14" class="scene scene--sober">
  <p class="s-kicker">Cierre</p>
  <h2 class="s-title">Tres ideas para llevarse</h2>
  <ul class="s-bullets">
    <li class="fragment">El marco sigue vigente, pero es de 2017: le faltan TikTok, género y eventos masivos.</li>
    <li class="fragment">La "naturalidad" de Salis está profesionalmente diseñada: confirma la tesis, no la refuta.</li>
    <li class="fragment">Italia 2025-2027 anticipa lo que España puede vivir: actualizar el marco es el siguiente paso.</li>
  </ul>
  <p class="s-foot">Publicidad Política · MUCIP · Universidad de Sevilla</p>
</section>
```

- [ ] **Step 2: Escena 15 — Pregunta para el debate (detonante final)**

```html
<section data-scene="15" class="scene scene--detonante">
  <p class="s-kicker">Debate</p>
  <h2 class="s-title">¿Publicidad sin política,<br>o política sin publicidad?</h2>
  <p class="s-quote" style="border-color:#fff">En 2017, la apelación emocional septuplicaba la petición de voto. ¿Qué proporción veríamos hoy con TikTok, IA generativa de video y eventos masivos como dispositivos?</p>
  <p class="s-cite">Pregunta abierta — Quevedo-Redondo &amp; Portalés-Oliva (2017) como punto de partida</p>
</section>
```
(La escena 15 es la única donde el título es la pregunta misma: es una pregunta literal de debate, no un eslogan.)

- [ ] **Step 3: Verificar**

Run servidor; escenas 14-15. Expected: 14 sobria con 3 fragments; 15 detonante, cierre fuerte, queda bien en pantalla durante el debate. Consola sin errores.

- [ ] **Step 4: Commit**

```bash
git add index.html
git -c user.email="lucasgorod@gmail.com" -c user.name="Lucas" commit -m "feat: escenas 14-15 (cierre y pregunta de debate)"
```

---

## Task 11: Fallback de embeds (robustez sin internet)

**Files:** Modify `js/deck.js`

- [ ] **Step 1: Añadir gestión de fallback en `js/deck.js`**

Añadir al final:
```js
/* Si un iframe de embed no carga (sin internet / bloqueado), mostrar poster + enlace. */
function installEmbedFallbacks() {
  document.querySelectorAll('iframe[data-embed-fallback]').forEach(function (ifr) {
    var failed = false;
    function fail() {
      if (failed) return; failed = true;
      var wrap = document.createElement('div');
      wrap.className = 'embed-fallback';
      var img = ifr.getAttribute('data-embed-fallback');
      var src = ifr.getAttribute('data-embed-source') || '#';
      wrap.innerHTML = (img ? '<img src="'+img+'" alt="" style="max-width:100%;max-height:300px;border-radius:8px">' : '') +
        '<p>No se pudo cargar el contenido embebido.</p>' +
        '<p><a href="'+src+'" target="_blank" rel="noopener">Abrir la fuente original ↗</a></p>';
      ifr.replaceWith(wrap);
    }
    ifr.addEventListener('error', fail);
    // Timeout de seguridad: si en 6 s no terminó de cargar, asumir fallo.
    var t = setTimeout(function(){ try { if (!ifr.contentWindow) fail(); } catch(e){ fail(); } }, 6000);
    ifr.addEventListener('load', function(){ clearTimeout(t); });
  });
}
Reveal.on('ready', installEmbedFallbacks);
```

- [ ] **Step 2: Verificar el camino feliz**

Run servidor con internet; recorrer las escenas con embed (01/06/07/09/10 y 12 si aplica). Expected: los iframes cargan; no aparece `.embed-fallback`.

- [ ] **Step 3: Verificar el fallback**

Simular sin red: en DevTools → Network → throttling "Offline", recargar, ir a una escena con embed. Expected: tras ~6 s aparece el poster de respaldo + texto "No se pudo cargar…" + enlace "Abrir la fuente original" (apunta a `data-embed-source`). El layout no se rompe.

- [ ] **Step 4: Commit**

```bash
git add js/deck.js
git -c user.email="lucasgorod@gmail.com" -c user.name="Lucas" commit -m "feat: fallback de embeds (poster + enlace) para robustez offline"
```

---

## Task 12: Export a PDF, fuentes offline y formato de proyector

**Files:** Modify `README.md`

- [ ] **Step 1: Documentar el export a PDF en README**

Añadir sección:
```markdown
## Plan B sin internet (PDF)
Abrir `http://localhost:8000/?print-pdf`, luego imprimir a PDF desde el navegador
(Chrome: Ctrl+P → Destino "Guardar como PDF", Márgenes "Ninguno", activar
"Gráficos de fondo", tamaño Horizontal). Guardar como `presentacion.pdf`.
Sirve de respaldo si fallan los embeds o internet en el aula.
```

- [ ] **Step 2: Verificar export a PDF**

Abrir `http://localhost:8000/?print-pdf` y previsualizar impresión. Expected: cada escena ocupa una página apaisada; fondos sobrio/detonante visibles (con "Gráficos de fondo" activado); el gráfico de dicotomías se ve (barras a su % final); texto no recortado.

- [ ] **Step 3: Verificar fuentes offline**

DevTools → Network → Offline → recargar `http://localhost:8000`. Expected: títulos en Inter y citas en Newsreader itálica igual que online (las fuentes son locales en `assets/fonts/`). reveal.js también carga (vendorizado). Sin peticiones de red fallidas a Google Fonts ni CDN.

- [ ] **Step 4: Verificar formato 16:9**

Pantalla completa (`F`) en una pantalla/proyector 1920×1080 o ventana 16:9. Expected: sin franjas internas ni scroll; el contenido de cada escena entra completo en 1280×720 escalado.

- [ ] **Step 5: Commit**

```bash
git add README.md
git -c user.email="lucasgorod@gmail.com" -c user.name="Lucas" commit -m "docs: instrucciones de export PDF; verificación offline y 16:9"
```

---

## Task 13: Verificación final contra el spec y cierre

**Files:** Modify `assets/CREDITS.md` (si falta algo), `README.md`

- [ ] **Step 1: Checklist de aceptación (spec §12)**

Recorrer las 15 escenas en orden con teclado y confirmar:
- [ ] Las 15 escenas siguen el storyboard y el modelo de contenido (título plano + cita atribuida + bullets + medio donde aplica).
- [ ] Sistema sobrio↔detonante coherente; sin eslóganes; títulos planos (excepto escena 15, que es una pregunta literal de debate).
- [ ] Imágenes reales de Salis donde corresponde (05, 07, 08, 12), acreditadas en `CREDITS.md`.
- [ ] Navegación fluida; gráfico de dicotomías anima; fragments funcionan.
- [ ] Export `?print-pdf` correcto; fallback de embeds probado offline.
- [ ] `CREDITS.md` completo; citas con estado VERIFICADA o marcadas paráfrasis (cruzar con `quotes-verified.md`).
- [ ] Sirve como sitio estático sin build (`python -m http.server`).

- [ ] **Step 2: Corregir lo que falle**

Para cada ítem no cumplido, volver a la tarea correspondiente, corregir y re-verificar. No marcar el checklist hasta que pase de verdad.

- [ ] **Step 3: Confirmar higiene de repo público**

Run: `git status --porcelain --ignored | grep -E "Imagen y comunicaci|Guion_Salis|\.superpowers"`
Expected: esos paths aparecen como ignorados (`!!`), no trackeados. El PDF del paper y el guion NO están en el árbol de git.

- [ ] **Step 4: Commit final**

```bash
git add -A
git -c user.email="lucasgorod@gmail.com" -c user.name="Lucas" commit -m "chore: verificación final contra el spec; deck listo para exponer y publicar"
```

- [ ] **Step 5: Recordatorio de publicación (no ejecutar)**

Informar a la usuaria: el deck está listo. Para publicar en GitHub Pages debe crear el repo remoto y hacer `git push` ella misma (decisión suya, no la ejecuta el plan). Las instrucciones están en `README.md`.

---

## Self-Review (completado por el autor del plan)

**1. Cobertura del spec:**
- §1 objetivo → Goal/Task 5-10. §2 decisiones → reflejadas (stack Task 1, estilo Task 2, medios Task 4, copy en cada escena). §3 modelo de slide → Task 2 (componentes CSS) + cada escena. §4 storyboard 15 escenas → Tasks 5-10 (01-15, 13 marcada opcional). §5 sistema de diseño → Task 2 + gráfico Task 6. §6 arquitectura/estructura → Task 1; `.gitignore` ya existe; verificación de higiene Task 13 Step 3. §7 medios/imágenes → Task 4 + CREDITS. §8 robustez → Task 11 (fallback) + Task 12 (PDF/offline/16:9). §9 verificación → pasos de verificación por tarea + Task 13. §10 fuera de alcance → respetado (sin build, sin modo lectura). §11 riesgos → mitigados (offline Task 11/12, literalidad Task 3, copyright Task 13 Step 3, duración escena 13 opcional). §12 aceptación → Task 13 Step 1. Sin huecos.
- Citas: el spec exige verificación de literalidad → Task 3 produce `quotes-verified.md`; las escenas 03/04 referencian explícitamente esos textos; las demás citas llevan marca "verificar fuente" visible y se cierran en Task 13 Step 1.

**2. Placeholders:** Los tokens `ABOUT_*_EMBED_URL` y `URL_FUENTE_*` no son placeholders del plan: son variables cuyo valor concreto lo produce la Task 4 y se registra en `CREDITS.md`; cada escena indica explícitamente sustituirlos por la fila correspondiente. `SARTORI_VERIFICADO`/`DEFINICION_VERIFICADA` se resuelven con `quotes-verified.md` (Task 3), referenciado donde se usan. No hay "TODO/TBD" ni código incompleto.

**3. Consistencia de tipos/nombres:** Clases CSS (`.scene`, `.scene--sober`, `.scene--detonante`, `.scene--bleedwrap`, `.s-title`, `.s-quote`, `.s-cite`, `.s-bullets`, `.s-media`, `.s-media--bleed`, `.s-over`, `.s-split`, `.s-foot`, `.s-kicker`, `.chart`, `.embed-fallback`) definidas en Task 2/6 y usadas consistentemente en Tasks 5-10. API JS: `window.DICHOTOMIES`, `window.renderDichotomies(el)`, atributo `data-render-on-show`, `data-embed-fallback`/`data-embed-source` — coherentes entre `dichotomies.js` (Task 6), `deck.js` (Tasks 6 y 11) e `index.html`. reveal.js 5.1.0 fijo en Tasks 1 y referenciado igual en todo el plan.

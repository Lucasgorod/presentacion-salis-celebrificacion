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

## Plan B sin internet (PDF)
Si en el aula puede fallar internet (los videos/embeds se cargan en vivo),
exportá un PDF de respaldo antes de la charla:

1. Abrir `http://localhost:8000/?print-pdf`
2. Imprimir (Ctrl+P) → Destino **Guardar como PDF**
3. Márgenes **Ninguno**, activar **Gráficos de fondo**, orientación **Horizontal**
4. Guardar como `presentacion.pdf`

El PDF conserva el hilo, los textos y el gráfico; los embeds aparecen como
póster + enlace a la fuente (mismo fallback que en vivo sin conexión).

## Estructura
- `index.html` — 15 escenas (reveal.js)
- `css/theme.css` — sistema sobrio/detonante y modelo de slide
- `js/deck.js` — init + fallback de embeds · `js/dichotomies.js` — gráfico
- `assets/` — imágenes, tipografías locales y `CREDITS.md` (atribución)
- `vendor/reveal/` — reveal.js 5.1.0 vendorizado (funciona offline)
- `docs/superpowers/` — spec, plan y verificación de citas

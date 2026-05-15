# Sono Silvia, non Giorgia

Presentación web sobre celebrificación política y el caso Silvia Salis.
HTML/CSS/JavaScript propio, estático, sin frameworks — Publicidad Política, MUCIP, Universidad de Sevilla.

## Ver en local
Servir desde la raíz (los embeds necesitan http, no `file://`):

`python -m http.server 8000` y abrir http://localhost:8000

## Navegación
- ← / → · barra espaciadora · RePág/AvPág — avanzar y retroceder
- `F` — pantalla completa · `Inicio`/`Fin` — primera/última escena
- Clic en la mitad izquierda/derecha — retroceder/avanzar
- La URL guarda la escena (`#7`): se puede compartir o retomar

## Diseño
Lienzo fijo 1280×720 escalado a cualquier pantalla o proyector (16:9, sin desbordes).
Estética editorial "Dossier": Bodoni Moda, Newsreader e IBM Plex Mono (todas locales,
funciona offline), papel/tinta con un acento bermellón. 15 escenas; las animaciones son
solo una mejora (respetan `prefers-reduced-motion`; el contenido es visible sin ellas).

## Medios y robustez
Videos e imágenes embebidos desde la fuente oficial (YouTube, Instagram, TikTok) y
retratos con licencia libre (Wikimedia, ver `assets/CREDITS.md`). Si un embed no carga
(sin internet o bloqueado), se reemplaza por un póster con enlace a la fuente original.

## Plan B sin internet (PDF)
Antes de la charla, exportá un PDF de respaldo:

1. Abrir http://localhost:8000
2. Imprimir (Ctrl+P) → Destino **Guardar como PDF**
3. Orientación **Horizontal**, márgenes **Ninguno**, activar **Gráficos de fondo**
4. Guardar como `presentacion.pdf`

Cada escena ocupa una página; conserva el hilo, los textos, las citas y el gráfico.
Los embeds salen en blanco en el PDF (son el único contenido que depende de internet).

## Publicar en GitHub Pages
Ya publicado en https://lucasgorod.github.io/presentacion-salis-celebrificacion/
(Settings → Pages → `main` / root). Tras cada `git push` se actualiza en ~1-2 min.

## Estructura
- `index.html` — 15 escenas
- `css/theme.css` — sistema de diseño Dossier (incluye CSS de impresión)
- `js/deck.js` — motor: escalado, navegación, gráfico, fallback de embeds
- `assets/` — tipografías locales, imágenes y `CREDITS.md` (atribución)
- `docs/superpowers/` — spec, plan y verificación de citas

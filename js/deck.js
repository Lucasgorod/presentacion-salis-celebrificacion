/* Inicializa reveal.js. */
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

/* Render del gráfico de dicotomías al mostrarse su escena. */
function renderChartIn(slide) {
  if (!slide) return;
  var box = slide.querySelector('[data-render-on-show]');
  if (box && !box.dataset.done) { window.renderDichotomies(box); box.dataset.done = "1"; }
}
Reveal.on('slidechanged', function (e) { renderChartIn(e.currentSlide); });
Reveal.on('ready', function (e) { renderChartIn(e.currentSlide); });

/* Fallback de embeds: si no hay internet (o el embed no carga / está bloqueado),
   se reemplaza el iframe por el póster de respaldo + enlace a la fuente original.
   El plan B principal sin internet es el export a PDF (ver README). */
function embedFail(ifr) {
  if (ifr.dataset.failed === "1") return;
  ifr.dataset.failed = "1";
  var wrap = document.createElement('div');
  wrap.className = 'embed-fallback';
  var img = ifr.getAttribute('data-embed-fallback');
  var src = ifr.getAttribute('data-embed-source') || '#';
  wrap.innerHTML =
    (img ? '<img src="' + img + '" alt="" style="max-width:100%;max-height:280px;border-radius:8px">' : '') +
    '<p>No se pudo cargar el contenido embebido.</p>' +
    '<p><a href="' + src + '" target="_blank" rel="noopener">Abrir la fuente original ↗</a></p>';
  if (ifr.parentNode) ifr.parentNode.replaceChild(wrap, ifr);
}

function installEmbedFallbacks() {
  var frames = document.querySelectorAll('iframe[data-embed-fallback]');
  frames.forEach(function (ifr) {
    var loaded = false;
    ifr.addEventListener('load', function () { loaded = true; });
    ifr.addEventListener('error', function () { embedFail(ifr); });
    // Backstop: si en 7 s no disparó 'load', asumir fallo (red caída/bloqueo).
    // No usamos navigator.onLine: da falsos negativos en algunos entornos
    // y un falso "no carga" en vivo es peor que esperar el timeout.
    setTimeout(function () { if (!loaded) embedFail(ifr); }, 7000);
  });
}
Reveal.on('ready', installEmbedFallbacks);
window.addEventListener('offline', function () {
  document.querySelectorAll('iframe[data-embed-fallback]').forEach(embedFail);
});

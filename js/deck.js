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

/* Render del gráfico de dicotomías al mostrarse su escena. */
function renderChartIn(slide) {
  if (!slide) return;
  var box = slide.querySelector('[data-render-on-show]');
  if (box && !box.dataset.done) { window.renderDichotomies(box); box.dataset.done = "1"; }
}
Reveal.on('slidechanged', function (e) { renderChartIn(e.currentSlide); });
Reveal.on('ready', function (e) { renderChartIn(e.currentSlide); });

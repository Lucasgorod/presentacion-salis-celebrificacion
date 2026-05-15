/* Motor del deck — HTML/CSS/JS propio (sin frameworks). */
(function () {
  var slides = [].slice.call(document.querySelectorAll('.slide'));
  var stage = document.getElementById('stage');
  var prog = document.getElementById('prog');
  var i = 0;

  // Animación: solo mejora (JS + sin preferencia de menos movimiento).
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    document.documentElement.classList.add('js-anim');
  }

  // Lienzo fijo 1280x720 escalado a la pantalla (cualquier proyector).
  function scale() {
    var s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    stage.style.transform = 'scale(' + s + ')';
  }
  window.addEventListener('resize', scale);

  function setBars(slide) {
    slide.querySelectorAll('.cbar').forEach(function (b, k) {
      b.style.width = b.getAttribute('data-w');
      b.style.animation = 'none'; void b.offsetWidth;
      b.style.animation = ''; b.style.animationDelay = (0.22 + k * 0.09) + 's';
    });
  }

  function show(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
    document.documentElement.classList.toggle('dark', slides[i].dataset.reg === 'dark');
    prog.style.width = ((i + 1) / slides.length * 100) + '%';
    setBars(slides[i]);
    if (location.hash !== '#' + (i + 1)) history.replaceState(null, '', '#' + (i + 1));
  }

  document.addEventListener('keydown', function (e) {
    if (['ArrowRight', ' ', 'PageDown'].indexOf(e.key) >= 0) { e.preventDefault(); show(i + 1); }
    else if (['ArrowLeft', 'PageUp'].indexOf(e.key) >= 0) { e.preventDefault(); show(i - 1); }
    else if (e.key === 'Home') { show(0); }
    else if (e.key === 'End') { show(slides.length - 1); }
    else if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }
  });
  stage.addEventListener('click', function (e) {
    // No navegar si el clic es sobre un embed/enlace interactivo.
    if (e.target.closest('.videobox, .mframe, .layer, iframe, a, .embed-fallback')) return;
    var r = stage.getBoundingClientRect();
    show(i + ((e.clientX - r.left) < r.width / 2 ? -1 : 1));
  });

  // Fallback de embeds: si un iframe no carga (sin internet / bloqueado),
  // se muestra póster + enlace a la fuente. Plan B principal: export PDF.
  function embedFail(ifr) {
    if (ifr.dataset.failed === '1') return;
    ifr.dataset.failed = '1';
    var box = document.createElement('div');
    box.className = 'embed-fallback';
    var img = ifr.getAttribute('data-embed-fallback');
    var src = ifr.getAttribute('data-embed-source') || '#';
    box.innerHTML = (img ? '<img src="' + img + '" alt="">' : '') +
      '<p style="font-family:var(--mono);font-size:13px;letter-spacing:.06em">Contenido embebido no disponible sin conexión.</p>' +
      '<a href="' + src + '" target="_blank" rel="noopener">Abrir la fuente original &#8599;</a>';
    if (ifr.parentNode) ifr.parentNode.replaceChild(box, ifr);
  }
  document.querySelectorAll('iframe[data-embed-fallback]').forEach(function (ifr) {
    var ok = false;
    ifr.addEventListener('load', function () { ok = true; });
    ifr.addEventListener('error', function () { embedFail(ifr); });
    setTimeout(function () { if (!ok) embedFail(ifr); }, 7000);
  });
  window.addEventListener('offline', function () {
    document.querySelectorAll('iframe[data-embed-fallback]').forEach(embedFail);
  });

  var start = parseInt((location.hash || '').replace('#', ''), 10);
  scale();
  show(isNaN(start) ? 0 : start - 1);
})();

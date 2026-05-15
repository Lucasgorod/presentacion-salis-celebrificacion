/* Las seis dicotomías (Quevedo-Redondo & Portalés-Oliva, 2017, Gráfico 5, p. 923).
   Valores = % del registro "ordinario". Verificados en docs/.../quotes-verified.md. */
window.DICHOTOMIES = [
  { label: "1. Estadista vs. populista",            ordinario: 65.5 },
  { label: "2. Espacio institucional vs. cotidiano", ordinario: 46.8 },
  { label: "3. Indumentaria formal vs. informal",    ordinario: 60.3 },
  { label: "4. Compañía política vs. ciudadana",     ordinario: 45.9 },
  { label: "5. Apelación racional vs. emocional",    ordinario: 82.7, key: true },
  { label: "6. Temática “dura” vs. “blanda”", ordinario: 29.4 },
];
window.renderDichotomies = function (el) {
  el.innerHTML = "";
  window.DICHOTOMIES.forEach(function (d, i) {
    var row = document.createElement("div");
    row.className = "chart-row" + (d.key ? " is-key" : "");
    row.innerHTML = '<span>' + d.label + '</span>' +
      '<div class="chart-track"><div class="chart-fill" style="width:0%">' +
      '<span class="pct">' + d.ordinario.toString().replace(".", ",") + '%</span></div></div>';
    el.appendChild(row);
    var fill = row.querySelector(".chart-fill");
    // Reflow en estado 0 antes de animar: sin esto la transición no arranca
    // (el cambio ocurre antes del primer layout del subárbol y queda en 0).
    fill.style.width = "0%";
    void fill.offsetWidth;
    setTimeout(function () { fill.style.width = d.ordinario + "%"; }, 90 + i * 120);
  });
};

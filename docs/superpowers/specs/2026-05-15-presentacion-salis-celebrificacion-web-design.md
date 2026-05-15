# Diseño — Presentación web "Sono Silvia, non Giorgia"

**Fecha:** 2026-05-15
**Asignatura:** Publicidad Política (52110016) — MUCIP, Universidad de Sevilla
**Fuente de contenido:** `Guion_Salis_Celebrificacion_v2_1.md` + paper Quevedo-Redondo & Portalés-Oliva (2017) (PDF en el repo)

---

## 1. Objetivo

Presentación web para exponer en vivo en clase (~25-33 min + debate), publicada además en GitHub Pages como repo público. Aplica el marco de **celebrificación** de Quevedo-Redondo & Portalés-Oliva (2017) —las seis dicotomías extraordinario↔ordinario— al caso de **Silvia Salis**, alcaldesa de Génova, mostrando dónde el marco sigue vigente y dónde se queda corto (TikTok, género, evento masivo cultural).

## 2. Decisiones cerradas (aprobadas por la usuaria)

| Tema | Decisión |
|---|---|
| Uso | Deck para exponer en vivo (teclado/clicker, pantalla completa) + GitHub Pages |
| Fidelidad al guion | Guion como base; recorrido libre, nativo-web |
| Medios | Embed-first desde la fuente; descargar solo lo no embebible |
| Imágenes de Salis | Reales, de fuentes confiables; preferencia Wikimedia Commons y canales oficiales (licencia limpia para repo público); prensa de referencia con crédito como respaldo |
| Estilo | Dirección C "híbrido detonante": espina editorial sobria que detona en pop/rave en momentos clave |
| Copy | Sin eslóganes ni títulos rimbombantes; títulos planos y descriptivos |
| Modelo de slide | Título plano + cita(s) concreta(s) y atribuida(s) + bullets de lo que se muestra + medio |
| Stack | reveal.js + tema 100% custom; deploy GitHub Pages estático |

## 3. Modelo de contenido de slide (regla transversal)

Cada slide, cuando corresponda, se construye con:

1. **Título plano y descriptivo** (no eslogan, no editorialización).
2. **Cita(s) concreta(s) y atribuida(s):** palabras textuales de Salis, o de medios sobre ella, o del artículo de Quevedo-Redondo & Portalés-Oliva (2017).
3. **Bullets** de los aspectos que se pretenden mostrar/argumentar en esa slide.
4. **Medio** (embed o imagen) cuando aporte.

**Rigor de citas:** todas las citas que entran al guion provienen de él; antes de darlas por definitivas durante el build se **verifica la literalidad** contra el PDF del paper o la pieza de prensa citada. Las no verificables se marcan como paráfrasis atribuida, no como cita textual. Slide final de fuentes y créditos.

## 4. Storyboard — 15 escenas

Registro: **S** = sobrio · **D** = detonante. Cada escena del núcleo lleva su anclaje analítico.

**Apertura · Marco · Contexto (compacto)**

1. **Apertura — el detonante** (D). Rave de Plaza Matteotti full-bleed sin texto; entra el título "Sono Silvia, non Giorgia". Pregunta a la clase: ¿concierto, mitin, o las dos? · Medio: embed video rave / fallback foto descargada.
2. **Hoja de ruta** (S). Las 3 preguntas del trabajo: (a) qué dice el marco español de 2017; (b) cómo lo aplica una alcaldesa italiana de 2025-26; (c) qué se nos escapa hoy con solo ese marco.
3. **Sartori → la foto ES el mensaje** (S). Cadena: "lo que se ve pesa más que lo que se entiende" (Sartori, *Homo videns*, 1998, vía paper) → en redes la imagen no acompaña, es el mensaje → definición de celebrificación (cita del artículo).
4. **Las seis dicotomías** (S, dato fuerte). Gráfico de barras propio con los datos del paper (885 publicaciones, 5 candidatos, 2015-16). Datos: 1) 34,5/65,5 · 2) 53,2/46,8 · 3) 39,7/60,3 · 4) 54,1/45,9 · 5) 17,3/82,7 · 6) 70,6/29,4. Subrayar: emoción 82,7% = 7× la petición de voto. Herramienta-ancla.
5. **Italia 2026 + quién es Salis** (S). 4 datos de Italia (Meloni desde oct. 2022; "Sono Giorgia, sono una madre, sono cristiana", 2019; referéndum perdido abril 2026; vacío opositor) + perfil Salis (Génova 1985, exatleta olímpica Pekín 2008 / Londres 2012, 5 aros tatuados, VP Comité Olímpico Italiano, alcaldía mayo 2025 con 51,48% vs. Piciocchi, coalición centroizquierda + lista cívica, equipo profesional de comunicación). Cierra con la tensión Meloni/Salis.

**Núcleo · Salis celebrificada (galería de momentos concretos)**

6. **El discurso de victoria** (D). Citas Salis (~26/05/2025): "Estaré entre la gente, para serviros, no para mandar"; "La política debería aprender a usar un lenguaje mejor". → Dicotomía 5 (racional↔emocional: emoción como estilo). Medio: embed video discurso.
7. **Instagram: el retrato curado** (S, visual). La foto de alta producción, la marca personal visual de @silvia_salis. → Dicotomía 3 (indumentaria/estética). Medio: embed posts IG / capturas fallback + imagen de Salis (fuente confiable).
8. **Barrio, vecinos, aros olímpicos** (S). Origen humilde (padre cuidador de un campo de atletismo, madre empleada municipal); "infraestructuras sociales" (expresión propia). → Dicotomías 1 y 4 (estadista↔populista; compañía). Medio: imágenes de Salis en barrio/vecinos (fuente confiable).
9. **La rave de Plaza Matteotti (11 abr. 2026)** (D fuerte). 20.000 personas, Charlotte de Witte, la alcaldesa en el escenario; plaza institucional vuelta pista; negabilidad plausible. → Dicotomía 2 + Novedad 3 (evento masivo como dispositivo). Medio: video full-bleed embebido.
10. **TikTok: a los jóvenes "en su casa"** (D). Cuenta abierta 03/06/2025, al día siguiente de tomar posesión; "para hablar a los jóvenes en su casa". El paper analiza Instagram; TikTok no existía fuera de China en 2017. → Novedad 1. Medio: embed TikTok de Salis.
11. **"Barbie", Manolo Blahnik, el cuerpo** (D). Críticas a su estética y físico; costes asimétricos de género. Cita Salis: "a las mujeres no nos llaman incapaces, nos llaman otra cosa". → Novedad 2 (género como variable estructural). Medio: embed prensa/tuits / capturas + imagen.
12. **Silvia vs. Giorgia** (D). "Sono Silvia, non Giorgia" como réplica obligada a "Sono Giorgia, sono madre, sono cristiana"; la mujer definida frente a otra mujer. → Novedad 2. Medio: comparativa visual Meloni/Salis (imágenes de fuente confiable).
13. **El calendario diseñado** (D, *opcional/comprimible para regular duración*). Rivista Studio: "la familia aparece solo en los posts del domingo". → Tesis: la celebrificación se diseña, es trabajo no don.

**Cierre**

14. **Tres ideas para llevarse** (S). (1) El marco sigue vigente pero es de 2017; (2) la "naturalidad" diseñada confirma la tesis de las autoras; (3) Italia 2025-27 anticipa lo que España puede vivir.
15. **Pregunta abierta (debate)** (D final). "¿La publicidad política contemporánea es publicidad sin política, o política sin publicidad?" Queda en pantalla durante el debate.

## 5. Sistema de diseño

- **Tokens.** Sobrio: fondo carbón `#15151c`, texto claro, acento magenta `#ff2db8`. Detonante: gradiente `#ff2db8 → #7b2ff7 → #1a0f2e`, full-bleed, glow/neón.
- **Tipografía.** Una grotesca para títulos/cuerpo y, opcional, una serif para citas; **cargadas localmente** (sin dependencia de Google Fonts en el aula).
- **Mecánica detonante.** Transiciones discretas dentro de lo sobrio; corte/destello al entrar a una escena detonante. La tensión sobrio↔detonante espeja la dicotomía extraordinario↔ordinario (el medio argumenta la tesis).
- **Gráfico de las seis dicotomías.** Barras propias con datos del paper, animadas en la escena 4; reaparece en el núcleo (escenas 6-8) "activándose" por dicotomía.
- **Cita.** Tratamiento tipográfico destacado con atribución en línea (autor/fuente/fecha; marca "verificar" hasta contrastar con fuente primaria).
- **Formato** 16:9.

## 6. Arquitectura técnica

```
/ (raíz del repo, GitHub Pages)
  index.html            deck reveal.js (estructura de las 15 escenas)
  css/theme.css         sistema sobrio↔detonante, tipografía, gráfico
  js/deck.js            init reveal, fallbacks de embeds
  assets/
    fonts/              tipografías locales
    img/                imágenes de Salis y respaldos descargados
    media/              videos descargados (solo lo no embebible)
    CREDITS.md          fuentes y atribución de cada medio
  vendor/reveal/        copia local de reveal.js (respaldo del CDN)
  docs/superpowers/specs/ este spec
  README.md
```

- **reveal.js** vía CDN con copia local en `vendor/` como respaldo.
- **Deploy:** GitHub Pages desde `main`, raíz. Repo público. (La usuaria hará `git push` / configuración de Pages cuando lo decida; este proyecto no publica.)
- Sin paso de build (HTML/CSS/JS estático).
- **`.gitignore` / higiene de repo público:** excluir `.superpowers/`. El **PDF del paper tiene copyright** → no commitearlo al repo público (mantenerlo local, gitignored). El guion son notas privadas → gitignored salvo que la usuaria decida lo contrario. El spec sí se versiona.

## 7. Estrategia de medios e imágenes

- **Embed-first:** YouTube/Vimeo (rave, discurso), TikTok (cuenta de Salis), Instagram (posts), X/prensa (críticas) mediante embebido oficial.
- **Imágenes de Salis:** preferir **Wikimedia Commons** y **canales oficiales** (Comune di Genova / cuentas oficiales) por licencia compatible con repo público; prensa de referencia (agencias, medios establecidos) como respaldo, siempre con crédito.
- **Descarga** solo de lo no embebible, a `assets/`, con entrada en `CREDITS.md` (autor, fuente, URL, licencia/uso).
- Slide final de **fuentes y créditos** + bibliografía mínima (paper y fuentes periodísticas verificadas del guion).

## 8. Robustez

- **Plan B sin internet:** export a PDF de reveal.js antes de la charla (los embeds caen, pero el hilo y los textos quedan).
- **Fallback de embed:** si un iframe no carga, mostrar póster/imagen descargada + enlace a la fuente, sin romper el layout.
- Navegación teclado/clicker; modo orador (notas en ventana aparte, derivadas del guion); overview.

## 9. Verificación antes de la charla

- Recorrer las 15 escenas de principio a fin con teclado.
- Confirmar que cada embed carga; provocar un fallo y verificar el fallback.
- Probar export a PDF completo.
- Probar resolución de proyector (16:9) y que las tipografías cargan offline.
- Revisar literalidad de todas las citas contra PDF/prensa y completar `CREDITS.md`.

## 10. Fuera de alcance (YAGNI)

- Modo "lectura"/scrollytelling alternativo (se descartó: uso = exponer en vivo).
- Paso de build, framework de componentes, i18n.
- Backend, analítica, formularios.
- CMS o edición de contenido en runtime.

## 11. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Sin internet en el aula → embeds caídos | Export PDF de respaldo + fallback visible por embed |
| Literalidad de citas inexacta | Verificación obligatoria contra PDF/prensa antes de cerrar; marcar paráfrasis |
| Derechos de imagen en repo público | Preferir Wikimedia/oficiales con licencia compatible; créditos; uso educativo; evitar descargar prensa con copyright si hay alternativa libre |
| Deriva de duración (recorrido libre) | Escena 13 marcada opcional/comprimible; tiempos orientativos del guion |
| Embeds de TikTok/IG frágiles | Copia/póster descargado como fallback declarado |
| PDF del paper (copyright) en repo público | Gitignored; no se commitea; uso local únicamente |

## 12. Criterios de aceptación

- Las 15 escenas implementadas según storyboard y modelo de contenido.
- Sistema sobrio↔detonante visible y coherente; sin eslóganes; títulos planos.
- Imágenes reales de Salis de fuentes confiables donde corresponde, acreditadas.
- Navegación en vivo fluida; export PDF funcional; fallbacks probados.
- `CREDITS.md` completo; citas verificadas o marcadas como paráfrasis.
- Desplegable como sitio estático en GitHub Pages sin pasos de build.

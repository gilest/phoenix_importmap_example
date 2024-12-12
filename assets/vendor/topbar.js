var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var topbar_min = createCommonjsModule(function(module) {
  /**
   * @license MIT
   * topbar 2.0.2
   * http://buunguyen.github.io/topbar
   * Copyright (c) 2024 Buu Nguyen
   */
  (function(window2, document2) {
    function repaint() {
      canvas.width = window2.innerWidth, canvas.height = 5 * options.barThickness;
      var ctx = canvas.getContext("2d");
      ctx.shadowBlur = options.shadowBlur, ctx.shadowColor = options.shadowColor;
      var stop, lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      for (stop in options.barColors)
        lineGradient.addColorStop(stop, options.barColors[stop]);
      ctx.lineWidth = options.barThickness, ctx.beginPath(), ctx.moveTo(0, options.barThickness / 2), ctx.lineTo(Math.ceil(currentProgress * canvas.width), options.barThickness / 2), ctx.strokeStyle = lineGradient, ctx.stroke();
    }
    var canvas, currentProgress, showing, progressTimerId = null, fadeTimerId = null, delayTimerId = null, options = {autoRun: true, barThickness: 3, barColors: {0: "rgba(26,  188, 156, .9)", ".25": "rgba(52,  152, 219, .9)", ".50": "rgba(241, 196, 15,  .9)", ".75": "rgba(230, 126, 34,  .9)", "1.0": "rgba(211, 84,  0,   .9)"}, shadowBlur: 10, shadowColor: "rgba(0,   0,   0,   .6)", className: null}, topbar = {config: function(opts) {
      for (var key in opts)
        options.hasOwnProperty(key) && (options[key] = opts[key]);
    }, show: function(handler) {
      var type, elem;
      showing || (handler ? delayTimerId = delayTimerId || setTimeout(() => topbar.show(), handler) : (showing = true, fadeTimerId !== null && window2.cancelAnimationFrame(fadeTimerId), canvas || ((elem = (canvas = document2.createElement("canvas")).style).position = "fixed", elem.top = elem.left = elem.right = elem.margin = elem.padding = 0, elem.zIndex = 100001, elem.display = "none", options.className && canvas.classList.add(options.className), document2.body.appendChild(canvas), type = "resize", handler = repaint, (elem = window2).addEventListener ? elem.addEventListener(type, handler, false) : elem.attachEvent ? elem.attachEvent("on" + type, handler) : elem["on" + type] = handler), canvas.style.opacity = 1, canvas.style.display = "block", topbar.progress(0), options.autoRun && function loop() {
        progressTimerId = window2.requestAnimationFrame(loop), topbar.progress("+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2));
      }()));
    }, progress: function(to) {
      return to === void 0 || (typeof to == "string" && (to = (0 <= to.indexOf("+") || 0 <= to.indexOf("-") ? currentProgress : 0) + parseFloat(to)), currentProgress = 1 < to ? 1 : to, repaint()), currentProgress;
    }, hide: function() {
      clearTimeout(delayTimerId), delayTimerId = null, showing && (showing = false, progressTimerId != null && (window2.cancelAnimationFrame(progressTimerId), progressTimerId = null), function loop() {
        return 1 <= topbar.progress("+.1") && (canvas.style.opacity -= 0.05, canvas.style.opacity <= 0.05) ? (canvas.style.display = "none", void (fadeTimerId = null)) : void (fadeTimerId = window2.requestAnimationFrame(loop));
      }());
    }};
    module.exports = topbar;
  }).call(commonjsGlobal, window, document);
});
export default topbar_min;
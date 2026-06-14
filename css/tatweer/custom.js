(function () {
  function i() {
    window.AOS && AOS.init({ duration: 800, once: false });
  }
  function r() {
    window.AOS && AOS.refresh();
  }
  document.readyState === "complete" ? i() : window.addEventListener("load", i);
  var p = history.pushState.bind(history);
  history.pushState = function () {
    p.apply(history, arguments);
    r();
  };
  window.addEventListener("popstate", r);
})();

(function () {
  var key = "genai-notes-theme";
  var root = document.documentElement;

  function apply(stored) {
    var q = window.matchMedia("(prefers-color-scheme: dark)");
    var useDark = stored === "dark" || (stored === null && q.matches);
    root.setAttribute("data-theme", useDark ? "dark" : "light");
    var btn = document.getElementById("gn-theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", useDark ? "Switch to light mode" : "Switch to dark mode");
      btn.textContent = useDark ? "☀️" : "🌙";
    }
  }

  function bind() {
    var btn = document.getElementById("gn-theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        localStorage.setItem(key, next);
        apply(next);
      });
    }
  }

  apply(localStorage.getItem(key));
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      apply(localStorage.getItem(key));
      bind();
    });
  } else {
    apply(localStorage.getItem(key));
    bind();
  }
})();

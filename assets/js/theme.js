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

  function initSectionCollapse() {
    var main = document.querySelector("main.gn-main");
    if (!main) return;
    var sections = main.querySelectorAll(":scope > .gn-section");
    sections.forEach(function (section, index) {
      if (section.dataset.gnCollapsible === "1") return;
      var h2 = section.querySelector(":scope > h2");
      if (!h2) return;

      var head = document.createElement("div");
      head.className = "gn-section__head";

      var toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "gn-section__toggle";

      var sid = section.id;
      if (!sid) {
        sid = "gn-section-" + index;
        section.id = sid;
      }
      var bid = sid + "-panel";
      toggle.setAttribute("aria-controls", bid);
      toggle.setAttribute("aria-expanded", "true");

      var body = document.createElement("div");
      body.className = "gn-section__body";
      body.id = bid;

      section.insertBefore(head, h2);
      head.appendChild(h2);
      head.appendChild(toggle);

      while (head.nextSibling) {
        body.appendChild(head.nextSibling);
      }
      section.appendChild(body);

      function setExpanded(exp) {
        toggle.setAttribute("aria-expanded", exp ? "true" : "false");
        toggle.textContent = exp ? "Collapse" : "Expand";
        section.classList.toggle("gn-section--collapsed", !exp);
      }

      setExpanded(true);

      toggle.addEventListener("click", function () {
        setExpanded(section.classList.contains("gn-section--collapsed"));
      });

      section.dataset.gnCollapsible = "1";
    });
  }

  function onReady() {
    apply(localStorage.getItem(key));
    bind();
    initSectionCollapse();
  }

  

  apply(localStorage.getItem(key));
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();

// ---- Dropdown (Topics Menu) ----
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".gn-dropdown");
  const btn = document.querySelector(".gn-dropdown__btn");

  if (!dropdown || !btn) {
    console.error("Dropdown elements missing");
    return;
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    dropdown.classList.toggle("open");

    console.log("Open state:", dropdown.classList.contains("open"));
  });

  document.addEventListener("click", () => {
    dropdown.classList.remove("open");
  });

  dropdown.querySelector(".gn-dropdown__menu")
    .addEventListener("click", (e) => {
      e.stopPropagation();
    });
});
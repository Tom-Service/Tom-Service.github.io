(() => {
  // ✅ 自動判斷 GitHub Pages base path（user page / project page 都能用）
  // - user page:    https://<user>.github.io/            => BASE="/"
  // - project page: https://<user>.github.io/<repo>/     => BASE="/<repo>/"
  const BASE = (() => {
    const p = location.pathname.replace(/\/+$/, ""); // 去尾巴 /
    const parts = p.split("/").filter(Boolean);

    // 例：/Tom-Service.github.io/projects.html -> parts[0] = "Tom-Service.github.io"
    if (parts.length > 0 && !parts[0].endsWith(".html") && parts[0] !== "assets") {
      return `/${parts[0]}/`;
    }
    return "/";
  })();

  const NAV_HTML = `
    <nav id="navbar">
      <a class="logo" href="${BASE}" data-nav>TomChou</a>
      <ul class="nav-links">
        <li><a href="${BASE}" data-nav>Home</a></li>
        <li><a href="${BASE}resume.html" data-nav>Resume</a></li>
        <li><a href="${BASE}projects.html" data-nav>Projects</a></li>
        <li><a href="${BASE}contact.html" data-nav>Contact</a></li>
      </ul>
    </nav>
    <button class="back-to-top" id="backToTop" aria-label="Back to top">↑</button>
    <div class="decorative-line" aria-hidden="true"></div>
  `;

  const FOOTER_HTML = `
    <footer>
      <div class="footer-inner">
        <div class="footer-text">© 2025 TomChou. 版權所有</div>
        <div class="footer-year">2025</div>
      </div>
    </footer>
  `;

  function injectShell() {
    const navHost = document.getElementById("site-nav");
    const footerHost = document.getElementById("site-footer");
    if (navHost) navHost.innerHTML = NAV_HTML;
    if (footerHost) footerHost.innerHTML = FOOTER_HTML;
  }

  // ✅ active 高亮：只比對「最後的檔名」即可（避免 BASE 影響）
  function setActiveLink() {
    const file = (location.pathname.split("/").pop() || "").toLowerCase(); // e.g. resume.html / ""
    document.querySelectorAll('a[data-nav]').forEach(a => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      const last = href.split("/").filter(Boolean).pop() || ""; // e.g. resume.html / ""
      a.classList.toggle("active", last === file);
      // Home：當網址最後是 "" 或 "index.html" 時也算 Home
      if ((file === "" || file === "index.html") && (last === "")) a.classList.add("active");
    });
  }

  // ✅ 切頁淡出（只對同站連結）
  function enableSmoothLeave() {
    document.querySelectorAll('a[href]').forEach(a => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href) return;

        // 外站不處理
        const url = new URL(a.href, location.href);
        if (url.origin !== location.origin) return;

        // hash 跳轉不淡出
        if (href.startsWith("#")) return;

        // 同頁不處理
        if (url.pathname === location.pathname && url.search === location.search) return;

        e.preventDefault();
        document.body.classList.add("is-leaving");
        setTimeout(() => { location.href = a.href; }, 170);
      });
    });
  }

  function enableBackToTop() {
    const btn = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
      if (!btn) return;
      btn.classList.toggle("show", window.scrollY > 520);
    });
    btn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function enableNavbarScroll() {
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
      navbar?.classList.toggle("scrolled", window.scrollY > 100);
    });
  }

  function enableScrollProgress() {
    const bar = document.querySelector(".scroll-progress");
    window.addEventListener("scroll", () => {
      if (!bar) return;
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const sh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const p = sh <= 0 ? 0 : (st / sh) * 100;
      bar.style.width = p + "%";
    });
  }

  function enableTabs() {
    document.querySelectorAll(".tab-nav").forEach(nav => {
      const buttons = nav.querySelectorAll(".tab-button");
      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          const target = btn.getAttribute("data-tab");
          const section = nav.closest("[data-tabs]") || document;

          section.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
          section.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

          btn.classList.add("active");
          const el = document.getElementById(target);
          if (el) el.classList.add("active");
        });
      });
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    injectShell();
    setActiveLink();
    enableSmoothLeave();
    enableBackToTop();
    enableNavbarScroll();
    enableScrollProgress();
    enableTabs();

    // page enter class
    document.querySelector(".page")?.classList.add("page-fade-in");
  });
})();

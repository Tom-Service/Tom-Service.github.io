(() => {
  const NAV_HTML = `
    <nav id="navbar">
      <a class="logo" href="index.html" data-nav>TomChou</a>
      <ul class="nav-links">
        <li><a href="index.html" data-nav>Home</a></li>
        <li><a href="resume.html" data-nav>Resume</a></li>
        <li><a href="projects.html" data-nav>Projects</a></li>
        <li><a href="contact.html" data-nav>Contact</a></li>
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

  function injectShell(){
    const navHost = document.getElementById("site-nav");
    const footerHost = document.getElementById("site-footer");
    if (navHost) navHost.innerHTML = NAV_HTML;
    if (footerHost) footerHost.innerHTML = FOOTER_HTML;
  }

  function setActiveLink(){
    const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll('a[data-nav]').forEach(a => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      a.classList.toggle("active", href === file || (file === "" && href === "index.html"));
    });
  }

  function enableSmoothLeave(){
    // fade-out on internal nav clicks
    document.querySelectorAll('a[href$=".html"]').forEach(a => {
      a.addEventListener("click", (e) => {
        const url = new URL(a.href, location.href);
        if (url.origin !== location.origin) return;
        if (url.pathname === location.pathname) return;
        e.preventDefault();
        document.body.classList.add("is-leaving");
        setTimeout(() => { location.href = a.href; }, 170);
      });
    });
  }

  function enableBackToTop(){
    const btn = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
      if (!btn) return;
      btn.classList.toggle("show", window.scrollY > 520);
    });
    btn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function enableNavbarScroll(){
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
      navbar?.classList.toggle("scrolled", window.scrollY > 100);
    });
  }

  function enableScrollProgress(){
    const bar = document.querySelector(".scroll-progress");
    window.addEventListener("scroll", () => {
      if (!bar) return;
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const sh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const p = sh <= 0 ? 0 : (st / sh) * 100;
      bar.style.width = p + "%";
    });
  }

  function enableTabs(){
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

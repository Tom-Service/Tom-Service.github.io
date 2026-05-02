/* ================================================================
   TomChou Portfolio — site.js
   - Nav & footer injection
   - Active nav state
   - Tab switching
   - Scroll progress bar
   - Mobile hamburger
   ================================================================ */

(function () {
  'use strict';

  /* ── Helpers ── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const page = location.pathname.split('/').pop() || 'index.html';

  /* ── Nav HTML ── */
  const NAV_LINKS = [
    { href: 'index.html',    label: 'Home'    },
    { href: 'resume.html',   label: 'Resume'  },
    { href: 'projects.html', label: 'Projects'},
    { href: 'contact.html',  label: 'Contact' },
  ];

  function buildNav() {
    const el = $('#site-nav');
    if (!el) return;

    const links = NAV_LINKS.map(({ href, label }) => {
      const active = href === page ? ' active' : '';
      return `<li><a href="${href}" class="${active.trim()}">${label}</a></li>`;
    }).join('');

    el.innerHTML = `
      <nav class="site-nav">
        <div class="nav-inner">
          <a href="index.html" class="nav-logo">TomChou</a>
          <ul class="nav-links" id="nav-links">${links}</ul>
          <button class="nav-toggle" id="nav-toggle" aria-label="選單" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>`;

    /* hamburger */
    const toggle = $('#nav-toggle');
    const navLinks = $('#nav-links');
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });

    /* close on link click (mobile) */
    $$('a', navLinks).forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ── Footer HTML ── */
  function buildFooter() {
    const el = $('#site-footer');
    if (!el) return;
    const year = new Date().getFullYear();
    el.innerHTML = `
      <footer class="site-footer">
        <div class="footer-inner">
          <span class="footer-copy">© ${year} Tom Chou — Built with care.</span>
          <ul class="footer-links">
            <li><a href="mailto:tomchou.service@gmail.com">Email</a></li>
            <li><a href="https://github.com/Tom-Service" target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
        </div>
      </footer>`;
  }

  /* ── Scroll progress ── */
  function initScrollProgress() {
    const bar = $('.scroll-progress');
    if (!bar) return;
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = scrollHeight - clientHeight > 0
        ? (scrollTop / (scrollHeight - clientHeight)) * 100
        : 0;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Tab switching ── */
  function initTabs() {
    $$('[data-tabs]').forEach(section => {
      const buttons = $$('.tab-button', section);
      const panes   = $$('.tab-content', section);

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.tab;

          buttons.forEach(b => b.classList.toggle('active', b === btn));
          panes.forEach(p => p.classList.toggle('active', p.id === target));
        });
      });
    });
  }

  /* ── Show-more toggle (resume) ── */
  window.toggle = function (id, btn) {
    const el = document.getElementById(id);
    if (!el) return;
    const open = el.classList.toggle('open');
    btn.textContent = open ? '▾ 收合專案' : '▸ 展開更多專案';
  };

  /* ── Smooth section reveal on scroll ── */
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    const style = document.createElement('style');
    style.textContent = `
      .reveal { opacity: 0; transform: translateY(18px); transition: opacity .45s ease, transform .45s ease; }
      .reveal.visible { opacity: 1; transform: none; }
    `;
    document.head.appendChild(style);

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });

    $$('.card, .exp, .row, .edu-row, .lang-row, .skill-card').forEach(el => {
      el.classList.add('reveal');
      obs.observe(el);
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    buildFooter();
    initScrollProgress();
    initTabs();
    initReveal();
  });
})();

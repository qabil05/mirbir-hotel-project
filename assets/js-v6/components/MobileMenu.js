import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "/assets/vendor-v6/react-jsx-runtime.js";
import { nav } from "/assets/js-v6/lib/data.js";
export function MobileMenu() {
    const script = `(() => {
    const root = document.getElementById('mirbir-mobile-menu');
    if (!root || root.dataset.ready === '1') return;
    root.dataset.ready = '1';

    const trigger = root.querySelector('[data-menu-trigger]');
    const panel = root.querySelector('[data-menu-panel]');
    const links = Array.from(root.querySelectorAll('[data-menu-link]'));
    if (!trigger || !panel) return;

    let navigating = false;
    let warmed = false;

    const setOpen = (open) => {
      if (navigating) return;
      root.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      trigger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
      links.forEach((link) => { link.tabIndex = open ? 0 : -1; });
      document.body.classList.toggle('mirbir-menu-lock', open);

      if (open && !warmed) {
        warmed = true;
        const warmRoutes = () => {
          const seen = new Set();
          links.forEach((link, index) => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || seen.has(href)) return;
            seen.add(href);
            window.setTimeout(() => {
              if (document.querySelector('link[data-mirbir-prefetch="' + href + '"]')) return;
              const prefetch = document.createElement('link');
              prefetch.rel = 'prefetch';
              prefetch.href = href;
              prefetch.setAttribute('data-mirbir-prefetch', href);
              document.head.appendChild(prefetch);
            }, index * 70);
          });
        };
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(warmRoutes, { timeout: 700 });
        } else {
          window.setTimeout(warmRoutes, 120);
        }
      }
    };

    const navigate = (link, event) => {
      const rawHref = link.getAttribute('href');
      if (!rawHref || rawHref.startsWith('#') || navigating) return;

      const url = new URL(rawHref, window.location.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();

      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        setOpen(false);
        return;
      }

      navigating = true;
      root.classList.add('is-navigating');
      root.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-label', 'Open navigation menu');
      panel.setAttribute('aria-hidden', 'true');
      links.forEach((item) => { item.tabIndex = -1; });
      document.body.classList.remove('mirbir-menu-lock');

      // Give the browser two paint opportunities so the menu visibly exits
      // instead of appearing frozen while the next document starts loading.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          window.setTimeout(() => window.location.assign(url.href), 105);
        });
      });
    };

    trigger.addEventListener('click', () => setOpen(!root.classList.contains('is-open')));

    links.forEach((link) => {
      link.addEventListener('click', (event) => navigate(link, event));
      link.addEventListener('pointerenter', () => {
        const href = link.getAttribute('href');
        if (!href || document.querySelector('link[data-mirbir-prefetch="' + href + '"]')) return;
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = href;
        prefetch.setAttribute('data-mirbir-prefetch', href);
        document.head.appendChild(prefetch);
      }, { once: true, passive: true });
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && root.classList.contains('is-open')) setOpen(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && root.classList.contains('is-open')) setOpen(false);
    }, { passive: true });

    window.addEventListener('pageshow', () => {
      navigating = false;
      root.classList.remove('is-navigating', 'is-open');
      document.body.classList.remove('mirbir-menu-lock');
    });
  })();`;
    return (_jsxs(_Fragment, { children: [_jsxs("div", { id: "mirbir-mobile-menu", className: "mirbir-mobile-menu lg:hidden", children: [_jsxs("button", { type: "button", className: "mirbir-mobile-menu__trigger", "aria-expanded": "false", "aria-controls": "mirbir-mobile-nav", "aria-label": "Open navigation menu", "data-menu-trigger": true, children: [_jsx("span", { className: "sr-only", children: "Menu" }), _jsx("svg", { className: "mirbir-mobile-menu__open", viewBox: "0 0 24 24", width: "24", height: "24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true", children: _jsx("path", { d: "M4 7h16M4 12h16M4 17h16" }) }), _jsx("svg", { className: "mirbir-mobile-menu__close", viewBox: "0 0 24 24", width: "24", height: "24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true", children: _jsx("path", { d: "M6 6l12 12M18 6L6 18" }) })] }), _jsx("nav", { id: "mirbir-mobile-nav", className: "mirbir-mobile-menu__panel", "aria-label": "Mobile", "aria-hidden": "true", "data-menu-panel": true, children: _jsxs("div", { className: "mx-auto w-full max-w-[760px] pb-8", children: [_jsx("div", { className: "mirbir-mobile-menu__stack", children: nav.map((item) => (_jsx("a", { href: item.href, tabIndex: -1, "data-menu-link": true, className: "mirbir-mobile-menu__item flex min-h-[68px] items-center border-b border-ivory/15 py-3 pr-2 font-display text-[clamp(34px,10vw,52px)] leading-[0.95] text-ivory", children: item.label }, item.href))) }), _jsx("a", { href: "/book/", tabIndex: -1, "data-menu-link": true, className: "mirbir-mobile-menu__cta mt-7 flex min-h-[64px] items-center justify-center rounded-sm bg-ivory px-5 py-4 font-display text-[clamp(30px,8vw,40px)] leading-none text-bg", children: "Book your stay" }), _jsxs("div", { className: "mirbir-mobile-menu__subnav mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-ivory/10 pt-6 text-base text-ivory-soft", children: [_jsx("a", { href: "/gallery/", tabIndex: -1, "data-menu-link": true, children: "Gallery" }), _jsx("a", { href: "/location/", tabIndex: -1, "data-menu-link": true, children: "Location" })] })] }) })] }), _jsx("script", { dangerouslySetInnerHTML: { __html: script } })] }));
}

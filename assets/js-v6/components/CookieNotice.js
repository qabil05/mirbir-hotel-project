import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "/assets/vendor-v6/react-jsx-runtime.js";
export function CookieNotice() {
    const script = `(() => {
    const bar = document.getElementById('mirbir-cookiebar');
    const accept = document.getElementById('mirbir-cookie-accept');
    if (!bar || !accept) return;
    try {
      if (localStorage.getItem('mirbir-cookies')) return;
    } catch {}
    const show = () => {
      bar.hidden = false;
      requestAnimationFrame(() => bar.classList.add('mirbir-cookiebar--visible'));
    };
    if ('requestIdleCallback' in window) requestIdleCallback(show, { timeout: 3200 });
    else setTimeout(show, 2200);
    accept.addEventListener('click', () => {
      try { localStorage.setItem('mirbir-cookies', '1'); } catch {}
      bar.classList.remove('mirbir-cookiebar--visible');
      setTimeout(() => { bar.hidden = true; }, 220);
    }, { once: true });
  })();`;
    return (_jsxs(_Fragment, { children: [_jsxs("div", { id: "mirbir-cookiebar", role: "dialog", "aria-label": "Cookies", className: "mirbir-cookiebar", hidden: true, children: [_jsxs("p", { className: "m-0 text-sm text-ivory-soft", children: ["We use quiet cookies to remember booking dates on this device. ", _jsx("a", { href: "/privacy/", className: "underline", children: "Privacy" })] }), _jsx("button", { id: "mirbir-cookie-accept", type: "button", className: "inline-flex min-h-10 items-center rounded-lg bg-ivory px-4 text-sm text-bg transition-transform duration-200 hover:-translate-y-px active:scale-[0.98]", children: "Accept" })] }), _jsx("script", { dangerouslySetInnerHTML: { __html: script } })] }));
}

MIRBIR — Hostinger Static HTML v5 (navigation fix)

1. Delete/replace the previous MIRBIR files inside public_html.
2. Upload this ZIP into public_html and Extract it there.
3. Confirm public_html/index.html and public_html/.htaccess exist.
4. Open the site and press Ctrl+F5 once.

v5 fixes:
- Cross-page navigation uses full document navigation instead of fragile pushState SPA swaps.
- Home "Continue" forces /book/ with checkin, checkout, adults and children preserved separately.
- Plan page "Plan stay" applies the changed stay values and reloads /plan/ reliably.
- New /assets/js-v5/ and site-v5.css paths prevent old v4 JavaScript/CSS from browser cache.


V6 FIX: React/ReactDOM runtime is now self-hosted under assets/vendor-v6. No esm.sh runtime requests are required. All route changes are normal document navigations. Old service-worker/cache storage is cleared once per browser build.

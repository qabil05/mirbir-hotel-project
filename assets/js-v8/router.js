import { createRoot } from "__MIRBIR_BASE__assets/vendor-v6/react-dom-client.js";
import { jsx, jsxs, Fragment } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import HomePage from "__MIRBIR_BASE__assets/js-v8/app/page.js";
import StayPage from "__MIRBIR_BASE__assets/js-v8/app/stay/page.js";
import RoomPage from "__MIRBIR_BASE__assets/js-v8/app/stay/slug/page.js";
import ExperiencePage from "__MIRBIR_BASE__assets/js-v8/app/experience/page.js";
import DiningPage from "__MIRBIR_BASE__assets/js-v8/app/dining/page.js";
import WellnessPage from "__MIRBIR_BASE__assets/js-v8/app/wellness/page.js";
import GalleryPage from "__MIRBIR_BASE__assets/js-v8/app/gallery/page.js";
import JournalPage from "__MIRBIR_BASE__assets/js-v8/app/journal/page.js";
import LocationPage from "__MIRBIR_BASE__assets/js-v8/app/location/page.js";
import PlanPage from "__MIRBIR_BASE__assets/js-v8/app/plan/page.js";
import BookPage from "__MIRBIR_BASE__assets/js-v8/app/book/page.js";
import PrivacyPage from "__MIRBIR_BASE__assets/js-v8/app/privacy/page.js";
import TermsPage from "__MIRBIR_BASE__assets/js-v8/app/terms/page.js";
import NotFound from "__MIRBIR_BASE__assets/js-v8/app/not-found.js";
import { Header } from "__MIRBIR_BASE__assets/js-v8/components/Header.js";
import { Footer } from "__MIRBIR_BASE__assets/js-v8/components/Footer.js";
import { CookieNotice } from "__MIRBIR_BASE__assets/js-v8/components/CookieNotice.js";

const SITE_BASE = "__MIRBIR_BASE__";

function stripSiteBase(pathname){
  let path = pathname || "/";
  if(SITE_BASE !== "/"){
    const baseNoSlash = SITE_BASE.replace(/\/$/, "");
    if(path === baseNoSlash) path = "/";
    else if(path.startsWith(baseNoSlash + "/")) path = path.slice(baseNoSlash.length) || "/";
  }
  return path;
}

function withSiteBase(pathname){
  if(!pathname) return SITE_BASE;
  if(/^https?:\/\//i.test(pathname) || pathname.startsWith("mailto:") || pathname.startsWith("tel:") || pathname.startsWith("#")) return pathname;
  if(SITE_BASE === "/") return pathname.startsWith("/") ? pathname : "/" + pathname;
  const baseNoSlash = SITE_BASE.replace(/\/$/, "");
  if(pathname === baseNoSlash || pathname.startsWith(baseNoSlash + "/")) return pathname;
  return SITE_BASE + pathname.replace(/^\/+/, "");
}

const rooms = new Set(["boathouse","olive-suite","garden-villa","cypress-house","horizon-residence","signature-villa"]);
const titles = {
  "/":"MIRBIR Boutique Hotel & Resort",
  "/stay":"Stay | MIRBIR",
  "/experience":"Experience | MIRBIR",
  "/dining":"Dining | MIRBIR",
  "/wellness":"Wellness | MIRBIR",
  "/gallery":"Gallery | MIRBIR",
  "/journal":"Journal | MIRBIR",
  "/location":"Location | MIRBIR",
  "/plan":"Plan your stay | MIRBIR",
  "/book":"Book | MIRBIR",
  "/privacy":"Privacy | MIRBIR",
  "/terms":"Terms | MIRBIR"
};

function currentPath(){
  return stripSiteBase(window.location.pathname).replace(/\/+$/,'') || '/';
}

function resolvePage(path){
  if(path === '/') return [HomePage, {}];
  if(path === '/stay') return [StayPage, {}];
  if(path.startsWith('/stay/')){
    const slug = path.split('/')[2];
    if(rooms.has(slug)) return [RoomPage, { params: { slug } }];
  }
  if(path === '/experience') return [ExperiencePage, {}];
  if(path === '/dining') return [DiningPage, {}];
  if(path === '/wellness') return [WellnessPage, {}];
  if(path === '/gallery') return [GalleryPage, {}];
  if(path === '/journal') return [JournalPage, {}];
  if(path === '/location') return [LocationPage, {}];
  if(path === '/plan' || path === '/estimate') return [PlanPage, {}];
  if(path === '/book') return [BookPage, {}];
  if(path === '/privacy') return [PrivacyPage, {}];
  if(path === '/terms') return [TermsPage, {}];
  return [NotFound, {}];
}

const rootNode = document.getElementById('root');
const root = createRoot(rootNode);
let inlineTimer = 0;

function executeInlineBehaviors(){
  clearTimeout(inlineTimer);
  inlineTimer = window.setTimeout(() => {
    document.querySelectorAll('#root script').forEach((node) => {
      const code = node.textContent || '';
      if(code.trim() && node.dataset.mirbirExecuted !== '1'){
        node.dataset.mirbirExecuted = '1';
        try { (0, eval)(code); } catch (err) { console.error('MIRBIR inline behavior error', err); }
      }
    });
  }, 50);
}

function renderCurrentRoute(){
  const path = currentPath();
  const [Page, props] = resolvePage(path);
  document.title = titles[path] || (path.startsWith('/stay/') ? 'Stay | MIRBIR' : 'MIRBIR');
  root.render(jsxs(Fragment, { children: [
    jsx(CookieNotice, {}),
    jsx("div", { "data-nav-sentinel": true, className: "absolute top-0 h-px w-px" }),
    jsx(Header, {}),
    jsx(Page, { ...props }),
    jsx(Footer, {})
  ]}));
  executeInlineBehaviors();
}

function normalizeInternalHref(rawHref){
  try {
    const raw = typeof rawHref === "string" ? rawHref : String(rawHref ?? "");
    const url = new URL(raw, window.location.href);
    if(url.origin !== window.location.origin) return null;

    let logical = stripSiteBase(url.pathname);
    if(logical === '/estimate' || logical === '/estimate/') logical = '/plan/';
    const leaf = logical.split('/').pop();
    if(logical !== '/' && !logical.endsWith('/') && !leaf.includes('.')) logical += '/';

    url.pathname = withSiteBase(logical);
    return url;
  } catch {
    return null;
  }
}

/*
  Hostinger static build: intentionally use document navigation for route changes.
  Previous SPA pushState navigation could update the URL before React finished
  swapping route trees, leaving a black page until F5. A normal document load is
  reliable on every static route and browser cache keeps it fast after first load.
*/
window.__mirbirNavigate = function(rawHref, replace=false){
  const url = normalizeInternalHref(rawHref);
  if(!url){
    if(replace) window.location.replace(rawHref);
    else window.location.assign(rawHref);
    return;
  }
  if(replace) window.location.replace(url.href);
  else window.location.assign(url.href);
};

try {
  renderCurrentRoute();
} catch(err){
  console.error('MIRBIR boot error', err);
  if(rootNode) rootNode.innerHTML = '<main style="min-height:100dvh;display:grid;place-items:center;padding:24px"><p>Unable to load this page. Please refresh once.</p></main>';
}

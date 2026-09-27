import { createRoot } from "/assets/vendor-v6/react-dom-client.js";
import { jsx, jsxs, Fragment } from "/assets/vendor-v6/react-jsx-runtime.js";
import HomePage from "/assets/js-v6/app/page.js";
import StayPage from "/assets/js-v6/app/stay/page.js";
import RoomPage from "/assets/js-v6/app/stay/slug/page.js";
import ExperiencePage from "/assets/js-v6/app/experience/page.js";
import DiningPage from "/assets/js-v6/app/dining/page.js";
import WellnessPage from "/assets/js-v6/app/wellness/page.js";
import GalleryPage from "/assets/js-v6/app/gallery/page.js";
import JournalPage from "/assets/js-v6/app/journal/page.js";
import LocationPage from "/assets/js-v6/app/location/page.js";
import PlanPage from "/assets/js-v6/app/plan/page.js";
import BookPage from "/assets/js-v6/app/book/page.js";
import PrivacyPage from "/assets/js-v6/app/privacy/page.js";
import TermsPage from "/assets/js-v6/app/terms/page.js";
import NotFound from "/assets/js-v6/app/not-found.js";
import { Header } from "/assets/js-v6/components/Header.js";
import { Footer } from "/assets/js-v6/components/Footer.js";
import { CookieNotice } from "/assets/js-v6/components/CookieNotice.js";

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
  return window.location.pathname.replace(/\/+$/,'') || '/';
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
    const url = new URL(rawHref, window.location.href);
    if(url.origin !== window.location.origin) return null;
    if(url.pathname === '/estimate' || url.pathname === '/estimate/') url.pathname = '/plan/';
    const leaf = url.pathname.split('/').pop();
    if(url.pathname !== '/' && !url.pathname.endsWith('/') && !leaf.includes('.')) url.pathname += '/';
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

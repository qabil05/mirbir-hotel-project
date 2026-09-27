import { useMemo } from "__MIRBIR_BASE__assets/vendor-v6/react.js";
function go(href, replace=false){
  if(typeof window.__mirbirNavigate === "function") window.__mirbirNavigate(href, replace);
  else if(replace) window.location.replace(href);
  else window.location.assign(href);
}
export function useRouter(){ return {push:(href)=>go(href,false),replace:(href)=>go(href,true),back:()=>history.back(),prefetch:()=>Promise.resolve(),refresh:()=>window.location.reload()}; }
export function useSearchParams(){ return useMemo(()=>new URLSearchParams(window.location.search),[window.location.search]); }
export function notFound(){ throw new Error("MIRBIR_NOT_FOUND"); }
export function redirect(href){ go(href,true); return null; }

import { createElement, useEffect, useState } from "__MIRBIR_BASE__assets/vendor-v6/react.js";
export default function dynamic(loader, options={}){
  let Cached=null; let pending=null;
  return function DynamicComponent(props){
    const [Comp,setComp]=useState(()=>Cached);
    useEffect(()=>{
      if(Cached){ setComp(()=>Cached); return; }
      pending ||= Promise.resolve(loader()).then((mod)=>{ Cached=mod?.default || mod; return Cached; });
      pending.then((c)=>setComp(()=>c));
    },[]);
    if(!Comp) return options.loading ? createElement(options.loading) : null;
    return createElement(Comp,props);
  };
}

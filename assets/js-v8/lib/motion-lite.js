import { createElement, useEffect, useMemo, useState } from "__MIRBIR_BASE__assets/vendor-v6/react.js";

export function AnimatePresence({ children }) {
  return children ?? null;
}

export function useReducedMotion() {
  const get = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [reduced, setReduced] = useState(get);
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function easingValue(ease) {
  if (Array.isArray(ease) && ease.length === 4) return `cubic-bezier(${ease.join(",")})`;
  if (typeof ease === "string") return ease;
  return "cubic-bezier(.16,1,.3,1)";
}

function toStyle(state) {
  if (!state || state === false) return {};
  const out = {};
  if (state.opacity != null) out.opacity = state.opacity;
  const transforms = [];
  if (state.x != null) transforms.push(`translateX(${typeof state.x === "number" ? `${state.x}px` : state.x})`);
  if (state.y != null) transforms.push(`translateY(${typeof state.y === "number" ? `${state.y}px` : state.y})`);
  if (state.scale != null) transforms.push(`scale(${state.scale})`);
  if (transforms.length) out.transform = transforms.join(" ");
  return out;
}

const cache = new Map();
function motionTag(tag) {
  if (cache.has(tag)) return cache.get(tag);
  function MotionElement({ initial, animate, exit, transition, style, ...props }) {
    const [mounted, setMounted] = useState(initial === false);
    useEffect(() => {
      if (initial === false) return;
      const id = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(id);
    }, [initial]);
    const transitionCss = useMemo(() => {
      const seconds = transition?.duration ?? (transition?.type === "spring" ? 0.38 : 0.35);
      return `opacity ${seconds}s ${easingValue(transition?.ease)}, transform ${seconds}s ${easingValue(transition?.ease)}`;
    }, [transition]);
    const motionStyle = initial === false || mounted ? toStyle(animate) : toStyle(initial);
    return createElement(tag, { ...props, style: { ...style, ...motionStyle, transition: transitionCss } });
  }
  cache.set(tag, MotionElement);
  return MotionElement;
}

export const motion = new Proxy({}, {
  get(_target, prop) {
    return motionTag(prop);
  },
});

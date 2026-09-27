import { jsx } from "/assets/vendor-v6/react-jsx-runtime.js";
export default function Link({href,children,...props}){ return jsx("a",{href:typeof href==="string"?href:(href?.pathname||"/"),...props,children}); }

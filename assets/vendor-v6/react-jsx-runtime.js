import React from "./react.js";
export const Fragment = React.Fragment;
function makeElement(type, config, maybeKey) {
  const props = config == null ? {} : { ...config };
  let key = maybeKey;
  if (key === undefined && Object.prototype.hasOwnProperty.call(props, "key")) key = props.key;
  if (Object.prototype.hasOwnProperty.call(props, "key")) delete props.key;
  if (key !== undefined) props.key = key;
  return React.createElement(type, props);
}
export const jsx = makeElement;
export const jsxs = makeElement;
export const jsxDEV = makeElement;

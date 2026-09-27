import { createElement } from "/assets/vendor-v6/react.js";

function icon(path, extra = {}) {
  return function Icon({ size = 24, weight = "regular", color = "currentColor", ...props }) {
    const strokeWidth = weight === "bold" ? 2.4 : 1.8;
    return createElement(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": props["aria-label"] ? undefined : "true",
        focusable: "false",
        ...props,
      },
      ...(Array.isArray(path) ? path : [path]).map((d, i) =>
        createElement("path", { d, key: i, ...extra })
      )
    );
  };
}

export const XIcon = icon(["M6 6l12 12", "M18 6L6 18"]);
export const CaretLeftIcon = icon("M15 5l-7 7 7 7");
export const CaretRightIcon = icon("M9 5l7 7-7 7");
export const MinusIcon = icon("M5 12h14");
export const PlusIcon = icon(["M5 12h14", "M12 5v14"]);

import { createElement, JSX } from "./core.ts";

export { Component, createElement, Fragment } from "./core.ts";
export type { FC, FunctionComponent, JSX } from "./core.ts";

export { _ } from "./utils.ts";

export function renderToString(element: JSX.Element) {
  return createElement(element).toString();
}

export function renderWithDeclaration(
  element: JSX.Element,
  declaration?: Record<string, string> | null,
) {
  let declarationString;
  if (declaration === null) {
    declarationString = "";
  } else if (declaration === undefined) {
    declarationString = '<?xml version="1.0" encoding="UTF-8"?>';
  } else {
    declarationString = "<?xml " +
      Object.entries(declaration).map(([k, v]) => `${k}="${v}"`).join("") +
      "?>";
  }
  return declarationString + renderToString(element);
}

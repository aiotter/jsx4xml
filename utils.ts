import * as xml from "./mod.ts";

// <_ tag:with:namespace />
// => createElement("tag:with:namespace", {})
export const _ = <T extends Record<string, string | true>>(
  { children, ...props }: T & Partial<xml.JSX.ElementChildrenAttribute>,
) => {
  const entries = Object.entries(props as T);
  const tagName = props._ as string | undefined ??
    entries.find(([_, v]) => v === true)?.[0];

  if (!tagName) throw new Error("Tag name not found!");
  delete props._;
  delete props[tagName];

  if (
    !tagName.startsWith("?") && Object.values(props).some((v) => v === true)
  ) {
    throw new Error("No more than one property without value is invalid!");
  }

  return xml.createElement(
    tagName,
    props as Record<string, string>,
    ...(Array.isArray(children) ? children : [children]),
  );
};

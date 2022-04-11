import * as jsx4xml from "../mod.ts";

function createElement(
  type: Parameters<typeof jsx4xml.createElement>[0],
  props: Record<string, unknown>,
  key: string,
  _source?: unknown,
  _self?: unknown,
) {
  let { children = [], ..._props } = props;
  if (!Array.isArray(children)) children = [children];
  return jsx4xml.createElement(
    type,
    key ? { ..._props, key } : _props,
    ...children as unknown[],
  );
}

export { createElement as jsx };
export { createElement as jsxs };
export { createElement as jsxDev };

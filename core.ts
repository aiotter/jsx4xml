import { Element, fragment, isElement } from "./element.ts";
import type { Element as E } from "./element.ts";

export type Child =
  | JSX.Element
  | string
  | undefined
  | null;

type Props = Partial<
  JSX.ElementChildrenAttribute & JSX.ElementAttributesProperty
>;

// deno-lint-ignore no-namespace
export namespace JSX {
  export type Element = E;
  export interface ElementAttributesProperty {
    props: Record<string, unknown>;
  }
  export interface IntrinsicElements {
    [elementName: string]: unknown;
  }
  export interface ElementClass {
    render(): Element;
  }
  export interface ElementChildrenAttribute {
    children: Child | Child[];
  }
}

type ElementConstructor<T extends Props | null> = T extends Props
  ? { new (props: T): JSX.ElementClass }
  : { new (): JSX.ElementClass };

function isElementConstructor(
  constructor: unknown,
): constructor is ElementConstructor<Props> {
  return typeof constructor === "function" &&
    constructor.prototype?.constructor === constructor;
}

export type FunctionComponent<T extends Props | null> = T extends Props
  ? (props: T) => JSX.Element
  : () => JSX.Element;
export type FC<T extends Props | null> = FunctionComponent<T>;

export interface Component<T extends Props> {
  props: T;
  render(): JSX.Element;
}
export class Component<T extends Props> implements JSX.ElementClass {
  props: T;
  constructor(props: T) {
    this.props = props;
  }
}

export function createElement(
  type: string,
  props?: Record<string, string> | null,
  ...children: Child[]
): JSX.Element;

export function createElement(
  type: typeof fragment,
  props: null,
  ...children: Child[]
): JSX.Element;

export function createElement<T extends Props>(
  type: FunctionComponent<T>,
  props?: JSX.ElementAttributesProperty[keyof JSX.ElementAttributesProperty],
  ...children: Child[]
): JSX.Element;

export function createElement(type: JSX.Element): JSX.Element;
export function createElement(
  type: JSX.ElementClass,
  props?: Record<string, string>,
  ...children: Child[]
): JSX.Element;

export function createElement(
  type:
    | JSX.ElementClass
    | FunctionComponent<null>
    | JSX.Element,
): JSX.Element;

export function createElement(
  type:
    | string
    | JSX.ElementClass
    | ElementConstructor<Props>
    | FunctionComponent<Props>
    | FunctionComponent<null>
    | JSX.Element
    | typeof fragment,
  props?: Record<string, unknown> | null,
  ...children: unknown[]
): JSX.Element {
  // Children can be nested
  const flattenChildren = children.flat(Infinity) as Child[];

  if (isElementConstructor(type)) {
    const component = new type({ ...props, children: flattenChildren });
    return component.render();
  } else if (typeof type === "function") {
    if (type.length === 0) return (type as FC<null>)();
    return (type as FC<Props>)({ ...props, children: flattenChildren });
  } else if (isElement(type)) {
    return type;
  } else if (typeof type === "string") {
    const tagName = type;
    if (tagName.toLowerCase().startsWith("xml")) {
      throw new Error("Tag name starting with 'xml' is against xml spec!");
    }
    if (props && Object.values(props).some((v) => typeof v !== "string")) {
      throw new Error("Property value must be strings!");
    }
    return new Element(
      tagName,
      props as Record<string, string> ?? {},
      flattenChildren,
    );
  } else if (type === fragment) {
    return new Element(fragment, {}, flattenChildren);
  } else {
    return type.render();
  }
}

export const Fragment = (
  { children }: { children: Child[] },
) => createElement(fragment, null, ...children);

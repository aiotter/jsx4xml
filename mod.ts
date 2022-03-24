const fragment = Symbol("Flagment");
const proofOfElement = Symbol("Element");

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: Record<string, string>;
    }
  }
}

class Element {
  elementName: string | typeof fragment;
  attributes: Record<string, string>;
  children: Element[];
  [proofOfElement]: true;
  constructor(
    elementName: string | typeof fragment,
    attributes: Record<string, string>,
    children: Element[],
  ) {
    this.elementName = elementName;
    this.attributes = attributes;
    this.children = children;
    this[proofOfElement] = true;
  }

  toString(): string {
    if (this.elementName === fragment) {
      return this.children.map((child) => child.toString()).join("");
    }

    let attributesString = Object.entries(this.attributes)
      .map(([k, v]) => [
        k,
        v.replace(/'/g, "&apos;")
          .replace(/"/g, "&quot;")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;"),
      ])
      .map(([k, v]) => `${k}="${v}"`)
      .join(" ");

    attributesString = (attributesString.length > 0)
      ? attributesString = " " + attributesString
      : "";

    if (this.children.length > 0) {
      return `<${this.elementName}${attributesString}>${
        this.children.map((child) => child.toString()).join("")
      }</${this.elementName}>`;
    } else {
      return `<${this.elementName}${attributesString}/>`;
    }
  }
}

// deno-lint-ignore no-explicit-any
function isElement(element: any): element is Element {
  return element[proofOfElement] === true;
}

interface Props {
  children?: unknown[];
  [propertyName: string]: unknown;
}

export type FunctionComponent<T extends Props> = ((props?: T) => Element);
export type FC<T extends Props> = FunctionComponent<T>;

export interface Component {
  render(props: Props): Element;
}

export const Fragment = ({ children }: { children: Element[] }) =>
  createElement(fragment, null, ...children);

export function createElement(
  type: string | Component | FC<Props> | Element | typeof fragment,
  props?: Record<string, string> | null,
  ...children: unknown[]
): Element {
  if (typeof type === "function") {
    return type({ ...props, children });
  } else if (typeof type === "object") {
    if (isElement(type)) return type;
    return type.render({ ...props, children });
  } else {
    return new Element(type, props ?? {}, children as Element[]);
  }
}

export function renderToString(
  component: Component | FunctionComponent<Props> | Element,
) {
  return createElement(component).toString();
}

export function renderWithDeclaration(
  component: Component | FunctionComponent<Props> | Element,
  declaration?: Record<string, string>,
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
  return declarationString + renderToString(component);
}

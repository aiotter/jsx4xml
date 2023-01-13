function escape(s: string): string {
  return s.replace(/&/g, "&amp;")
    .replace(/'/g, "&apos;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const proofOfElement = Symbol("Element");
export const fragment = Symbol("Flagment");

export class Element {
  elementName: string | typeof fragment;
  props: Record<string, string>;
  children: (Element | string | undefined | null)[];
  [proofOfElement]: true;

  constructor(
    elementName: Element["elementName"],
    props: Element["props"],
    children: Element["children"],
  ) {
    this.elementName = elementName;
    this.props = props;
    this.children = children;
    this[proofOfElement] = true;
  }

  toString(): string {
    if (this.elementName == fragment) {
      return this.children.map((child) => child?.toString() ?? "").join("");
    }

    let attributesString = Object.entries(this.props)
      .map(([k, v]) => `${k}="${escape(v)}"`)
      .join(" ");

    attributesString = (attributesString.length > 0)
      ? attributesString = " " + attributesString
      : "";

    if (this.children.length > 0) {
      const value = this.children.map((child) =>
        typeof child === "string" ? escape(child) : child?.toString() ?? ""
      ).join("");
      return `<${this.elementName}${attributesString}>${value}</${this.elementName}>`;
    } else {
      return `<${this.elementName}${attributesString}/>`;
    }
  }
}

// deno-lint-ignore no-explicit-any
export function isElement(element: any): element is Element {
  return element[proofOfElement] === true;
}

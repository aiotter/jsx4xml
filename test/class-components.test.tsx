/** @jsx xml.createElement */
/** @jsxFrag xml.Fragment */

import * as xml from "../mod.ts";
import { assertEquals } from "https://deno.land/std@0.131.0/testing/asserts.ts";

Deno.test(function simpleComponent() {
  class Hello extends xml.Component<Record<string, never>> {
    render() {
      return <greet>Hello, world!</greet>;
    }
  }
  assertEquals(xml.renderToString(<Hello />), "<greet>Hello, world!</greet>");
})

Deno.test(function componentWithChildren() {
  class Hello extends xml.Component<{children: string;}> {
    render() {
      return <greet>Hello, {this.props.children}!</greet>;
    }
  }
  assertEquals(xml.renderToString(<Hello>world</Hello>), "<greet>Hello, world!</greet>");
})

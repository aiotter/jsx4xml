/** @jsx xml.createElement */
/** @jsxFrag xml.Fragment */

import * as xml from "../mod.ts";
import { assertEquals } from "https://deno.land/std@0.131.0/testing/asserts.ts";

const _ = xml._;

Deno.test(function atomLink() {
  assertEquals(
    xml.renderToString(
      <_
        atom:link
        href="https://example.com"
        rel="self"
        type="application/rss+xml"
      />,
    ),
    '<atom:link href="https://example.com" rel="self" type="application/rss+xml"/>',
  );
});

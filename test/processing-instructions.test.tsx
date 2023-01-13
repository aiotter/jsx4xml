/** @jsx createElement */
/** @jsxFrag Fragment */

import { _, createElement, renderToString } from "../mod.ts";
import { assertEquals } from "https://deno.land/std@0.131.0/testing/asserts.ts";

Deno.test(function breakBrowser() {
  assertEquals(renderToString(<_ _="?browser" break />), "<?browser break?>");
});

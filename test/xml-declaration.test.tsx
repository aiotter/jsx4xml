/** @jsx createElement */
/** @jsxFrag Fragment */

import { XML, createElement, renderToString } from "../mod.ts";
import { assertEquals } from "https://deno.land/std@0.131.0/testing/asserts.ts";

Deno.test(function xml1() {
  assertEquals(
    renderToString(<XML version="1.0" encoding="UTF-8" />),
    '<?xml version="1.0" encoding="UTF-8"?>',
  );
});

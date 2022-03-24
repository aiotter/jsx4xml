import * as React from "../mod.ts";
import { assertEquals } from "https://deno.land/std@0.131.0/testing/asserts.ts";

Deno.test(function simpleRSS() {
  assertEquals(
    React.renderToString(
      <rss version="2.0">
        <channel>
          <title>Channel Title</title>
          <link>http://example.com</link>
          <description>Channel Description</description>
          <item>
            <title>item0</title>
            <link>http://example.com/item0/</link>
          </item>
        </channel>
      </rss>,
    ),
    '<rss version="2.0"><channel><title>Channel Title</title><link>http://example.com</link><description>Channel Description</description><item><title>item0</title><link>http://example.com/item0/</link></item></channel></rss>',
  );
});

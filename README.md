# JSX for XML

Another JSX Runtime but for XML, built for Deno!

## Usage

### Via JSX pragma (Recommended)

```tsx
/** @jsx xml.createElement */
/** @jsx xml.Fragment */

import * as xml from "https://deno.land/x/jsx4xml/mod.ts";
console.log(xml.renderToString(<hello place="world" />));
```

### Via React compartible mode

```tsx
import * as React from "https://deno.land/x/jsx4xml/mod.ts";
console.log(React.renderToString(<hello place="world" />));
```

## Example

### RSS

```tsx
/** @jsx xml.createElement */

import * as xml from "https://deno.land/x/jsx4xml/mod.ts";

interface Item {
  title: string;
  link: string;
}

const Rss = ({ items }: { items: Item[] }) => (
  <rss version="2.0">
    <channel>
      <title>Channel Title</title>
      <link>http://example.com</link>
      <description>Channel Description</description>
      {items.map((item) => (
        <item>
          <title>{item.title}</title>
          <link>{item.link}</link>
        </item>
      ))}
    </channel>
  </rss>
);

console.log(
  // Add XML declaration at the beginning
  xml.renderWithDeclaration(
    <Rss
      items={[
        { title: "title0", link: "https://example.com/posts/0/" },
        { title: "title1", link: "https://example.com/posts/1/" },
      ]}
    />,
  ),
);
```

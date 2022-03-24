# JSX for XML

Another JSX Runtime but for XML, built for Deno!

## Usage

1. Via JSX pragma (Recommended)

```tsx
/** @jsx xml.createElement */
/** @jsx xml.Fragment */

import * as xml from "https://deno.land/x/jsx4xml/mod.ts";
console.log(xml.renderToString(<hello place="world" />));
```

2. Via React compartible mode

```tsx
import * as React from "https://deno.land/x/jsx4xml/mod.ts";
console.log(xml.renderToString(<hello place="world" />));
```

<!-- Generated from https://docs.linkzly.com/docs/sdk-web#installation by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Installation

Source: https://docs.linkzly.com/docs/sdk-web#installation

**SDK version:** 1.1.0

```bash
npm install @linkzly/web-sdk@1.1.0
```

With Yarn or pnpm:

```bash
yarn add @linkzly/web-sdk@1.1.0
pnpm add @linkzly/web-sdk@1.1.0
```

```typescript
import LinkzlySDK, { Environment } from '@linkzly/web-sdk';
```

The package also has named exports for every method, for example `import { configure, trackEvent } from '@linkzly/web-sdk'`. They call the same single SDK instance as the default export.

### Script tag

Without a bundler, load the browser build from the npm CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@linkzly/web-sdk@1.1.0/cdn/cdn.js"></script>
<script>
  LinkzlySDK.configure('slk_your_key_from_console');
</script>
```

The script defines one global, `LinkzlySDK`, with the same methods as the package. Keep the version in the address, so a new release reaches your site only when you change it.

The script build has no `Environment` object. Leave the environment out (production is the default), or pass `0` for production when you also pass options:

```html
<script>
  LinkzlySDK.configure('slk_your_key_from_console', 0, { autoTrackPageViews: true });
</script>
```

<!-- Generated from https://docs.linkzly.com/docs/sdk-web#initialization by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Initialization

Source: https://docs.linkzly.com/docs/sdk-web#initialization

```typescript
import LinkzlySDK, { Environment } from '@linkzly/web-sdk';

LinkzlySDK.configure('slk_your_key_from_console', Environment.PRODUCTION);
```

Signature: `configure(sdkKey, environment = Environment.PRODUCTION, options?)`.

Call `configure` once on every page load, in the browser, before any other SDK call. A second call is ignored (the SDK logs a warning when `debug` is on). Other calls made before `configure` fail: the `track` methods, `trackEventBatch` and `flushEvents` return a rejected promise, and `handleSmartLink`, `addDeepLinkListener`, `getPendingEventCount` and the session methods throw.

`configure` throws an error when the key is not `slk_` followed by at least 40 hexadecimal characters. The placeholder in these examples is not a valid key, so put your real key in before you load the page.

Environments are `Environment.PRODUCTION`, `Environment.STAGING` and `Environment.DEVELOPMENT` (which also turns on debug logging). `STAGING` and `DEVELOPMENT` send to separate Linkzly backends, so events sent with them never show in your console. Use `PRODUCTION` with the key from your console.

| Option | Default | What it does |
|---|---|---|
| `autoTrackPageViews` | `false` | Sends a `page_view` event when the page loads and on every single-page-app navigation |
| `autoTrackFirstVisit` | `true` | Sends an `install` event on a browser's first visit. Set `false` when you add the SDK to a site that already has visitors (see below) |
| `autoTrackSessions` | `true` | Starts and ends sessions from the page's visibility, sending `open` and `session_end`. With `false`, they are sent only when you call `startSession()` and `endSession()` |
| `autoExtractUTM` | `true` | Reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_term` and `utm_content` from the landing URL and adds them to every event of the session |
| `autoCaptureReferrer` | `true` | Records the external referrer of the session's first page. Every event's browser details include the page's `document.referrer` whichever way this is set |
| `respectDNT` | `true` | Sends nothing while the browser sends Do Not Track or Global Privacy Control, unless your site calls `setTrackingEnabled(true)` (see Privacy Controls) |
| `batchSize` | `20` | Queued events that trigger a send |
| `flushIntervalMs` | `30000` | How often the queue is sent, in milliseconds |
| `sessionTimeoutMs` | `1800000` | Inactivity after which a new session starts, in milliseconds (30 minutes) |
| `debug` | `false` | Logs what the SDK does to the browser console, prefixed `[LinkzlySDK]`. On by default with `Environment.DEVELOPMENT`. Errors are always logged |

```typescript
LinkzlySDK.configure('slk_your_key_from_console', Environment.PRODUCTION, {
  autoTrackPageViews: true,
  autoTrackFirstVisit: true,
});
```

**Adding the SDK to a site that already has visitors.** Every browser that has not run the SDK before counts as a first visit, so every returning visitor would be reported as an install on their next visit. Set `autoTrackFirstVisit: false` for that release. The SDK still marks each browser as seen, so turning the option back on later does not report those visitors either.

### React and Next.js

In the Next.js App Router, configure the SDK from a client component and render it once in the root layout:

```tsx
// app/linkzly.tsx
'use client';

import { useEffect } from 'react';
import LinkzlySDK, { Environment } from '@linkzly/web-sdk';

export function Linkzly() {
  useEffect(() => {
    LinkzlySDK.configure('slk_your_key_from_console', Environment.PRODUCTION, {
      autoTrackPageViews: true, // a page view for every client-side navigation
    });
  }, []);
  return null;
}
```

```tsx
// app/layout.tsx
import { Linkzly } from './linkzly';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Linkzly />
        {children}
      </body>
    </html>
  );
}
```

In a React app without Next.js, put the same `useEffect` in your root component. React's development mode runs the effect twice; the second `configure` is ignored.

### Vue

```typescript
// main.ts
import { createApp } from 'vue';
import LinkzlySDK from '@linkzly/web-sdk';
import App from './App.vue';

LinkzlySDK.configure('slk_your_key_from_console');
createApp(App).mount('#app');
```

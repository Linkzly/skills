<!-- Generated from https://docs.linkzly.com/docs/sdk-web#prerequisites by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Prerequisites

Source: https://docs.linkzly.com/docs/sdk-web#prerequisites

The SDK sends data to one app registered in the Linkzly console, using that app's SDK key.

1. Open **Apps** in the console and choose **Register App**.
2. On the **Platforms & Config** step, select **Web** under Target Platforms and enter your site's address as the **Fallback URL**. Smart links send desktop visitors to that address.
3. Finish the remaining steps (see [Registering an App](https://docs.linkzly.com/docs/apps#registering-an-app)).
4. Copy the SDK key: open **Apps**, choose **Manage app** on the app, and find **SDK Configuration** on the **Overview** tab.

| Requirement | Value |
|---|---|
| Browser | The package is compiled for ES2020: Chrome 80, Edge 80, Firefox 74, Safari 13.1 or later. To support older browsers, have your bundler transpile it. |
| Build setup | Any bundler that reads ES modules or CommonJS (Vite, webpack, Next.js and others), or none with the script tag |

Your SDK key starts with `slk_` and identifies one app. Use it only on the sites of that app.

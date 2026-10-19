---
name: linkzly-web-sdk
description: Use when adding, updating or debugging the Linkzly Web SDK (@linkzly/web-sdk) on a website or web app - installing it with npm or a script tag, configuring it, tracking events, page views, purchases or refunds, smart link and UTM attribution, consent and Do Not Track - or when a site's Linkzly events or purchases are not showing up. Not for iOS, Android, React Native or Flutter apps, their web builds included (use linkzly-mobile-sdk), Gaming Intelligence events from a web game, the Linkzly REST API, or creating links and QR codes.
---

# Linkzly Web SDK

Linkzly is a service for analytics, smart links and attribution. A website sends it data through the Linkzly Web SDK, `@linkzly/web-sdk`. The person you are working for manages their account in the Linkzly console, a website only they can sign in to.

The files under `references/`, beside this file, are the Linkzly Web SDK docs, one section per file. Read the file for a step before you write its code or answer a question about it. Work from the files, not from memory: several of the SDK's behaviours are not what you would guess, and the Rules below name them. Some files link to Linkzly's shared guides for events and purchases; those guides are written for the mobile SDKs, so where they and these files differ, these files are right for a website.

## Order of work

1. **Find the site and its setup** (next section). Every file you read is under `references/web/sdk/`.
2. **Read `references/index.md`.** It lists every file and the SDK version the files were written for.
3. **Look for an existing integration.** Search the project for `@linkzly/web-sdk` and `LinkzlySDK`. If the SDK is already there, read its version from `package.json` or the script address, keep what works and change only what the task needs. Build on the `configure` call that is there, and never add a second one.
4. **Ask the person** for what the task needs and you do not have, and wait for the answer (the Asking section).
5. **Install and configure**, reading in this order: `references/web/sdk/prerequisites.md`, `references/web/sdk/installation.md`, `references/web/sdk/initialization.md`, `references/web/sdk/what-the-sdk-sends-for-you.md`. Build the site, or start its dev server, before going on.
6. **Events**, if wanted: `references/web/sdk/tracking-events.md`.
7. **Purchases**, if wanted: `references/web/sdk/tracking-purchases.md`.
8. **Smart links, user identity and consent**, each if asked for: `references/web/sdk/smart-links-and-attribution.md`, `references/web/sdk/user-identity.md`, `references/web/sdk/privacy-controls.md`.
9. **Build again**, and run what can be run here, with the `debug` option on to watch the browser console. `references/web/sdk/troubleshooting.md` covers the usual failures.
10. **Hand back** (the Hand back section).

When the request is to find a fault (events or purchases not showing up), do steps 1 to 3, then start from the Rules, which name the usual causes, and from `references/web/sdk/troubleshooting.md`.

## Finding the setup

Find the site's root folder, check it against these rows in order, and stop at the first match:

| The project has | Install with | `configure` goes in |
|---|---|---|
| a `package.json` that depends on `react-native` or `expo`, or a `pubspec.yaml` that depends on `flutter` | nothing here: it is an app, so use the `linkzly-mobile-sdk` skill | |
| a `package.json` that depends on `next`, with an `app/` folder | npm | a `'use client'` component that calls it inside `useEffect`, rendered once in the root layout |
| a `package.json` that depends on `react` (a Next.js app with only `pages/` included: its root component is `pages/_app`) | npm | the same `useEffect`, in the root component |
| a `package.json` that depends on `vue` | npm | `main.ts`, before `createApp(...).mount(...)` |
| any other `package.json` | npm | code that runs in the browser, once per page load |
| HTML pages and no `package.json` | the script tag | a script after the SDK's script tag, on every page |

`references/web/sdk/initialization.md` has the code for each row. It does not cover Nuxt or other frameworks that render Vue or other code on the server: for those, tell the person what you found and ask where browser-only code should go.

This step is done when you can name one site and its row. If the project holds more than one site or app and the person has not said which, or nothing in it matches the table, stop here: tell the person what you found and ask which one to work on. That question is your whole reply, whatever else they asked.

## Asking the person

Before you change the project, list what the task needs and you do not have:

- **The SDK key.** It starts with `slk_` and belongs to one app, registered in the console with Web as a target platform. You have it when the request gives it, or when the project's `configure` call already holds a real key. `references/web/sdk/prerequisites.md` gives the console steps that register the app and show the key.
- **Whether the site already has visitors.** It decides `autoTrackFirstVisit` (Rules). You have it when the request says the site is new or already live, or when the SDK is already installed.
- **Whether the site must have the visitor's consent before tracking.** You have it when the request says so either way.
- **Which Linkzly products to set up**: events, page views, purchases, smart link attribution. You have it when the request says what to add. Set up only those.

If something on the list is missing, stop here: ask for all of it in one message. Those questions are your whole reply, and you change no file until the person answers: an integration without their key cannot be checked, and the other answers change what you write.

Go on without the answer in one case only: you were told to. The person said not to wait for them, or your instructions say outright that nobody can reply. Then write the placeholder where the key belongs (first rule), take the answers the request implies, and say in the hand-back what you assumed. How the session looks is not being told: a question that nobody answers at once is still read when the person comes back, so ask it and stop.

If nothing is missing, ask nothing. A request to find a fault, or to add to a site that is already integrated, works with the key the project has. A question about the SDK is answered from the reference files and is not held up by this stop.

The steps done in the Linkzly console are the person's to click and yours to guide. Tell them where to go, in the words the reference file uses for each screen, and carry on when they give you the value or say it is done.

## Rules

- **Ask the person for the SDK key and use the one they give you. Never make one up.** Help with every step, including the ones done in the console. If code has to build before the key arrives, write the placeholder `slk_your_key_from_console`. `configure` throws on the placeholder, so the site sends nothing until the real key is in: say so, name the file that holds it, and ask for the key when you hand back (`references/web/sdk/prerequisites.md`) (`references/web/sdk/initialization.md`).
- **Call `configure` once per page load, in the browser, before any other SDK call.** In a framework that renders on the server, call it only from browser code, as the Finding the setup table says. A second call is ignored, and SDK calls made before it fail (`references/web/sdk/initialization.md`).
- **`configure` sends the install (on a browser's first visit), the open and the session end itself.** Leave `trackFirstVisit()` and `trackOpen()` out while those automatic events are on: each call sends one more event (`references/web/sdk/what-the-sdk-sends-for-you.md`).
- **On a site that already has visitors, set `autoTrackFirstVisit: false` for the release that adds the SDK.** Otherwise every returning visitor is counted as an install (`references/web/sdk/initialization.md`).
- **Every custom event name must be registered for the app in the Linkzly console.** An event with an unregistered name is dropped while the call still succeeds. `page_view`, `time_on_page`, `scroll_depth` and `outbound_click` are built in and need no registration; send page views with `autoTrackPageViews` or `trackPageView`. List the custom names you used so the person can register them (`references/web/sdk/tracking-events.md`) (`references/web/sdk/what-the-sdk-sends-for-you.md`).
- **Purchases go only through `trackPurchase`, once per order, after the payment has succeeded,** with `revenue` above 0, `currency` and `transactionId`. A call without them is ignored and is logged only with `debug` on. A refund is `trackRefund` with the purchase's `transactionId`. Purchases are recorded only when Revenue & LTV is enabled for the person's organisation (`references/web/sdk/tracking-purchases.md`).
- **`setTrackingEnabled(false)` stops everything the SDK sends,** install, open and session end included. A site that must send nothing before consent calls `configure` only after the visitor agrees, and calls `setTrackingEnabled(true)` just before it when consent should override Do Not Track and Global Privacy Control, which the SDK obeys by default. Calling `setTrackingEnabled(false)` before `configure` loses that browser's install for good (`references/web/sdk/privacy-controls.md`).
- **Use the install lines exactly as the Linkzly docs write them, version included:** the npm, Yarn or pnpm line with its pinned version, or the jsDelivr script address with the version in it. The script build has no `Environment` object (`references/web/sdk/installation.md`).
- **Use `Environment.PRODUCTION` with the key from the console.** Events sent with `STAGING` or `DEVELOPMENT` go to other backends and never show in the console (`references/web/sdk/initialization.md`).

## Hand back

End with one message that lists:

- the files you changed;
- what you built or ran, and the result;
- which Linkzly environment the code sends to, production or staging. For staging, say what changes before the site goes live: the production environment, a key from the production console, and the custom event names registered in that console;
- what you still need from the person. If the placeholder is still in the code, ask for the SDK key in plain words and name the file that holds the placeholder;
- what you assumed, if you went on without an answer;
- what is left for the person to do, each item with the console screen as the reference file names it: the app to register with Web as a target platform and the site's address as its Fallback URL, each custom event name to register (the built-in events need none), that Revenue & LTV has to be enabled for their organisation if purchases are tracked (they ask Linkzly support), and, if you set `autoTrackFirstVisit: false`, that it can be turned back on in a later release.

Say the integration works only where you saw it work. A call that succeeds is not proof: an event with an unregistered name and a purchase without Revenue & LTV both report success.

## If the project's SDK is newer than these files

`references/index.md` names the SDK version these files were written for. If the project uses a newer one, read the live page for that section instead. Every file has a `Source:` line with the page's address; put `.md` after the page name and before any `#` to get the page as markdown, for example `https://docs.linkzly.com/docs/sdk-web.md`. If the live page cannot be read, use the file here and say so when you hand back.

---
name: linkzly-mobile-sdk
description: Use when adding, updating or debugging the Linkzly SDK in an iOS, Android, React Native or Flutter app - installing or configuring it, tracking events, purchases or refunds, handling deep links or deferred deep links, registering push tokens, affiliate attribution, SKAdNetwork or tracking permission, privacy controls - or when a mobile app's Linkzly events, purchases or pushes are not showing up. Not for the Linkzly REST API, the web SDK, or creating links and QR codes.
---

# Linkzly mobile SDK

Linkzly is a service for app analytics, deep links, push notifications and attribution. An app sends it data through the Linkzly SDK. The person you are working for manages their account in the Linkzly console, a website only they can sign in to.

The files under `references/`, beside this file, are the Linkzly docs, cut to one platform and one topic each. Read the file for a step before you write its code or answer a question about it. Work from the files, not from memory: several of the SDK's behaviours are not what you would guess, and the Rules below name them.

## Order of work

1. **Find the app and its platform** (next section). Everything you read afterwards is under `references/<platform>/`.
2. **Read `references/index.md`.** It lists every file for each platform and the SDK version the files were written for.
3. **Look for an existing integration.** Search the project for `Linkzly`. If the SDK is already there, read its version from the project's install line, not from the installed package (the last section covers a version newer than these files), keep what works and change only what the task needs. Build on the `configure` call and the install lines that are there, and never add a second `configure` call.
4. **Ask the person** for what the task needs and you do not have, and wait for the answer (the Asking section).
5. **Install and configure**, reading in this order: `references/<platform>/sdk/prerequisites.md`, `references/<platform>/sdk/installation.md`, `references/<platform>/sdk/platform-setup.md`, `references/<platform>/sdk/initialization.md`. Build the app before going on.
6. **Events**, if wanted: `references/<platform>/events/sending-a-custom-event.md`, then `references/<platform>/events/naming-events.md`.
7. **Purchases**, if wanted: `references/<platform>/purchases/the-purchase-contract.md`, then `references/<platform>/purchases/where-to-call-it.md`.
8. **Each integration the person asked for.** There is one file per integration under `references/<platform>/integrations/`: deep links, deferred deep links, push notifications, affiliate attribution, ad networks, SKAdNetwork and tracking permission, revenue, gaming tracking, privacy controls. Each says what it does and gives the console steps, the project setup and the SDK calls. `references/<platform>/integrations/start-from-your-product.md` says which ones a Linkzly product needs.
9. **Build again**, and run what can be run here. `references/<platform>/integrations/setup-checklist.md` lists what a finished integration has and how to confirm it works, and `references/<platform>/sdk/troubleshooting.md` covers the usual failures.
10. **Hand back** (the Hand back section).

When the request is to find a fault (events, purchases or pushes not showing up), do steps 1 to 3, then start from the Rules, which name the usual causes, and from `references/<platform>/events/confirming-events-arrive.md`, `references/<platform>/events/common-mistakes.md`, `references/<platform>/purchases/testing.md` and `references/<platform>/sdk/troubleshooting.md`.

## Finding the platform

Find the app's root folder, check it against these rows in order, and stop at the first match:

| The app has | Platform folder |
|---|---|
| a `pubspec.yaml` that depends on `flutter` | `flutter` |
| a `package.json` that depends on `react-native` | `react-native` |
| an Xcode project or workspace, a `Package.swift` or a `Podfile` | `ios` |
| a Gradle module that applies `com.android.application` | `android` |

The `ios/` and `android/` folders inside a React Native or Flutter app are part of that app, not apps of their own. Its reference files cover the native setup it needs.

This step is done when you can name one app and its platform folder. If the project holds more than one app (an iOS project and an Android project side by side are two apps) and the person has not said which, or nothing in it matches the table, stop here: tell the person what you found and ask which app to work on. That question is your whole reply, whatever else they asked: the SDK, its install line and its setup differ for each platform, so the rest waits for their answer.

## Asking the person

Before you change the project, list what the task needs and you do not have:

- **The SDK key.** It starts with `slk_` and belongs to one app. You have it when the request gives it, or when the project's `configure` call already holds a real key. `references/<platform>/sdk/prerequisites.md` gives the console steps that register the app and show the key.
- **Which Linkzly products to set up**: app analytics, purchases and revenue, deep links, push, affiliate. You have it when the request says what to add. Set up only those.
- **Anything else only they can supply**, when a step needs it: the link domain for Associated Domains or App Links, the Firebase config file, a store product ID.

If something on the list is missing, stop here: ask for all of it in one message. Those questions are your whole reply, and you change no file until the person answers: an integration without their key cannot be checked, and their products decide what you set up.

Go on without the answer in one case only: you were told to. The person said not to wait for them, or your instructions say outright that nobody can reply. Then write the placeholder where the key belongs (first rule), and ask for the key when you hand back. How the session looks is not being told: a question that nobody answers at once is still read when the person comes back, so ask it and stop.

If nothing is missing, ask nothing. A request to find a fault, or to add to an app that is already integrated, works with the key the project has. A question about the SDK is answered from the reference files and is not held up by this stop.

The steps done in the Linkzly console or in Firebase are the person's to click and yours to guide. Tell them where to go, in the words the reference file uses for each screen, and carry on when they give you the value or say it is done.

## Rules

- **Ask the person for the SDK key and use the one they give you. Never make one up.** Help with every step, including the ones done in the Linkzly console: say where to go, and carry on when you have the value. If code has to compile before the key arrives, write the placeholder `slk_your_key_from_console`, and when you finish say which file holds it and ask for the key again. The same holds for any other value that only the console or another account can supply (`references/<platform>/sdk/prerequisites.md`) (`references/<platform>/sdk/initialization.md`).
- **Once `configure()` has run, the SDK sends the install and the opens itself.** Do not add `trackInstall` or `trackOpen`: each call sends one more event. The one exception is on Android, in a native, React Native or Flutter app: if the app has to read deferred deep link data in code, an explicit `trackInstall`, called once behind a first-launch flag, is the only way. It sends a second install event, so tell the person before you add it (`references/<platform>/events/what-the-sdk-sends-for-you.md`) (`references/<platform>/sdk/tracking-events.md`) (`references/<platform>/integrations/deferred-deep-links.md`).
- **Every custom event name must be registered for the app in the Linkzly console.** An event with an unregistered name is dropped while the call still reports success. List the names you used so the person can register them (`references/<platform>/events/sending-a-custom-event.md`).
- **Purchases go only through `trackPurchase`,** with `revenue`, `currency` and `transactionId`. A refund is `trackRefund` with the purchase's `transactionId`. Never send revenue as a custom event. Purchases are recorded only when Revenue & LTV is enabled for the person's organisation (`references/<platform>/purchases/the-purchase-contract.md`) (`references/<platform>/purchases/refunds.md`) (`references/<platform>/purchases/avoiding-double-counting.md`).
- **Push tokens are Firebase tokens on every platform.** On iOS pass the Firebase Cloud Messaging registration token, never the APNs device token, which cannot receive a Linkzly push. Call `setNotificationToken` after `configure` and again whenever the token refreshes (`references/<platform>/integrations/push-notifications.md`).
- **`setTrackingEnabled(false)` stops custom events, purchases and refunds only.** Install, open and session-end events are still sent, and on iOS so are `trackEventBatch` calls. An app that must send nothing before consent delays `configure` (`references/<platform>/integrations/privacy-controls.md`).
- **Use the install lines exactly as the Linkzly docs write them, version included.** React Native installs from a GitHub tag, not from npm. If the iOS SDK is added with CocoaPods, the pod needs its Git source and tag. Flutter's install line is the `pubspec.yaml` entry with its version, and it needs the pod pin in `ios/Podfile` (`references/<platform>/sdk/installation.md`).
- **The debug controls that change the batching strategy, batch size and flush interval do not work on iOS,** in a native, React Native or Flutter app alike: the published iOS SDK does not include them. Do not use them to test or confirm anything on iOS. `flushEvents` and `getPendingEventCount` are not among them and do work on iOS (`references/<platform>/events/batching-and-flushing.md`).

## Hand back

End with one message that lists:

- the files you changed;
- what you built or ran, and the result;
- what you still need from the person. If the placeholder is still in the code, ask for the SDK key in plain words and name the file that holds the placeholder;
- what is left for the person to do, each item with the console screen as the reference file names it: the app to register, each custom event name to register, the Firebase (FCM) push provider to add, that Revenue & LTV has to be enabled for their organisation if purchases are tracked (they ask Linkzly support), and every other console step of the integrations you set up.

Say the integration works only where you saw it work. A call that succeeds is not proof: an event with an unregistered name and a purchase without Revenue & LTV both report success.

## If the project's SDK is newer than these files

`references/index.md` names the SDK versions these files were written for. If the project uses a newer one, read the live page for that section instead. Every file has a `Source:` line with the page's address; put `.md` after the page name and before any `#` to get the page as markdown, for example `https://docs.linkzly.com/docs/sdk-ios.md`. If the live page cannot be read, use the file here and say so when you hand back.

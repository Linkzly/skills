<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-events#confirming-events-arrive by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Confirming events arrive

Source: https://docs.linkzly.com/docs/sdk-tracking-events#confirming-events-arrive

1. Make sure `configure` has run before the first event, with the SDK key of the console app you are looking at and the production environment. Events sent with the staging or development environment go to a separate backend and never show in your console.
2. Make sure the custom event name is in that app's Custom Events list, spelled exactly as in code.
3. Make sure the device is online. Events wait in the queue while it is offline.
4. Send the event, then call `flushEvents` or move the app to the background, and check `getPendingEventCount` is back to 0.
5. Open Analytics, then Events, then the Event stream view, and pick your app and the event name.

The Event stream is not instant. It shows events up to a cutoff behind the current time (by default five hours) and displays a "Complete through" time and the approximate processing delay. A new event can be missing from the stream until that time passes it. Read the "Complete through" time on the page before deciding an event was lost.

The stream's system-event filter lists click, install, open and session end, plus your custom names. Purchases are not in that list: to check purchases, follow [Tracking Purchases](../purchases/overview.md).

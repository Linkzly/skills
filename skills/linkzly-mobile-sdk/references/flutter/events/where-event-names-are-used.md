<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-events#where-event-names-are-used by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Where event names are used

Source: https://docs.linkzly.com/docs/sdk-tracking-events#where-event-names-are-used

A custom event name is a plain string. Each place that lets you select one matches it exactly, and it must be the same string the app sends and the same string registered for the app.

### The app's Custom Events list

This is the list described in [Register each name in the console](../events/sending-a-custom-event.md). It is the registry the ingestion service checks, so it is the first place a name has to exist.

### Push audience segments

In the segment builder, a "did event" condition with the event type `custom` can be limited to one event name; leaving it empty means any custom event. The name picker lists names Linkzly has seen plus names registered for the app. A name that is not in the list is shown as unregistered, and a typo matches nothing. The name is compared with an equals test. See [Push Notifications](https://docs.linkzly.com/docs/push-notifications).

### Flows triggers

The "Custom app event" trigger can listen to any custom event of one app, or to one exact event name of one app. At run time the event is matched on the app and the exact name. Conditions on event properties require the one-exact-event setting.

### Analytics: Events and Event stream

In Analytics, the Events view and its Event stream view let you filter by custom event name. Selected names are compared exactly. See [Analytics](https://docs.linkzly.com/docs/analytics).

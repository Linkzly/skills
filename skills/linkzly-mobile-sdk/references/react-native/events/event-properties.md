<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-events#event-properties by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Event properties

Source: https://docs.linkzly.com/docs/sdk-tracking-events#event-properties

An event property is a key and a value sent with an event, such as `price: 9.99` on `item_added_to_cart`. Linkzly never refuses an event because of the kind of value an event property holds. Apart from the size limits in [Limits](../events/event-properties.md) and the keys in [Reserved names](../events/event-properties.md), each value is stored exactly as the SDK sends it. Segments, Flows and Analytics read a value as one of four property types: Text, Number, True/false or Date. Lists and objects are stored too, but can't be used in conditions.

### SDK versions

How a value is sent, what is left out, and the reserved-key warning depend on the SDK version. These SDK versions, and later ones, follow the rules in this section:

| SDK | First version with these rules |
|---|---|
| iOS | {{SDK_VERSION_IOS}} |
| Android | {{SDK_VERSION_ANDROID}} |
| React Native | {{SDK_VERSION_REACT_NATIVE}} |
| Flutter | {{SDK_VERSION_FLUTTER}} |
| Web | {{SDK_VERSION_WEB}} |

React Native and Flutter run the native iOS and Android SDKs underneath, and part of these rules lives there. The React Native and Flutter versions above come with the iOS and Android versions above. The limits, reserved names and property types described here are applied by Linkzly, so they hold for every SDK version. Older versions send some values differently: see [Events from older SDK versions](../events/event-properties.md).

### What each kind of value is sent as

| Value in your app | Sent as | Property type |
|---|---|---|
| Text | The text as given. `"007"` stays `"007"`, `"true"` stays text and `""` stays `""`. | Text |
| A number of any kind (`Int`, `Int64`, `Double`, `Float`, `Decimal`, `Long`, a JavaScript `number`, a Dart `int` or `double`) | A JSON number. `7` and `7.0` are the same number; some platforms write one and some the other. | Number |
| A real true or false value | `true` or `false`. The numbers `0` and `1` stay numbers. | True/false |
| A date | Text in ISO 8601 form, in UTC, with milliseconds: `"2026-10-27T10:15:30.123Z"`. See [Dates](../events/event-properties.md). | Date |
| A list or array | A JSON list. | Stored, not usable in conditions |
| A map, dictionary or plain object | A JSON object. | Stored, not usable in conditions |
| `null`, or `undefined` in JavaScript | Nothing: the key is left out. | Not set |
| A value that can't be sent | Nothing: the key is left out, with a warning. See [Values that are left out](../events/event-properties.md). | Not set |

### Dates

Pass a real date object and the SDK sends it as ISO 8601 text in UTC, with three digits of milliseconds and a `Z`: `"2026-10-27T10:15:30.123Z"`. A local date and time is sent as the same moment in UTC.

| SDK | Pass a date as | Notes |
|---|---|---|
| iOS | `Date` (or `NSDate`) | |
| Android | `java.util.Date`, `java.util.Calendar` or `java.time.Instant` | `Instant` needs Android 8.0 (API 26) or newer, or core library desugaring |
| React Native | a JavaScript `Date` | An invalid date, such as `new Date('soon')`, is left out with a warning |
| Flutter | `DateTime`, in UTC or local time | Microseconds are cut to milliseconds |
| Web | a JavaScript `Date` | An invalid date is left out with a warning |

You can also send a date as text you format yourself. Linkzly reads text as a Date when it is in ISO 8601 form:

- A date and time with a time zone: `2026-10-27T10:15:30Z`, `2026-10-27T13:15:30+03:00`, `+0300` or `+03`.
- A date and time with no time zone, read as UTC: `2026-10-27T10:15:30`.
- A date on its own, read as midnight UTC: `2026-10-27`.
- A `T` or a space between the date and the time. Seconds and fractions of a second are optional, and fractions are cut to milliseconds.

Other text does not read as a Date. That includes `Oct 27 2026, 15:45`, `27 Oct 2026`, a time on its own, and an impossible date such as `2026-02-30`. A number, such as a time in epoch milliseconds, does not read as a Date either. Dates are compared in UTC: a condition for one day, week or month counts that day, week or month in UTC.

On an SDK version older than those in [SDK versions](../events/event-properties.md), a date object was lost or sent in a form that does not read as a Date. On those versions, send the date as ISO 8601 text yourself:

| SDK | ISO 8601 text from a date |
|---|---|
| iOS | `ISO8601DateFormatter().string(from: date)` |
| Android | `SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US).apply { timeZone = TimeZone.getTimeZone("UTC") }.format(date)` |
| React Native, Web | `date.toISOString()` |
| Flutter | `dateTime.toUtc().toIso8601String()` |

### Values that are left out

- A `null` event property, or `undefined` in JavaScript, is left out: the key is not sent, and conditions treat the event property as not set.
- Some values can't be sent. When one is an event property of its own, the SDK leaves that event property out, logs a warning that names the event and the key, and still sends the event with its other event properties. These values are:
  - NaN, Infinity and -Infinity;
  - an invalid date;
  - a JavaScript `BigInt`, on React Native and Web (send it as text, with `String(value)`);
  - any other kind of value the SDK has no rule for, such as a class instance, a function or binary data.
- Inside a list or an object, every position and key is kept: a `null` stays `null`, and a value that can't be sent becomes `null`.

The warning goes to the SDK's debug log, so you see it in debug builds or while SDK logging is on, depending on the platform. React Native always prints it with `console.warn` as well.

### Long numbers and IDs

A Number holds whole numbers exactly only up to 9,007,199,254,740,991 (2^53 − 1). A larger number loses digits when it is read as a Number, and a JavaScript `number` can't hold it at all. Send IDs, order numbers, phone numbers and other codes as text, for example `order_id: "12345678901234567890"`. Text also keeps leading zeros and a leading `+`, as in `"007"` and `"+15551234"`, which a number can't.

### Lists and objects

Lists and objects are stored as sent, and the values inside them follow the same rules: a date inside a list is sent as ISO 8601 text, for example. They can't be used in Segments or Flows conditions, or in Analytics filters and breakdowns, and neither can a key inside an object. To filter on a value, send it as an event property of its own: `item_count: 3`, not `cart: { item_count: 3 }`.

### Keys with dots

A key is one name, whatever characters it holds. A key written `item.id` is stored and filtered as the single key `item.id`, never as `id` inside an object called `item`.

Flows templates read a dot as a step into an object: `{{event.payload.item.id}}` looks for `id` inside `item`, so it can't reach a key named `item.id`. Use `item_id` instead.

### Limits

Event properties have no limits of their own. There is no limit on how many an event has, on the length or characters of a key, on the length of text, or on the length or depth of a list. Linkzly stores every event property of an accepted event in full; only Flows works with a cut-down copy when an event is large. These limits apply:

| What | Limit | When it is exceeded |
|---|---|---|
| An event sent on its own | About 100 KB | The event is refused with a 413 error. |
| A batch of events | About 1 MB, and at most 100 events | The whole batch is refused, and the SDK drops every event in it. |
| An event name | 255 characters | The event is refused. In a batch, only that event is dropped. |
| The event properties Flows works with | About 64 KB per event | Flows keeps as many event properties as fit, smaller ones first, may cut a text value over 4 KB to a short preview, and leaves the rest out. A Flows condition or template can't use an event property that was left out or cut. |
| A key in a Segments or Flows condition | 255 characters | A longer key can't be used in a condition. |

Under the default batching strategy the SDK sends up to 20 queued events in one batch, so keep each event well under 100 KB: one batch over 1 MB loses all of its events.

A key that contains `authorization`, `cookie`, `credential`, `password`, `secret`, `signature`, `token`, `api_key` (also `apikey` or `api-key`) or `private_key` (also `privatekey` or `private-key`) anywhere in it, in any case, can't be used in Segments or Flows conditions. This includes keys such as `tokens_left`. The event property is still stored.

### Reserved names

Linkzly writes these keys into the event properties of every event an SDK sends. Don't use them for your own event properties: Linkzly's value replaces yours.

- `parser_version`, `provider_name`, `provider_slug`, `referrer_domain`, `attribution_signal`, `attribution_confidence`, `traffic_channel`, `bot_score`, `bot_name`, `bot_reason`
- `device_data`, which holds the device type. A value of yours that is not an object is replaced by Linkzly's object.

Keys and event names that start with `__` (two underscores) are reserved for Linkzly. Purchases already use `__revenue`. A key of yours that starts with `__` is still stored, but a later Linkzly key of the same name would replace it.

The Web SDK sends four built-in custom events: `page_view`, `time_on_page`, `scroll_depth` and `outbound_click`. They are accepted for every app without being registered. Don't use these names for your own events.

From the versions in [SDK versions](../events/event-properties.md), the SDKs log a warning when an event property uses a reserved key, and still send it.

### Property types in Segments, Flows and Analytics

Linkzly suggests a property type for each event property from the values it has received recently. You can confirm or change it on the app's **Event properties** tab: open Apps in the sidebar, open your app, then open **Event properties**.

- A new condition in Segments or Flows, and a new filter, metric or breakdown in Analytics, uses the confirmed type, or the suggested type when none is confirmed. The type decides which comparisons are offered.
- Each saved condition keeps the type it was saved with. Confirming or changing a type later doesn't change a saved segment or flow.
- An event property whose recent values were all empty has no suggested type. Pick its type on the tab before you use it in a condition.
- A type decides how stored values are read. Stored events are never rewritten.

#### Data type mismatches

Every event property has a **Data type**: Text, Number, True/false or Date. This is the property type described above. A mismatch happens when an event sends a value that doesn't fit the data type. For example, `appointment_at` has the data type Date, but an app release sends `Oct 01 2026, 13:30`.

The **Event properties** tab checks a sample of up to 50 recent events per event name. When 5% or more of them sent a value that doesn't fit the data type, it shows a warning chip that names the cause (see the list below) in the **Data status** column, and **OK** otherwise. One odd value among 50 events doesn't flag a property. The sample is taken again each time you open the tab, so a property close to the 5% line can switch between a warning chip and OK. Next to the chip you see the count, such as "31 of 50 recent events". If the app sends the property from more than one platform, the open row says which platform it comes from.

In Analytics, a breakdown by that property shows two separate rows instead of one "Unknown":

| Row | What it means |
|---|---|
| **(not set)** | The event had no value for this property, or the value was empty text. |
| **Not a recognized date**, **Not a number**, **Not true/false**, **Not text** | The event sent a value, but it doesn't fit the data type. The row is named after the data type. For example, a Number property shows "Not a number" for a value such as `free`. An empty list `[]` or empty object `{}` counts as a value that was sent, so it shows here, not as "(not set)". |

What each data type accepts:

- **Text** accepts text, numbers and true/false. Only a list or an object is not text.
- **Number** accepts a number such as `7` or `9.99`, true or false (counted as 1 and 0), and text that is only digits, with an optional minus sign and decimal part, such as `"1200"` or `"-3.5"`. Text with a comma, a currency sign, a space or an exponent, such as `"$1,200"`, `"1 200"` or `"1e3"`, is not a number. Words such as `free` are not numbers either. See [What each kind of value is sent as](../events/event-properties.md).
- **True/false** accepts `true` or `false`, and the text `"true"` or `"false"` in any case. The numbers `0` and `1`, and text such as `"yes"`, are not true/false.
- **Date** accepts a date object, or text in ISO 8601 form such as `2026-10-27T10:15:30Z`. Text in another form, such as `Oct 27 2026, 15:45`, is not a recognized date. See [Dates](../events/event-properties.md).

Open the row with **Review**. It names the cause with a chip, gives a headline such as "date_of_birth arrives empty from the iOS and Android apps", and shows the fix for that cause. What each chip means, and the usual fix:

- **Empty values.** The app sent an empty value, `{}`, instead of a date. This usually happens with an older Linkzly SDK that can't send dates. See [Events from older SDK versions](../events/event-properties.md). The date was lost in the app before it was sent, so events already received can't be recovered. Update the Linkzly SDK so new events carry the date. See [Which SDK versions fix this](../events/event-properties.md).
- **Wrong date format.** A Date property is sent as text in a form Linkzly doesn't recognize, such as `Oct 27 2026, 15:45`. Ask your developer to send dates in ISO 8601 form. See [Dates](../events/event-properties.md).
- **Not a number.** A Number property is sent as text that isn't a plain number, such as `"$1,200"`, `"1,200"` or `free`. Ask your developer to send plain numbers. See [What each kind of value is sent as](../events/event-properties.md).
- **Sent as 0/1.** A True/false property is sent as the numbers `0` and `1`. Either change the data type to Number, or ask your developer to send `true` and `false`.
- **Lists or objects.** A Text property is sent as a list or an object, which filters can't use. Ask your developer to send one value per property. See [Lists and objects](../events/event-properties.md).
- **Wrong data type.** At least 80% of the recent values fit another data type, for example a property set to Number whose values are all dates. Choose **Change to** that data type.
- **Mismatch.** The values don't fit the data type for a reason not listed above. Ask your developer to send them in a standard form for the data type.

There are two ways to fix a mismatch.

- **Change the data type.** Use this when the data type was wrong, for example a date of birth that is sent as a number. The change also applies to events you already received, so the mismatch goes away for them too. When Date, Number or True/false fits at least 80% of the recent values, Review recommends changing to it.
- **Ask your developer to fix the app.** Use this when the data type is right and the app is wrong, for example by sending the right format or updating the SDK. Open **Share with developer** and choose one of two options. **Copy issue details** copies a message for a ticket, an email or Slack. It names the event and the property, the data type, what arrived with counts, the platforms and the fix, and links to the issue. For **Empty values** it also names the likely cause. It links to [Which SDK versions fix this](../events/event-properties.md) when the fix is an SDK update, and to this data types guide otherwise. **Copy link to this issue** copies a link that opens this property for teammates with access. The copied message holds no sample values from your events, so nothing personal leaves Linkzly. The fix takes effect from the next app release on that platform. Events already received keep the old format, so they can still show as a mismatch until newer events replace them in the sample.

Nothing is deleted. Linkzly keeps every value exactly as it was sent, whichever data type you choose. Changing the data type changes how stored values are used by new filters and reports, and you can change the data type again on the same tab.

Existing segments, journeys and saved reports keep the data type they were saved with. Changing a data type doesn't change them until you edit them. A new condition, filter or breakdown uses the new data type.

#### Where Segments and Flows can read a value differently

Flows checks its conditions as each event arrives, while Segments and Analytics read stored events. They follow the same rules, except in these cases, where a Flows condition and a Segments condition on the same value can give different answers:

- Ignore case, on text that holds the Turkish capital dotted I (`İ`) or the Greek capital sigma (`Σ`, which is `σ` in lower case, or `ς` at the end of a word).
- A Text condition on a value sent as a number of 1e21 or more, or as a whole number beyond 2^53. As text, Segments writes 1e21 as `1e21` and keeps every digit of a long whole number; Flows writes `1e+21` and rounds the long number. Send these values as text.

### Events from older SDK versions

Linkzly never rewrites stored events, and older SDK versions keep working. Before the versions in [SDK versions](../events/event-properties.md), some values were sent differently, and those events keep the values as they were stored:

- **Dates** were lost or sent in forms that aren't recognized as a Date. iOS sent `null`. Android sent local-time text such as `Oct 27, 2026, 3:45:30 PM`. React Native, and usually Web, sent an empty object, `{}`. On Flutter, the call failed and the event was not sent.
- **Some Swift number types on iOS** arrived as `null`: `Float`, `Int32`, `Int64`, `UInt` and `Decimal` values.
- **0 and 1** from React Native or Flutter on iOS arrived as `false` and `true`, inside lists and objects too.
- **Text that looks like a number or true/false**, in a queued event on Android (and from React Native and Flutter on Android), arrived as a number or true/false. `"007"` arrived as `7`, and `"true"` as `true`.
- **`trackEventBatch` from React Native on Android** sent every event without its event properties.
- **NaN or Infinity on Android** stopped queued custom events from being sent.

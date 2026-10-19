<!-- Generated from https://docs.linkzly.com/docs/sdk-web#privacy-controls by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Privacy Controls

Source: https://docs.linkzly.com/docs/sdk-web#privacy-controls

```typescript
LinkzlySDK.setTrackingEnabled(false); // stop sending
LinkzlySDK.setTrackingEnabled(true);  // send again
const enabled = LinkzlySDK.isTrackingEnabled();
```

- `setTrackingEnabled(false)` stops every event the SDK would send: install, open, session end, the built-in events, custom events and purchases. Events already in the queue are still sent. The choice is kept in `localStorage` and lasts until your site changes it.
- While the browser sends Do Not Track or Global Privacy Control, the SDK sends nothing, unless your site has called `setTrackingEnabled(true)` or `false`, which overrides the browser signal. The signal is read on every event, so it takes effect as soon as the visitor changes it. Some browsers send Global Privacy Control by default. Set `respectDNT: false` to ignore both signals.

**Waiting for consent.** If your site must send nothing before the visitor agrees, call `configure` only after they agree, and call `setTrackingEnabled(true)` before `configure` if your site wants consent to override Do Not Track or Global Privacy Control. Do not hold events back with `setTrackingEnabled(false)` before `configure`: `configure` uses up the browser's first visit even while tracking is off, so that browser's install would never be sent. If the visitor later withdraws consent, call `setTrackingEnabled(false)`.

```typescript
function onConsentGiven() {
  // Overrides Do Not Track and Global Privacy Control. Without this line, a browser that sends
  // either signal sends nothing, and its first-visit install is never reported.
  LinkzlySDK.setTrackingEnabled(true);
  LinkzlySDK.configure('slk_your_key_from_console', Environment.PRODUCTION);
}
```

### What the SDK Stores in the Browser

| Where | Names | What |
|---|---|---|
| Cookies (first-party, two years, `SameSite=Lax`) | `lz_visitor_id`, `lz_first_visit_done` | The visitor ID, and the marker that the first visit was recorded |
| `localStorage` | Keys starting `lz_` | The visitor ID, the user ID, the tracking choice, the first-visit marker, the event queue and the last 50 transaction IDs |
| `sessionStorage` | Keys starting `lz_` | The session, its UTM parameters, referrer, landing page and smart link IDs |

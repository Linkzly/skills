<!-- Generated from https://docs.linkzly.com/docs/sdk-web#user-identity by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# User Identity

Source: https://docs.linkzly.com/docs/sdk-web#user-identity

```typescript
LinkzlySDK.setUserID('user_12345');   // after sign-in
LinkzlySDK.getUserID();               // 'user_12345'
LinkzlySDK.clearUserID();             // on sign-out

LinkzlySDK.getVisitorID();            // this browser's ID
LinkzlySDK.resetVisitorID();          // a new ID from now on
```

The user ID is kept in `localStorage` and sent with every event until you clear it. Use your own stable account ID, not an email address. The visitor ID is created on the first visit and kept in `localStorage` and in a first-party cookie, so clearing one of the two does not create a new visitor.

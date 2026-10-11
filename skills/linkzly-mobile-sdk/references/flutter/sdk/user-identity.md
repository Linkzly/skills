<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#user-identity by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# User Identity

Source: https://docs.linkzly.com/docs/sdk-flutter#user-identity

```dart
await Linkzly.instance.setUserId('user_12345');
final String? userId = await Linkzly.instance.getUserId();

final String visitorId = await Linkzly.instance.getVisitorId();
await Linkzly.instance.resetVisitorId();
```

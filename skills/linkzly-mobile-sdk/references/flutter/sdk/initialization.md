<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#initialization by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Initialization

Source: https://docs.linkzly.com/docs/sdk-flutter#initialization

```dart
import 'package:flutter/material.dart';
import 'package:linkzly_flutter_sdk/linkzly_flutter_sdk.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Subscribe BEFORE configure so cold-start events are not missed
  Linkzly.instance.deepLinkStream.listen((DeepLinkData data) {
    // Route the user based on data.path and data.parameters
  });

  Linkzly.instance.universalLinkStream.listen((UniversalLinkEvent event) {
    // Optional: inspect the raw universal/app link capture
  });

  await Linkzly.instance.configure(
    const LinkzlyConfig(
      sdkKey: 'slk_your_key_from_console',
      environment: LinkzlyEnvironment.production,
    ),
  );

  runApp(const MyApp());
}
```

The SDK is a singleton: every call is `Linkzly.instance.<method>(...)`. `LinkzlyConfig` takes `sdkKey`, `environment` (`LinkzlyEnvironment.production`, `.staging` or `.development`; default `production`) and `autoTrackAppOpens` (default `true`). When `autoTrackAppOpens` is `true`, `configure` also calls `trackOpen()` for you.

`LinkzlyEnvironment.staging` and `.development` send to separate Linkzly backends, so events sent with them never show in your console. Use `LinkzlyEnvironment.production` with the key from your console.

`configure` completes even when the native SDK refused the key. A key that is not `slk_` followed by at least 40 hex characters (the placeholder above is one) leaves the SDK unconfigured for the life of the app process, and later `configure` calls are ignored. After you put the real key in, stop the app and run it again; hot reload and hot restart are not enough.

<!-- Generated from https://docs.linkzly.com/docs/sdk-react-native#installation by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Installation

Source: https://docs.linkzly.com/docs/sdk-react-native#installation

**SDK version:** 1.0.17

The package is installed from GitHub. It is not published to the npm registry, so `npm install @linkzly/react-native-sdk` will not find it.

```bash
npm install github:Linkzly/react-native-linkzly-sdk#1.0.17
```

With Yarn 1 (classic):

```bash
yarn add Linkzly/react-native-linkzly-sdk#1.0.17
```

The package is installed under the name `@linkzly/react-native-sdk`, which is what you import:

```ts
import LinkzlySDK, { Environment } from '@linkzly/react-native-sdk';
```

The tag `1.0.17` is what you pin. The `version` field inside the installed `package.json` reports a different number (`1.4.6` at this tag); that is expected, and the tag is the value to use.

### iOS

The native iOS SDK is not on CocoaPods Trunk. Add it to your `ios/Podfile` inside your app target, before `use_native_modules!`:

```ruby
pod 'LinkzlySDK', :git => 'https://github.com/Linkzly/linkzly-ios-sdk.git', :tag => '1.0.7'
```

```bash
cd ios && pod install && cd ..
```

Without this line, `pod install` fails with `Unable to find a specification for 'LinkzlySDK'`.

In an Expo app that generates its native folders, `ios/Podfile` is generated too, so the line goes in through a config plugin. See [Expo](../sdk/platform-setup.md).

### Android

The package's own `android/build.gradle` already declares the JitPack repository and depends on the native Android SDK (`com.github.Linkzly:linkzly-android-sdk:1.0.9`), so a default React Native project builds without any change to your Gradle files.

If your project sets `RepositoriesMode.FAIL_ON_PROJECT_REPOS` in `android/settings.gradle`, the build stops at the `repositories` block in this package's `android/build.gradle`, and adding JitPack to the settings file does not change that. Set `RepositoriesMode.PREFER_SETTINGS` instead, so that Gradle ignores that block, and list JitPack in the settings file. This was checked in a small Gradle project, not in a full React Native build:

```groovy
dependencyResolutionManagement {
  repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
  repositories {
    google()
    mavenCentral()
    maven { url 'https://jitpack.io' }
  }
}
```

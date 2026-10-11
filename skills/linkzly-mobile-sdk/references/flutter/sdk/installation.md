<!-- Generated from https://docs.linkzly.com/docs/sdk-flutter#installation by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Installation

Source: https://docs.linkzly.com/docs/sdk-flutter#installation

**SDK version:** 1.0.6

### 1. Add the package

The plugin is published on pub.dev: https://pub.dev/packages/linkzly_flutter_sdk

```bash
flutter pub add linkzly_flutter_sdk
```

or in `pubspec.yaml`:

```yaml
dependencies:
  linkzly_flutter_sdk: ^1.0.6
```

Then run `flutter pub get`.

### 2. iOS: pin the native SDK in `ios/Podfile`

The native iOS SDK is not on CocoaPods Trunk, so `pod install` cannot resolve it on its own and fails with `Unable to find a specification for 'LinkzlySDK'`. Add this line inside the `Runner` target:

```ruby
target 'Runner' do
  use_frameworks!

  pod 'LinkzlySDK', :git => 'https://github.com/Linkzly/linkzly-ios-sdk.git', :tag => '1.0.7'

  flutter_install_all_ios_pods File.dirname(File.realpath(__FILE__))
end
```

Then:

```bash
cd ios && pod install --repo-update && cd ..
```

### 3. Android: add JitPack

The plugin declares the native Android SDK itself, so Gradle brings it in. The only Android step is to add the JitPack repository so Gradle can find it. For Kotlin DSL Flutter projects (`android/build.gradle.kts`):

```kotlin
allprojects {
  repositories {
    google()
    mavenCentral()
    maven("https://jitpack.io")
  }
}
```

If you use `dependencyResolutionManagement` in `android/settings.gradle.kts`, add JitPack there instead. For Groovy projects, add it to `android/build.gradle` with the standard `maven { url 'https://jitpack.io' }` syntax.

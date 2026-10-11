<!-- Generated from https://docs.linkzly.com/docs/sdk-android#installation by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Installation

Source: https://docs.linkzly.com/docs/sdk-android#installation

**SDK version:** 1.0.9

The SDK is distributed through JitPack. Add the JitPack repository, then the dependency.

**`settings.gradle.kts`**

```kotlin
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://jitpack.io") }
    }
}
```

**`app/build.gradle.kts`**

```kotlin
dependencies {
    implementation("com.github.Linkzly:linkzly-android-sdk:1.0.9")
}
```

Groovy:

```groovy
// settings.gradle
maven { url 'https://jitpack.io' }

// app/build.gradle
implementation 'com.github.Linkzly:linkzly-android-sdk:1.0.9'
```

Sync Gradle. The SDK brings in its own dependencies (OkHttp, Kotlin coroutines, AndroidX and others), so you add nothing else for the core features. Firebase Messaging is the one dependency you add yourself, and only for the push features below.

<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#installation by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Installation

Source: https://docs.linkzly.com/docs/sdk-ios#installation

**SDK version:** 1.0.7

### Swift Package Manager

In Xcode choose **File → Add Package Dependencies…**, enter the URL below and add the **Linkzly** product to your app target.

```
https://github.com/Linkzly/linkzly-ios-sdk.git
```

Or add it to `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/Linkzly/linkzly-ios-sdk.git", from: "1.0.7")
],
targets: [
    .target(name: "YourApp", dependencies: [.product(name: "Linkzly", package: "linkzly-ios-sdk")])
]
```

### CocoaPods

`LinkzlySDK` is not published to CocoaPods Trunk, so the pod needs its Git source and tag:

```ruby
pod 'LinkzlySDK', :git => 'https://github.com/Linkzly/linkzly-ios-sdk.git', :tag => '1.0.7'
```

Then import the module. The module is named `Linkzly`; the class you call is `LinkzlySDK`.

```swift
import Linkzly
```

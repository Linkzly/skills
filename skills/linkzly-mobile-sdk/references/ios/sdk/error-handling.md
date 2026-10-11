<!-- Generated from https://docs.linkzly.com/docs/sdk-ios#error-handling by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Error Handling

Source: https://docs.linkzly.com/docs/sdk-ios#error-handling

Calls that report failure through `Result` or an `NSError` use `LinkzlyError`:

```swift
enum LinkzlyError: Error {
    case notConfigured        // configure() has not run
    case invalidSDKKey        // the SDK key was rejected
    case networkError(Error)  // the network request failed
    case invalidResponse      // the server returned data the SDK could not read
    case noDeepLinkData       // no deep link data is available
}
```

```swift
LinkzlySDK.trackOpen { result in
    if case .failure(let error as LinkzlyError) = result, case .notConfigured = error {
        // call LinkzlySDK.configure first
    }
}
```

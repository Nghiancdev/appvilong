#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <CodePush/CodePush.h>
#import <Firebase.h>
#import <React/RCTLinkingManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
 

  
  self.moduleName = @"iki_customer";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL];
#endif
}

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<NSString *, id> *)options {
  return [self application:app
                   openURL:url
         sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  FIRDynamicLink *dynamicLink = [[FIRDynamicLinks dynamicLinks] dynamicLinkFromCustomSchemeURL:url];

  if (dynamicLink) {
    if (dynamicLink.url) {
      // Handle the deep link. For example, show the deep-linked content,
      // apply a promotional offer to the user's account or show customized onboarding view.
      // ...
    } else {
      // Dynamic link has empty deep link. This situation will happens if
      // Firebase Dynamic Links iOS SDK tried to retrieve pending dynamic link,
      // but pending link is not available for this device/App combination.
      // At this point you may display default onboarding view.
    }
    return YES;
  }
  return NO;
}

/**
 handle deeplink, facebook deferred deep link, dynamic link in this place.
 Following this guide: https://firebase.google.com/docs/dynamic-links/ios/receive
 */
// - (BOOL)application:(UIApplication *)app
//             openURL:(NSURL *)url
//             options:(NSDictionary<NSString *, id> *)options {
//   //logging
//   [self log:[NSString stringWithFormat:@"AppDelegate. openURL option url=%@", url.absoluteString]];
//   return [self application:app openURL:url sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey] annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
// }

// - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
//   //logging
//   [self log:[NSString stringWithFormat:@"AppDelegate. openURL sourceApplication url=%@", url.absoluteString]];
  
//   // handle with LinkingManager ==> the data will pass to Linking in react-native
//   BOOL linkingHandled = [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
  
//   // handle dynamicLink
//   BOOL dynamicLinkHandled = false;
//   FIRDynamicLink *dynamicLink = [[FIRDynamicLinks dynamicLinks] dynamicLinkFromCustomSchemeURL:url];
//   if (dynamicLink && dynamicLink.url){
//     // we need delay 2s because appcontainer and component in JS need times to ready.
//     //TODO: this is bad behavior and shouldn't handle by this way.
//     // Consider move to wait listener ready then fire.
//     // or consider call [[UIApplication shareApplication] openURL:url];
//     // But right now I don't have enough time to test it.
    
//     //logging
//     [self log:[NSString stringWithFormat:@"AppDelegate. openURL sourceApplication dynamicLink=%@", dynamicLink.url.absoluteString]];
    
//     dispatch_time_t delay = dispatch_time(DISPATCH_TIME_NOW, NSEC_PER_SEC * 2);
//     dispatch_after(delay, dispatch_get_main_queue(), ^(void){
//       // do work in the UI thread here
// //      [eventEmitter sendEventFirebaseDynamicLinks:dynamicLink.url.absoluteString];
//     });
//     dynamicLinkHandled = true;
//   }
  
//   // handle facebook sdk linking
//   // I don't really know why it was needed.

  
//   return linkingHandled || dynamicLinkHandled;
// }

//handle universals link
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
  //logging
  [self log:[NSString stringWithFormat:@"AppDelegate. continueUserActivity restorationHandler userActivity.=%@", userActivity.webpageURL.absoluteString]];
  
  // handle with LinkingManager ==> the data will pass to Linking in react-native
  BOOL linkingHandled = [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  
  // Handle user click on SpotlightSearch item
  //[RCTSpotlightSearch handleContinueUserActivity:userActivity];

  return linkingHandled;
}

@end

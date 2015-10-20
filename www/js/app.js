angular.module('tracker', 
    ['ionic', 'ngAnimate', 'ngTouch','ngCordova', 'angularMoment', 'ngMaterial']);

angular.module('tracker')
  .constant("API", {
      endpoint: "https://sandbox.1self.co",
      appName: "co.1self.universaltracker",
      appVersion: "0.0.1",
      appId: "app-id-556d18e5ed9e4e67343332987f73a360",
      appSecret: "app-secret-0f5d09051e0bda5869e1a866bb4bc62afe30ae70fc8be92313a6e25ecc7d07db"
  })
  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.tabs.position('top');
  })
  .run(function($ionicPlatform, AuthenticationService, EventSendService) {
      $ionicPlatform.ready(function() {
          window.plugin.notification.local.promptForPermission();
          
          if(AuthenticationService.authenticated()){
              EventSendService.sendEvents();
          }else{
              AuthenticationService.authenticate();
          }

          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if (window.cordova && window.cordova.plugins.Keyboard) {

              //Change this to false to return accessory bar 
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
          }
          if (window.StatusBar) {
              StatusBar.styleDefault();
          }
      })
  });

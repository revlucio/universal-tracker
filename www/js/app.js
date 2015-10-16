angular.module('tracker', 
    ['ionic', 'ngAnimate', 'ngTouch','ngCordova', 'angularMoment', 'ngMaterial']);

angular.module('tracker')
  .constant("API", {
      endpoint: "https://api.1self.co",
      "appName": "com.1self.universaltracker",
      "appVersion": "1.0.0",
      "appId": "",
      "appSecret": ""
  })

  .run(function($ionicPlatform, AuthenticationService, EventSendService) {
      $ionicPlatform.ready(function() {
          //window.plugin.notification.local.promptForPermission();
          
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

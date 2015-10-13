angular.module('tracker', 
    ['ionic', 'ngAnimate', 'ngTouch','ngCordova', 'angularMoment']);

angular.module('tracker')
  .constant("API", {
      endpoint: "https://api.1self.co",
      "appName": "co.1self.duration",
      "appVersion": "1.1.4",
      "appId": "",
      "appSecret": ""
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
  })

  .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('tab', {
              url: "/tab",
              abstract: true,
              templateUrl: "templates/tabs.html"
          })
          .state('tab.dash', {
              url: '/dash',
              views: {
                  'tab-dash': {
                      templateUrl: 'templates/tab-dash.html',
                      controller: 'ActivityCtrl as vm'
                  }
              }
          })
          .state('tab.edit', {
              url: '/dash/edit',
              views: {
                  'tab-dash': {
                      templateUrl: 'templates/tab-dash-edit.html',
                      controller: 'ActivityCtrl as vm'
                  }
              }
          })
          .state('tab.history', {
              url: '/history',
              views: {
                  'tab-history': {
                      templateUrl: 'templates/tab-history.html',
                      controller: 'HistoryCtrl as vm'
                  }
              }
          })
          .state('tab.charts', {
              url: '/charts',
              views: {
                  'tab-charts': {
                      templateUrl: 'templates/tab-charts.html',
                      controller: 'ChartCtrl as vm'
                  }
              }
          })
          ;

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/tab/dash');
  });

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js



angular.module('tracker', ['ionic', 'ngAnimate', 'ngTouch','ngCordova', 'angularMoment'])

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

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

        // Each tab has its own nav history stack:

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
                        controller: 'DashEditCtrl'
                    }
                }
            })

            .state('tab.history', {
                url: '/history',
                views: {
                    'tab-history': {
                        templateUrl: 'templates/tab-history.html',
                        controller: 'HistoryCtrl'
                    }
                }
            })
            .state('tab.charts', {
                url: '/charts',
                views: {
                    'tab-charts': {
                        templateUrl: 'templates/tab-charts.html',
                        controller: 'ChartsCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    });

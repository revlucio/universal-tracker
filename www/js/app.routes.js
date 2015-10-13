angular.module('tracker')
	.config(routesConfig);

function routesConfig($stateProvider, $urlRouterProvider) {
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
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');
}
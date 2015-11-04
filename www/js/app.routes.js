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
                    templateUrl: 'dash/dash.html',
                    controller: 'DashCtrl as vm'
                }
            }
        })
        .state('tab.edit', {
            url: '/dash/edit',
            views: {
                'tab-dash': {
                    templateUrl: 'dash/dash-edit.html',
                    controller: 'DashEditCtrl as vm'
                }
            }
        })
        .state('tab.history', {
            url: '/history',
            views: {
                'tab-history': {
                    templateUrl: 'history/history.html',
                    controller: 'HistoryCtrl as vm'
                }
            }
        })
        .state('tab.charts', {
            url: '/charts',
            views: {
                'tab-charts': {
                    templateUrl: 'charts/charts.html',
                    controller: 'ChartCtrl as vm'
                }
            }
        })
      .state('add-activity', {
        url: '/add',
        abstract: true,
        templateUrl: 'add/add.html'
      })
        .state('add-activity.name', {
          url: '/name',
          templateUrl: 'add/name.html',
          controller: 'AddCtrl as vm'
        })
        .state('add-activity.select-name', {
          url: '/select-name',
          templateUrl: 'add/select-name.html',
          controller: 'AddCtrl as vm'
        })
        .state('add-activity.type', {
          url: '/type',
          templateUrl: 'add/type.html',
          controller: 'AddCtrl as vm'
        })
        .state('add-activity.duration', {
          url: '/duration',
          templateUrl: 'add/duration.html',
          controller: 'AddCtrl as vm'
        })
      ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');
}
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
                    controller: 'DashboardEditCtrl as vm'
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
      .state('add-activity', {
        url: '/add',
        abstract: true,
        templateUrl: 'templates/activity/add-activity.html'
      })
        .state('add-activity.name', {
          url: '/name',
          templateUrl: 'templates/activity/add-activity-name.html',
          controller: 'AddActivityCtrl as vm'
        })
        .state('add-activity.select-name', {
          url: '/select-name',
          templateUrl: 'templates/activity/add-activity-select-name.html',
          controller: 'AddActivityCtrl as vm'
        })
        .state('add-activity.type', {
          url: '/type',
          templateUrl: 'templates/activity/add-activity-type.html',
          controller: 'AddActivityCtrl as vm'
        })
        .state('add-activity.duration', {
          url: '/duration',
          templateUrl: 'templates/activity/add-activity-duration.html',
          controller: 'AddActivityCtrl as vm'
        })
      ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');
}
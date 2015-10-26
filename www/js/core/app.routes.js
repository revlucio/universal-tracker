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
            cache: false,
            url: '/history',
            views: {
                'tab-history': {
                    templateUrl: 'templates/tab-history.html',
                    controller: 'HistoryCtrl as vm'
                }
            }
        })
        .state('tab.charts', {
            cache: false,
            url: '/charts',
            views: {
                'tab-charts': {
                    templateUrl: 'templates/tab-charts.html',
                    controller: 'ChartCtrl as vm'
                }
            }
        })
      .state('add-activity', {
        cache: false,
        url: '/add',
        abstract: true,
        templateUrl: 'templates/activity/add-activity.html'
      })
        .state('add-activity.name', {
          cache: false,
          url: '/name',
          templateUrl: 'templates/activity/add-activity-name.html',
          controller: 'AddActivityCtrl as vm'
        })
        .state('add-activity.select-name', {
          cache: false,
          url: '/select-name',
          templateUrl: 'templates/activity/add-activity-select-name.html',
          controller: 'AddActivityCtrl as vm'
        })
        .state('add-activity.type', {
          cache: false,
          url: '/type',
          templateUrl: 'templates/activity/add-activity-type.html',
          controller: 'AddActivityCtrl as vm'
        })
        .state('add-activity.duration', {
          cache: false,
          url: '/duration',
          templateUrl: 'templates/activity/add-activity-duration.html',
          controller: 'AddActivityCtrl as vm'
        })
      ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');
}
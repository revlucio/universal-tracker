angular.module('tracker')
	.controller('ChartCtrl', ChartCtrl);

function ChartCtrl(oneSelfService, $location, activityService, AuthenticationService) {
	var vm = this;

    vm.activities = activityService.getActivities();
    vm.chart = {};
    vm.showChart = showChart;

    function init() {
        if (!AuthenticationService.authenticated()) {
            AuthenticationService.authenticate(true, function(res) {
                if (!res) $location.path('/dash');
            });
        }
    };
    init();

    function showChart() {
        // var activity = vm.chart.type;
        // var api_credentials = angular.fromJson(window.localStorage.api_credentials),
        //     tags = ActivitiesService.getTags(activity),
        //     uri = API.endpoint + "/v1/streams/" +
        //     api_credentials.streamid + "/events/" +
        //     tags.objectTags.join(',') + "/" +
        //     tags.actionTags.join(',') +
        //     "/sum(duration)/daily/barchart?readToken=" +
        //     api_credentials.readToken;
		var url = oneSelfService.getChartUrl([vm.chart.type])
        window.open(url, '_system', 'location=no');
    };
}
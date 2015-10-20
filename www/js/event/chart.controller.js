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
		var url = oneSelfService.getChartUrl([vm.chart.type])
        window.open(url, '_system', 'location=no');
    };
}
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
    	var type = _.find(vm.activities, { 'name': vm.chart.type }).type;
		var url = oneSelfService.getChartUrl(vm.chart.type, type)
        window.open(url, '_system', 'location=no');
    };
}
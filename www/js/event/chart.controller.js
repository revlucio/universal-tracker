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

    function showChart(name) {
    	var type = _.find(vm.activities, { 'name': name }).type;
		var url = oneSelfService.getChartUrl(name, type)
        window.open(url, '_system', 'location=no');
    };
}
angular.module('tracker')
	.controller('ChartCtrl', ChartCtrl);

function ChartCtrl(oneSelfService) {
	var vm = this;

	window.open(oneSelfService.getChartUrl(["Coding"]), '_system', 'location=no');
}
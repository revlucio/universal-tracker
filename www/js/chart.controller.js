angular.module('tracker')
	.controller('ChartCtrl', ChartCtrl);

function ChartCtrl(oneSelfService) {
	var vm = this;

    alert(oneSelfService.getChartUrl(["Coding"]));
}
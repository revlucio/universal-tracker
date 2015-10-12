angular.module('tracker')
	.controller('HistoryCtrl', HistoryCtrl);

function HistoryCtrl(historyService) {
	var vm = this;

	vm.historyItems = historyService.getHistory();
}
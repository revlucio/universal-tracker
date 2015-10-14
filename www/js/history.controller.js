angular.module('tracker')
	.controller('HistoryCtrl', HistoryCtrl);

function HistoryCtrl(historyService, $filter) {
	var vm = this;

	vm.historyItems = historyService.get();

    vm.events = historyService.getGroupedEvents();
    vm.dates = Object.keys(vm.events).sort().reverse();

    vm.humanizeTime = function(duration) {
        var tstring = $filter('millisecondsToStringFilter')(duration).split(':');
        return {
            hours: parseInt(tstring[0], 10),
            minutes: parseInt(tstring[1], 10),
            seconds: parseInt(tstring[2], 10)
        };
    };
}
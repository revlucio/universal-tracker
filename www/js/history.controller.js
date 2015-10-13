angular.module('tracker')
	.controller('HistoryCtrl', HistoryCtrl);

function HistoryCtrl(historyService) {
	var vm = this;

	vm.historyItems = historyService.getHistory();

	function getGroupedEvents() {
        var events = historyService.getHistory();
        var groups = {};
        events.forEach(function(event) {
            var date = event.when.split('T')[0];
            if (!groups[date]) {
                groups[date] = [];
            }

            // if is value and event with that event exists in groups[date]
            // add the value to existing value
            if (event.amount) {
            	var sum = _.find(groups[date], { 'event': event.event });
            	if (sum) {
            		sum.amount += event.amount;
            	} else {            		
	            	groups[date].unshift({event: event.event, amount:event.amount});
            	}
            } else {
	            groups[date].unshift(event);
            }

        });

        return groups;
    };

    vm.events = getGroupedEvents();
    vm.dates = Object.keys(vm.events).sort().reverse();

    vm.humanizeTime = function(duration) {
        var tstring = $filter('millisecondsToStringFilter')(duration * 1000).split(':');
        return {
            hours: parseInt(tstring[0], 10),
            minutes: parseInt(tstring[1], 10),
            seconds: parseInt(tstring[2], 10)
        };
    };
}
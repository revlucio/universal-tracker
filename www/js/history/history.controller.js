angular.module('tracker')
	.controller('HistoryCtrl', HistoryCtrl);

function HistoryCtrl(historyService, $filter, oneSelfService) {
	var vm = this;

    vm.events = getEvents();
    vm.dates = Object.keys(getEvents()).sort().reverse();
    vm.humanizeTime = humanizeTime;
    vm.clearHistory = clearHistory;
    vm.showChart = showChart;
    vm.isLocal = (window.location.hostname === 'localhost');

    function showChart(name, type) {
        var url = oneSelfService.getChartUrl(name, type)
        window.open(url, '_system', 'location=no');
    };

    function humanizeTime(duration) {
        var tstring = $filter('millisecondsToStringFilter')(duration).split(':');
        return {
            hours: parseInt(tstring[0], 10),
            minutes: parseInt(tstring[1], 10),
            seconds: parseInt(tstring[2], 10)
        };
    };

    function getEvents() {
        var events = historyService.getQueue();
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
                    groups[date].unshift({
                        event: event.event, 
                        amount: event.amount,
                        type: event.type
                    });
                }
            } else {
                groups[date].unshift(event);
            }
        });

        return groups;
    };

    function clearHistory() {
        historyService.clear();
        vm.events = getEvents();
    }
}
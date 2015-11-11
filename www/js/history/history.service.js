angular.module('tracker')
	.factory('historyService', historyService);

function historyService(preferenceService, oneSelfService, toastService) {
	var history = JSON.parse(window.localStorage['history'] || '[]');
	var groupedEvents = {};

	return {
		getHistory: getHistory,
		add: add,
		getGroupedEvents: getGroupedEvents,
		getQueue: getQueue,
		queueEvent: queueEvent,
		setGroupedEvents: getGroupedEvents,
        clear: clear
	}

    function getQueue() {
        var queueString = window.localStorage.history;
        if (queueString) {
            return angular.fromJson(queueString);
        } else {
            return [];
        }
    }

    function queueEvent(activity) {
        var queue = getQueue();
        queue.push(activity);
        window.localStorage.history = angular.toJson(queue);
    }

	function getHistory() {
		return history;
	}

	function add(event, message) {
        event.when = new Date().toISOString();
        oneSelfService.sendEventToApi(event);
		history.push(event);
		save();
		if (event.amount) {
            preferenceService.setLastAmountLogged(event.event, event.amount);
        }
        toastService.show(message, 'short', 'center');
	}

	function save() {
   		window.localStorage['history'] = JSON.stringify(history);
    }

    function getGroupedEvents() {
        var events = getQueue();
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

    function clear() {
        history = [];
        window.localStorage.history = [];
    }
}
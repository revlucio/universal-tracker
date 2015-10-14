angular.module('tracker')
	.factory('historyService', historyService);

function historyService() {
	var history = JSON.parse(window.localStorage['history'] || '[]');
	var groupedEvents = {};
	setGroupedEvents();

	return {
		get,
		add,
		getGroupedEvents
	}

	function get() {
		return history;
	}

	function add(event) {
		event.when = new Date();
		history.push(event);
		save();
		setGroupedEvents();
	}

	function save() {
   		window.localStorage['history'] = JSON.stringify(history);
    }

    function setGroupedEvents() {
        var events = history;
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

        groupedEvents = groups;
    };

    function getGroupedEvents() {
    	return groupedEvents;
    }
}
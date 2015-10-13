angular.module('tracker')
	.factory('historyService', historyService);

function historyService() {
	var history = JSON.parse(window.localStorage['history'] || '[]');;

	return {
		getHistory,
		add
	}

	function getHistory() {
		return history;
	}

	function add(event, value) {
		history.push({event: event, value: value, when: new Date()});
		save();
	}

	function save() {
   		window.localStorage['history'] = JSON.stringify(history);
    }
}
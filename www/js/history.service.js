angular.module('tracker')
	.factory('historyService', historyService);

function historyService() {
	var history = JSON.parse(window.localStorage['history'] || '[]');;

	return {
		getHistory,
		add,
		get: history
	}

	function getHistory() {
		return history;
	}

	function add(event, amount) {
		history.push({event: event, amount: amount, when: new Date()});
		save();
	}

	function save() {
   		window.localStorage['history'] = JSON.stringify(history);
    }
}
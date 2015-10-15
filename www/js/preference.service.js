angular.module('tracker')
	.factory('preferenceService', preferenceService);

function preferenceService() {
	var preferences = JSON.parse(window.localStorage.preferences || '{}');

	return {
		setLastAmountLogged,
		getLastAmountLogged
	}

	function setLastAmountLogged(activity, amount) {
		if (!preferences.lastAmountLogged) preferences.lastAmountLogged = {};

		preferences.lastAmountLogged[activity] = amount;
		save();
	}

	function getLastAmountLogged(activity) {
		if (!preferences.lastAmountLogged || !preferences.lastAmountLogged[activity]) {
			return null;
		}

		return preferences.lastAmountLogged[activity];
	}

	function save() {
   		window.localStorage.preferences = JSON.stringify(preferences);
    }
}
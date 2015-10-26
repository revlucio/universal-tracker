angular.module('tracker')
	.factory('newActivityService', newActivityService);

function newActivityService() {
	var activity = {};

	return {
		get: get,
		reset: reset
	}

	function get() {
		return activity;	
	}

	function reset() {
		activity = {};
	}
}
angular.module('tracker')
	.factory('newActivityService', newActivityService);

function newActivityService() {
	var activity = { duration: { hours: 0, minutes: 0, seconds: 0 }};

	return {
		activity: activity
	}
}
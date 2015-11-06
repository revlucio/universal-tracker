angular.module('tracker')
	.factory('durationService', durationService);

function durationService() {
	return {
		isValidDuration: isValidDuration
	};

	function isValidDuration(duration) {
		if (duration && (
			duration.hours > 0 || 
			duration.minutes > 0 || 
			duration.seconds > 0)
			) return true;

		return false;
	}
}

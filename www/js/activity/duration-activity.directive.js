angular.module('tracker')
	.directive('utDurationActivity', durationActivity);

function durationActivity() {
	return {
		templateUrl: 'templates/activity/duration-activity.directive.html'
	};
}
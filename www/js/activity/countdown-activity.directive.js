angular.module('tracker')
	.directive('utCountdownActivity', countdownActivity);

function countdownActivity() {
	return {
		templateUrl: 'templates/activity/countdown-activity.directive.html'
	};
}
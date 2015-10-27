angular.module('tracker')
	.directive('utCountdownActivity', countdownActivity);

function countdownActivity() {
	return {
		templateUrl: 'js/components/countdown.directive.html'
	};
}
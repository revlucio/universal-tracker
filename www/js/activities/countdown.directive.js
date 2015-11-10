angular.module('tracker')
	.directive('utCountdownActivity', countdownActivity);

function countdownActivity() {
	return {
		templateUrl: 'components/countdown.directive.html'
	};
}
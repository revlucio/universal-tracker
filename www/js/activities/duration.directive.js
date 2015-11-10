angular.module('tracker')
	.directive('utDurationActivity', durationActivity);

function durationActivity() {
	return {
		templateUrl: 'components/duration.directive.html'
	};
}
angular.module('tracker')
	.directive('utDurationActivity', durationActivity);

function durationActivity() {
	return {
		templateUrl: 'js/components/duration.directive.html'
	};
}
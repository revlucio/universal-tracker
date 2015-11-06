angular.module('tracker')
	.directive('utTime', time);

function time(durationService) {
	return {
		restrict: 'E',
		templateUrl: 'components/time.directive.html',
		scope: {
			duration: '='
		},
		link: function(scope) {
			scope.isValidDuration = durationService.isValidDuration
		}
	};
}
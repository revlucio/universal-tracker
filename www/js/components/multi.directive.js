angular.module('tracker')
	.directive('utMultiActivity', multiActivity);

function multiActivity() {
	return {
		templateUrl: 'js/components/multi.directive.html'
	};
}
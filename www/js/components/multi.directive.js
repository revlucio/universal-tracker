angular.module('tracker')
	.directive('utMultiActivity', multiActivity);

function multiActivity() {
	return {
		templateUrl: 'components/multi.directive.html'
	};
}
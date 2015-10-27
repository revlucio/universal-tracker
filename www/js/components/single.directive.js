angular.module('tracker')
	.directive('utSingleActivity', singleActivity);

function singleActivity() {
	return {
		templateUrl: 'js/components/single.directive.html'
	};
}
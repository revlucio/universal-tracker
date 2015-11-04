angular.module('tracker')
	.directive('utSingleActivity', singleActivity);

function singleActivity() {
	return {
		templateUrl: 'components/single.directive.html'
	};
}
angular.module('tracker')
	.directive('utTime', time);

function time() {
	return {
		templateUrl: 'components/time.directive.html',
		scope: {
			duration: '='
		}
	};
}
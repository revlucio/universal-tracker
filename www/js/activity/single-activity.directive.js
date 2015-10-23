angular.module('tracker')
	.directive('utSingleActivity', singleActivity);

function singleActivity() {
	return {
		templateUrl: 'templates/activity/single-activity.directive.html'
	};
}
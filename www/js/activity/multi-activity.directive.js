angular.module('tracker')
	.directive('utMultiActivity', multiActivity);

function multiActivity() {
	return {
		templateUrl: 'templates/activity/multi-activity.directive.html'
	};
}
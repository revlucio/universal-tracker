angular.module('tracker')
	.controller('DashboardEditCtrl', DashboardEditCtrl);

function DashboardEditCtrl(activityService) {
	var vm = this;

	vm.activities = activityService.getActivities();
	vm.moveItem = activityService.moveItem;
	vm.removeItem = activityService.remove;
}
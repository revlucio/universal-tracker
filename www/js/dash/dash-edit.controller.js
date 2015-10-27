angular.module('tracker')
	.controller('DashEditCtrl', DashEditCtrl);

function DashEditCtrl(activityService) {
	var vm = this;

	vm.activities = activityService.getActivities();
	vm.moveItem = activityService.moveItem;
	vm.removeItem = activityService.remove;
}
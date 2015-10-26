angular.module('tracker')
	.controller('AddActivityCtrl', AddActivityCtrl);

function AddActivityCtrl(activityService, $state, newActivityService) {
	var vm = this;

	vm.activityTypes = activityService.getActivityTypes();
	vm.addActivity = addActivity;
	vm.newActivity = newActivityService.get();

	function addActivity() {
		if (vm.newActivity.type === 'countdown') {
			var duration = vm.newActivity.duration.hours * 3600000 + vm.newActivity.duration.minutes * 60000 + vm.newActivity.duration.seconds * 1000;
			vm.newActivity.duration = duration;
			vm.newActivity.remaining = duration;
		} else {
			vm.newActivity.duration = 0;
			vm.newActivity.remaining = 0;
		}

		activityService.add({
			name: vm.newActivity.name,
			type: vm.newActivity.type,
			duration: vm.newActivity.duration,
			remaining: vm.newActivity.remaining,
		});
		newActivityService.reset();
		$state.go('tab.dash');
	}
}
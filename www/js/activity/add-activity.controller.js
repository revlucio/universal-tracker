angular.module('tracker')
	.controller('AddActivityCtrl', AddActivityCtrl);

function AddActivityCtrl(activityService, $state, newActivityService) {
	var vm = this;

	vm.activityTypes = activityService.getActivityTypes();
	vm.addActivity = addActivity;
	vm.newActivity = newActivityService.activity;
	vm.getDuration = getDuration;

	function getDuration() {
		return vm.newActivity.duration.hours * 3600000 
			+ vm.newActivity.duration.minutes * 60000 
			+ vm.newActivity.duration.seconds * 1000;
	}

	function addActivity(sample) {
		var duration = getDuration();

		activityService.add({
			name: vm.newActivity.name,
			type: vm.newActivity.type,
			duration: duration,
			remaining: duration,
		});

		newActivityService.activity = { duration: { hours: 0, minutes: 0, seconds: 0 }};
		$state.go('tab.dash');
	}
}
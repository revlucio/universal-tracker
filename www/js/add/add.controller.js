angular.module('tracker')
	.controller('AddCtrl', AddCtrl);

function AddCtrl(activityService, $state, newActivityService, durationService) {
	var vm = this;

	var lastActivity;

	vm.activityTypes = activityService.getActivityTypes();
	vm.addActivity = addActivity;
	vm.newActivity = newActivityService.activity;
	vm.getDuration = getDuration;
	vm.activityInvalid = activityInvalid;
	vm.nameAlreadyExists = nameAlreadyExists;
	vm.isValidDuration = durationService.isValidDuration;

	function getDuration() {
		return vm.newActivity.duration.hours * 3600000 
			+ vm.newActivity.duration.minutes * 60000 
			+ vm.newActivity.duration.seconds * 1000;
	}

	function addActivity() {
		if (lastActivity === vm.newActivity) return;
		lastActivity = vm.newActivity;

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

	function activityInvalid() {
		return !vm.newActivity.name || nameAlreadyExists();
	}

	function nameAlreadyExists() {
		if (!vm.newActivity.name) return false;

		var activities = activityService.getActivities();
		return _.find(activities, 'name', vm.newActivity.name);
	}
}
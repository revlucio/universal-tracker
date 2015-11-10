angular.module('tracker')
	.controller('DashCtrl', DashCtrl);

function DashCtrl(
	$ionicPopup, $scope, activityService, historyService, activityTimingService, 
	$filter, preferenceService, newActivityService, toastService, $ionicPopover, $state,
	appName, durationService) {
	
	var vm = this;

	var modal;

	newActivityService.activity = { duration: { hours: 0, minutes: 0, seconds: 0 }};

	vm.activities = activityService.getActivities();
	vm.clickSettings = clickSettings;
	vm.editActivities = editActivities;
	vm.goTo1Self = goTo1Self;
	vm.appName = appName;
	vm.holdActivity = holdActivity;

	$ionicPopover.fromTemplateUrl('templates/menu.html', {
	    scope: $scope,
	    animation: ''
	}).then(function(m) {
	    modal = m;
	});

	function clickSettings() {
		modal.show();
	}

	function editActivities() {
		$state.go('tab.edit');
		modal.remove();
	}

	function holdActivity() {
		$state.go('tab.edit');
	}

	function goTo1Self() {
		window.open("http://www.1self.co", '_system', 'location=no');
		modal.remove();
	}
}
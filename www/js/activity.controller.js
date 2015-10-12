angular.module('tracker')
	.controller('ActivityCtrl', ActivityCtrl);

function ActivityCtrl($ionicPopup, $scope, activityService, historyService) {
	var vm = this;

	vm.activities = activityService.getActivities();

	vm.toggleActivity = toggleActivity;
	vm.getActivityLabel = getActivityLabel;
	vm.addActivity = addActivity;
	vm.moveItem = activityService.moveItem;
	vm.removeItem = activityService.remove;
	vm.getActivityIcon = getActivityIcon;
   
	function toggleActivity(activity) {
        if (activity.type === 'quantity') {
        	toggleQuantityActivity(activity);
        }
        if (activity.type === 'single') {
        	toggleSingleActivity(activity);
        }
	}

	function getActivityLabel(activity) {
		var prefix = '';
		if (activity.type === 'quantity') {
        	prefix = 'I did some ';
        }
        if (activity.type === 'single') {
        	prefix = 'I did a ';
        }
        if (activity.type === 'duration') {
        	prefix = 'I started ';
        }
        if (activity.type === 'countdown') {
        	prefix = 'I will start ';
        }

        if (prefix === '') return '';

		return prefix + activity.name + '!';
	}

	function getActivityIcon(activity) {
		if (activity.type === 'quantity') {
        	return 'checkmark';
        }
        if (activity.type === 'single') {
        	return '';
        }
        if (activity.type === 'duration') {
        	return '';
        }
        if (activity.type === 'countdown') {
        	return '';
        }
        return '';
	}

	function addActivity() {
		$ionicPopup.show({
			title: 'What activity do you want to track?',
			inputType: 'text',
			templateUrl: 'templates/popup-add.html',
			scope: $scope,
			buttons: [{
				text: 'Cancel'
			}, {
				text: 'Add',
				type: 'button-positive',
				onTap: function() {
					if (!vm.newActivity.name || !vm.newActivity.type) {
						e.preventDefault();
					} else {
						return vm.newActivity;
					}
				}
			}]
		}).then(function(newActivity) {
			vm.newActivity = {};
	   		activityService.add(newActivity);
	 	});
	}

	function toggleQuantityActivity(activity) {
		$ionicPopup.prompt({
			title: 'How many '+activity.name+' did you do?',
			inputType: 'number',
		}).then(function(res) {
	   		activity.value = res;
    		historyService.add(activity.name, res);
	 	});
	}

	function toggleSingleActivity(activity) {
		$ionicPopup.alert({
			title: 'Congratulations!',
		}).then(function() {
	   		activity.value = new Date();
	 	});
	}
}
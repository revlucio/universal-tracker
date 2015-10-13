angular.module('tracker')
	.controller('ActivityCtrl', ActivityCtrl);

function ActivityCtrl($ionicPopup, $scope, activityService, historyService) {
	var vm = this;

	vm.activities = activityService.getActivities();

	vm.toggleActivity = toggleActivity;
	vm.addActivity = addActivity;
	vm.moveItem = activityService.moveItem;
	vm.removeItem = activityService.remove;
	vm.newActivity = {};
   
	function toggleActivity(activity) {
        if (activity.type === 'multi') {
        	logMulti(activity);
        }
        if (activity.type === 'single') {
        	logSingle(activity);
        }
        if (activity.type === 'duration') {
        	logDuration(activity);
        }
        if (activity.type === 'countdown') {
        	logCountdown(activity);
        }
	}

	function addActivity() {
		$ionicPopup.show(addPopupConfig).then(function() {
			if (vm.newActivity.name) {
				$ionicPopup.show(addPopupConfig2).then(function() {
					if (vm.newActivity.name && vm.newActivity.type) {
						vm.newActivity.duration = 0;
				   		activityService.add(vm.newActivity);
				   	}
					vm.newActivity = {};
			   	});
			}
 		});
	}

	var addPopupConfig = {
		title: 'Add a new activity',
		subTitle: 'What is the name of the activity?',
		templateUrl: 'templates/popup-name.html',
		scope: $scope,
		buttons: [{
			text: 'Cancel',
			onTap: function() {
				vm.newActivity.name = '';
			}
		}, {
			text: 'Next',
			type: 'button-positive',
			onTap: function() {
				if (!vm.newActivity.name) {
					e.preventDefault();
				}
			}
		}]
	};

	var addPopupConfig2 = {
		title: 'Add a new activity',
		subTitle: 'What is the type of the activity?',
		templateUrl: 'templates/popup-add.html',
		scope: $scope,
		buttons: [{
			text: 'Cancel'
		}, {
			text: 'Add',
			type: 'button-positive',
			onTap: function() {
				if (!vm.newActivity.type) {
					e.preventDefault();
				}
			}
		}]
	};

	function logMulti(activity) {
		$ionicPopup.prompt({
			title: 'How many '+activity.name+' did you do?',
			inputType: 'number',
		}).then(function(res) {
    		historyService.add(activity.name, res);
	 	});
	}

	function logSingle(activity) {
		$ionicPopup.alert({
			title: 'You have logged a ' + activity.name,
		}).then(function() {
    		historyService.add(activity.name, 1);
	 	});
	}

	function logDuration(activity) {
		$ionicPopup.alert({
			title: 'You have logged a ' + activity.name,
		}).then(function() {
    		historyService.add(activity.name, 1);
	 	});
	}

	function logCountdown(activity) {
		$ionicPopup.alert({
			title: 'You have logged a ' + activity.name,
		}).then(function() {
    		historyService.add(activity.name, 1);
	 	});
	}
}
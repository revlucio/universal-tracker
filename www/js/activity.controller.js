angular.module('tracker')
	.controller('ActivityCtrl', ActivityCtrl);

function ActivityCtrl($ionicPopup, $scope, activityService, historyService, ActivityTimingService, $filter) {
	var vm = this;

	vm.activities = activityService.getActivities();

	vm.toggleActivity = toggleActivity;
	vm.addActivity = addActivity;
	vm.moveItem = activityService.moveItem;
	vm.removeItem = activityService.remove;
	vm.newActivity = {};

	vm.activityTypes = [
		"Coding",
		"Commuting",
		"Excercising",
		"Meditating",
		"Meetings",
		"Partying"
	];
   
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
    		historyService.add({event: activity.name, amount: res});
	 	});
	}

	function logSingle(activity) {
		$ionicPopup.alert({
			title: 'You have logged a ' + activity.name,
		}).then(function() {
			historyService.add({event: activity.name, amount: 1});
	 	});
	}

	function logDuration(activity) {
        var activity = ActivityTimingService.updateActivity(activity, "toggle");

        if (!activity.interval) {
            var durationString = $filter('millisecondsToStringFilter')(activity.duration);
            var durationParts = durationString.split(':');

            vm.showEditPopup = function() {
                vm.data = {
                    duration: {
                        hours: parseInt(durationParts[0], 10),
                        minutes: parseInt(durationParts[1], 10),
                        seconds: parseInt(durationParts[2], 10),
                        milliseconds: parseInt(durationParts[3], 10)
                    }
                };

                var editPopupTemplate = 'Hours : Minutes : Seconds<br><input type="number" size="2" min="0" ng-model="vm.data.duration.hours"/><input type="number" size="2" min="0" max="60" ng-model="vm.data.duration.minutes"/><input type="number" size="2" min="0" max="60" ng-model="vm.data.duration.seconds"/>';

                var editPopup = $ionicPopup.show({
                    template: editPopupTemplate,
                    title: 'Edit duration',
                    subTitle: 'Please confirm the time to log',
                    scope: $scope,
                    buttons: [{
                        text: 'Cancel',
                        onTap: function(e) {
                            activity.duration = 0;
                        }
                    }, {
                        text: '<b>Log</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            return vm.data.duration.hours * 3600000 + vm.data.duration.minutes * 60000 + vm.data.duration.seconds * 1000 + vm.data.duration.milliseconds;
                        }
                    }, ]
                });
                editPopup.then(function(res) {
    				historyService.add({event:activity.name, duration:res});
                });
            };

            vm.showEditPopup();
        }
    }

	function logCountdown(activity) {
		$ionicPopup.alert({
			title: 'You have logged a ' + activity.name,
		}).then(function() {
	 	});
	}
}
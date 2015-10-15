angular.module('tracker')
	.controller('ActivityCtrl', ActivityCtrl);

function ActivityCtrl(
	$ionicPopup, $scope, activityService, historyService, activityTimingService, $filter) {
	var vm = this;

	vm.activities = activityService.getActivities();

	vm.addActivity = addActivity;
	vm.moveItem = activityService.moveItem;
	vm.removeItem = activityService.remove;
	vm.newActivity = {};
	vm.logSingle = logSingle;
	vm.logMulti = logMulti;
	vm.logDuration = logDuration;
	vm.logCountdown = logCountdown;

	vm.activityTypes = [
		"Coding",
		"Commuting",
		"Excercising",
		"Meditating",
		"Meetings",
		"Partying"
	];

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

	var logDurationConfig = {
        templateUrl: 'templates/popup-log-duration.html',
        title: 'Edit duration',
        subTitle: 'Please confirm the time to log',
        scope: $scope,
        buttons: [{
            text: 'Cancel',
            onTap: function(e) {
                //activity.duration = 0;
            }
        }, {
            text: '<b>Log</b>',
            type: 'button-positive',
            onTap: function(e) {
                return vm.data.duration.hours * 3600000 + vm.data.duration.minutes * 60000 + vm.data.duration.seconds * 1000 + vm.data.duration.milliseconds;
            }
        }, ]
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
        var activity = activityTimingService.toggleActivity(activity);

        if (!activity.interval) {
            var durationString = $filter('millisecondsToStringFilter')(activity.duration);
            var durationParts = durationString.split(':');

            vm.data = {
                duration: {
                    hours: parseInt(durationParts[0], 10),
                    minutes: parseInt(durationParts[1], 10),
                    seconds: parseInt(durationParts[2], 10),
                    milliseconds: parseInt(durationParts[3], 10)
                }
            };

            $ionicPopup.show(logDurationConfig).then(function(res) {
				historyService.add({event:activity.name, duration:res});
				activity.duration = 0;
            });
        }
    }

	function logCountdown(activity) {
        var activity = activityTimingService.toggleCountdownActivity(activity);
	}
}
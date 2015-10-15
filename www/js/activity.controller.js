angular.module('tracker')
	.controller('ActivityCtrl', ActivityCtrl);

function ActivityCtrl(
	$ionicPopup, $scope, activityService, historyService, activityTimingService, $filter, preferenceService, popupService) {
	var vm = this;

	vm.activities = activityService.getActivities();
	vm.activityTypes = activityService.getActivityTypes();

	vm.addActivity = addActivity;
	vm.moveItem = activityService.moveItem;
	vm.removeItem = activityService.remove;
	vm.newActivity = {};
	vm.logSingle = logSingle;
	vm.logMulti = logMulti;
	vm.logDuration = logDuration;
	vm.logCountdown = logCountdown;

	function addActivity() {
		popupService.showAddActivityStep1($scope, function(response) {
			if (response) {
				vm.newActivity.name = response;
				popupService.showAddActivityStep2($scope, function() {
					if (vm.newActivity.name && vm.newActivity.type) {
						vm.newActivity.duration = 0;
						vm.newActivity.remaining = 0;
				   		activityService.add(vm.newActivity);
				   	}
					vm.newActivity = {};
			   	});
			}
 		});
	}

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
        }]
    };

	function logMulti(activity) {
		vm.amount = preferenceService.getLastAmountLogged(activity.name);

		$ionicPopup.show({
        	templateUrl: 'templates/popup-logmulti.html',
			title: 'How many '+activity.name+' did you do?',
        	scope: $scope,
        	buttons: [{
	            text: 'Cancel',
	            onTap: function(e) {
	            	return null;
	            }
	        }, {
	            text: '<b>Log</b>',
	            type: 'button-positive',
	            onTap: function(e) {
	                return vm.amount;
	            }
	        }]
		}).then(function(res) {
			if (res) historyService.add({event: activity.name, amount: res});
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
			vm.data = getDurationSplit(activity);

            $ionicPopup.show(logDurationConfig).then(function(res) {
            	if (res) historyService.add({event:activity.name, duration:res});
				activity.duration = 0;
            });
        }
    }

    function getDurationSplit(activity) {
    	var durationString = $filter('millisecondsToStringFilter')(activity.duration);
        var durationParts = durationString.split(':');

		return {
            duration: {
                hours: parseInt(durationParts[0], 10),
                minutes: parseInt(durationParts[1], 10),
                seconds: parseInt(durationParts[2], 10),
                milliseconds: parseInt(durationParts[3], 10)
            }
        };
    }

	function logCountdown(activity) {
		if (!activity.interval) {
			vm.data = getDurationSplit(activity);

			$ionicPopup.show(logDurationConfig).then(function(res) {
				if (res) {
		            activity.duration = res;
					activity.remaining = activity.duration;

					activityTimingService.toggleCountdownActivity(activity);
				}
	        });	
		} else {
			var duration = moment.duration(moment().diff(activity.startDate));
			historyService.add({event:activity.name, duration:duration.asMilliseconds()});

			activityTimingService.toggleCountdownActivity(activity);
			activity.remaining = 0;
		}
	}
}
angular.module('tracker')
	.controller('DashCtrl', DashCtrl);

function DashCtrl(
	$ionicPopup, $scope, activityService, historyService, activityTimingService, 
	$filter, preferenceService, newActivityService, toastService) {
	
	var vm = this;

	newActivityService.activity = { duration: { hours: 0, minutes: 0, seconds: 0 }};

	vm.activities = activityService.getActivities();
	vm.logSingle = logSingle;
	vm.logMulti = logMulti;
	vm.logDuration = logDuration;
	vm.logCountdown = logCountdown;

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
	            disabled: true,
	            onTap: function(e) {
	            	if (vm.amount <= 0) {
	            		e.preventDefault();
	            	} else {
		                return vm.amount;
		            }
	            }
	        }]
		}).then(function(response) {
			var event = {
				event: activity.name, 
				amount: response, 
				note: vm.note,
				type: activity.type
			};
			if (response) historyService.add(event);
			vm.note = '';
			toastService.show(activity.name + ' logged', 'short', 'center');
	 	});
	}

	function logSingle(activity) {
		$ionicPopup.show({
        	templateUrl: 'templates/popup-logsingle.html',
			title: 'Do you want to log a ' + activity.name + '?',
        	scope: $scope,
        	buttons: [{
	            text: 'Cancel',
	            onTap: function(e) {
	            	return false;
	            }
	        }, {
	            text: '<b>Log</b>',
	            type: 'button-positive',
	            onTap: function(e) {
	                return true;
	            }
	        }]
		}).then(function(response) {
			var event = {
				event: activity.name, 
				amount: 1, 
				note: vm.note,
				type: activity.type
			};
			if (response) historyService.add(event);
			vm.note = '';
			toastService.show(activity.name + ' logged', 'short', 'center');
	 	});
	}

	function logDuration(activity) {
        var activity = activityTimingService.toggleActivity(activity);

        if (!activity.interval) {
			vm.data = getDurationSplit(activity.duration);

            $ionicPopup.show(logDurationConfig)
            .then(function(response) {
            	var event = {
            		event: activity.name, 
            		duration: response, 
            		note: vm.note,
            		type: activity.type
            	};
				if (response) historyService.add(event);
				activity.duration = 0;
				vm.note = '';
				toastService.show(activity.name + ' logged', 'short', 'center');
            });
        }
    }

    function getDurationSplit(duration) {
    	var durationString = $filter('millisecondsToStringFilter')(duration);
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
			activityTimingService.toggleCountdownActivity(activity);
		} else {
			activityTimingService.toggleCountdownActivity(activity);

			vm.data = getDurationSplit(activity.duration-activity.remaining+1000);

			$ionicPopup.show(logDurationConfig)
            .then(function(response) {
            	var event = {
            		event: activity.name, 
            		duration: response, 
            		note: vm.note,
            		type: activity.type
            	};
				
				if (response) historyService.add(event);
				activity.remaining = activity.duration;
				vm.note = '';
				toastService.show(activity.name + ' logged', 'short', 'center');
            });
		}
	}
}
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
	vm.logDuration = logDuration;
	vm.logCountdown = logCountdown;
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

	var logDurationConfig = {
        templateUrl: 'templates/popup-log-duration.html',
        title: 'Edit duration',
        subTitle: 'Please confirm the time to log',
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
            	console.log(vm.data.duration);
            	if (!durationService.isValidDuration(vm.data.duration)) {
            		e.preventDefault();	
            	}
                return vm.data.duration.hours * 3600000 + vm.data.duration.minutes * 60000 + vm.data.duration.seconds * 1000 + vm.data.duration.milliseconds;
            }
        }]
    };

	

	function logDuration(activity) {
        var activity = activityTimingService.toggleActivity(activity);

        if (!activity.interval) {
			vm.data = getDurationSplit(activity.duration);

            $ionicPopup.show(logDurationConfig)
            .then(function(response) {
            	if (response) {
	            	var event = {
	            		event: activity.name, 
	            		duration: response, 
	            		note: vm.note,
	            		type: activity.type
	            	};
					historyService.add(event);
					activity.duration = 0;
					var message = 'Logged ' +humanizeTime(event.duration)+ ' of ' +event.event;
					toastService.show(message, 'short', 'center');
				}
				vm.note = '';
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

			$ionicPopup
			.show(logDurationConfig)
            .then(function(response) {
            	if (response) {
	            	var event = {
	            		event: activity.name, 
	            		duration: response, 
	            		note: vm.note,
	            		type: activity.type
	            	};
					
					historyService.add(event);
					activity.remaining = activity.duration;
					var message = 'Logged ' +humanizeTime(event.duration)+ ' of ' +event.event;
					toastService.show(message, 'short', 'center');
				}
				vm.note = '';	
            });
		}
	}

	function humanizeTime(duration) {
        var tstring = $filter('millisecondsToStringFilter')(duration).split(':');
        var times = {
            hours: parseInt(tstring[0], 10),
            minutes: parseInt(tstring[1], 10),
            seconds: parseInt(tstring[2], 10)
        };

        var result = '';
        if (times.hours) result += times.hours + 'h ';
        if (times.minutes) result += times.minutes + 'm ';
        if (times.seconds) result += times.seconds + 's ';

        return result;
    };
}
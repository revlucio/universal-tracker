angular.module('tracker')
	.directive('utCountdownActivity', countdownActivity);

function countdownActivity(
	activityTimingService, $ionicPopup, $rootScope, durationService, historyService, toastService) {
	return {
		templateUrl: 'activities/countdown.directive.html',	
		scope: {
			activity: '='
		},
		link: function(scope) {
			scope.toggle = toggle;
		}
	};

	function toggle(activity) {
		activityTimingService.toggleCountdownActivity(activity);

		if (!activity.interval) {
			log(activity);
			activity.remaining = activity.duration;
		}
	}

	function log(activity) {
		activity.note = '';
		var popupScope = $rootScope.$new();
		popupScope.activity = activity;
		popupScope.data = durationService.getDurationSplit(activity.duration-activity.remaining+1000);

		$ionicPopup
		.show({
	        template: '<ut-time duration="data.duration"></ut-time><ut-note data="activity"></ut-note>',
	        title: 'Edit duration',
	        subTitle: 'Please confirm the time to log',
	        scope: popupScope,
	        buttons: [
	        	{ text: 'Cancel', onTap: function() { return false; }
        		}, {
	            text: '<b>Log</b>', type: 'button-positive',
	            onTap: function(e) {
	            	if (durationService.isValidDuration(popupScope.data.duration)) {
	            		return true;
	            	} else {
	            		e.preventDefault();	
	            	}
	            }
	        }]
	    })
        .then(function(response) {
			if (response) {
				activity.action = activity.name;
				activity.duration = durationService.durationToSeconds(popupScope.data.duration);
				var message = 'Logged ' +durationService.humanizeTime(activity.duration)+ ' of ' +activity.action;
				historyService.add(activity, message);
			}
        });
	}
}
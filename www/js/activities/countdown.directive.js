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
            	var event = {
            		event: activity.name, 
            		note: activity.note,
            		type: activity.type,
            		duration: durationService.durationToMilliseconds(popupScope.data.duration),
            	};
				historyService.add(event);
				var message = 'Logged ' +durationService.humanizeTime(event.duration)+ ' of ' +event.event;
				toastService.show(message, 'short', 'center');
			}
        });
	}
}
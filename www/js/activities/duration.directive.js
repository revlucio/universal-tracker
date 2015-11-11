angular.module('tracker')
	.directive('utDurationActivity', durationActivity);

function durationActivity(
	$ionicPopup, $rootScope, activityTimingService, historyService, $filter, toastService, durationService) {
	return {
		templateUrl: 'activities/duration.directive.html',
		scope: {
			activity: '='
		},
		link: function(scope) {
			scope.toggle = toggle;
		}
	};

	function toggle(activity) {
		activity = activityTimingService.toggleActivity(activity);

		if (!activity.interval) {
			log(activity);
			activity.duration = 0;
		}
	}

	function log(activity) {
		activity.note = '';
		var popupScope = $rootScope.$new();
		popupScope.activity = activity;
		popupScope.data = durationService.getDurationSplit(activity.duration);

        $ionicPopup.show({
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
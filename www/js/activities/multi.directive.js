angular.module('tracker')
	.directive('utMultiActivity', multiActivity);

function multiActivity(
	$ionicPopup, $rootScope, toastService, historyService, preferenceService) {
	return {
		templateUrl: 'activities/multi.directive.html',
		scope: {
			activity: '='
		},
		link: function(scope) {
			scope.log = log;
		}
	};

	function log(activity) {
		var popupScope = $rootScope.$new();
		popupScope.activity = activity;

		activity.amount = preferenceService.getLastAmountLogged(activity.name);

		$ionicPopup.show({
        	templateUrl: 'activities/multi-popup.html',
			title: 'How many '+activity.name+' did you do?',
        	scope: popupScope,
        	buttons: [{
	            text: 'Cancel',
	            onTap: function(e) {
	            	return false;
	            }
	        }, {
	            text: '<b>Log</b>',
	            type: 'button-positive',
	            onTap: function(e) {
	            	if (activity.amount <= 0) {
	            		e.preventDefault();
	            	} else {
		                return true;
		            }
	            }
	        }]
		}).then(function(response) {
			if (response) {
				var event = {
					event: activity.name, 
					note: activity.note,
					type: activity.type,
					amount: activity.amount, 
				};
				historyService.add(event);
				var message = 'Logged ' +event.amount+ ' ' +event.event;
				toastService.show(message, 'short', 'center');
			}
	 	});
	}
}
angular.module('tracker')
	.directive('utSingleActivity', singleActivity);

function singleActivity($rootScope, $ionicPopup, historyService, toastService) {
	return {
		templateUrl: 'activities/single.directive.html',
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

		$ionicPopup.show({
        	template: '<ut-note data="activity" />',
			title: 'Do you want to log a ' + activity.name + '?',
        	scope: popupScope,
        	buttons: [{
	            text: 'Cancel',
	            onTap: function() {
	            	return false;
	            }
	        }, {
	            text: '<b>Log</b>',
	            type: 'button-positive',
	            onTap: function() {
	                return true;
	            }
	        }]
		}).then(function(response) {
			if (response) {
				var event = {
					event: activity.name, 
					note: activity.note,
					type: activity.type,
					amount: 1
				};
				historyService.add(event);
				var message = 'Logged a single ' +event.event;
				toastService.show(message, 'short', 'center');
			}
	 	});
	}
}
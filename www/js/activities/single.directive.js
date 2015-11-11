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
					action: activity.name, 
					note: activity.note,
					amount: 1
				};
				var message = 'Logged a single ' +event.action;
				historyService.add(event, message);
				activity.note = '';
			}
	 	});
	}
}
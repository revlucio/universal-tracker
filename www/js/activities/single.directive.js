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
		activity.note = '';
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
				activity.action = activity.name;
				activity.amount = 1;
				var message = 'Logged a single ' +activity.action;
				historyService.add(activity, message);
			}
	 	});
	}
}
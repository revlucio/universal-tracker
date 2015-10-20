angular.module('tracker')
	.factory('popupService', popupService);

function popupService($ionicPopup, $rootScope, activityService) {
	return {
		showAddActivityStep1: showAddActivityStep1,
		showAddActivityStep2: showAddActivityStep2
	};

	function showAddActivityStep1(then) {
		var $scope = $rootScope.$new();
		$scope.vm = { 
			activityTypes: activityService.getActivityTypes(),
			activityChosen: function() {
				$scope.vm.newActivity.customName = '';
			},
			customNameEntered: function() {
				$scope.vm.newActivity.name = '';
			}
		 };

		var addPopupConfig = {
			title: 'Add a new activity',
			subTitle: 'What is the name of the activity?',
			templateUrl: 'templates/popup-name.html',
			scope: $scope,
			buttons: [{
				text: 'Cancel',
				onTap: function() {
					return null;
				}
			}, {
				text: 'Next',
				type: 'button-positive',
				onTap: function(e) {
					if (!$scope.vm.newActivity) {
						e.preventDefault();
					} else {
						var activity = $scope.vm.newActivity;
						if (activity.customName) activity.name = activity.customName
						return activity;
					}
				}
			}]
		};

		$ionicPopup.show(addPopupConfig).then(then);
	}

	function showAddActivityStep2(newActivity, then) {
		var $scope = $rootScope.$new();
		$scope.vm = { newActivity: newActivity };
		
		var addPopupConfig2 = {
			title: 'Add a new activity',
			subTitle: 'What is the type of the activity?',
			templateUrl: 'templates/popup-add.html',
			scope: $scope,
			buttons: [{
				text: 'Cancel'
			}, {
				text: 'Add',
				type: 'button-positive',
				onTap: function(e) {
					if (!$scope.vm.newActivity.type) {
						e.preventDefault();
					} else {
						return $scope.vm.newActivity;
					}
				}
			}]
		};

		$ionicPopup.show(addPopupConfig2).then(then);
	}
}
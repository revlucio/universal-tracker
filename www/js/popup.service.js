angular.module('tracker')
	.factory('popupService', popupService);

function popupService($ionicPopup) {
	return {
		showAddActivityStep1: showAddActivityStep1,
		showAddActivityStep2: showAddActivityStep2
	};

	function showAddActivityStep1($scope, then) {
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
					if (!$scope.vm.newActivity.name) {
						e.preventDefault();
					} else {
						return $scope.vm.newActivity.name;
					}
				}
			}]
		};

		$ionicPopup.show(addPopupConfig).then(then);
	}

	function showAddActivityStep2($scope, then) {
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
				onTap: function() {
					if (!$scope.vm.newActivity.type) {
						e.preventDefault();
					}
				}
			}]
		};

		$ionicPopup.show(addPopupConfig2).then(then);
	}
}
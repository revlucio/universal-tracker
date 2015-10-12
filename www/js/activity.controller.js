angular.module('tracker')
	.controller('ActivityCtrl', ActivityCtrl);

function ActivityCtrl($ionicPopup, $scope) {
	var vm = this;

	// vm.activities = [
	// 	{ type: 'quantity', name: 'push ups' },
	// 	{ type: 'quantity', name: 'coffees' },
	// 	{ type: 'single', name: 'pomodoro' },
	// 	{ type: 'duration', name: 'commute' },
	// 	{ type: 'countdown', name: 'meditate' }
	// ];
	vm.activities = [];

	vm.toggleActivity = toggleActivity;
	vm.result;
	vm.getActivityLabel = getActivityLabel;
	vm.addActivity = addActivity;

	function toggleActivity(activity) {
        if (activity.type === 'quantity') {
        	toggleQuantityActivity(activity);
        }
        if (activity.type === 'single') {
        	toggleSingleActivity(activity);
        }
	}

	function getActivityLabel(activity) {
		var prefix = '';
		if (activity.type === 'quantity') {
        	prefix = 'I did some ';
        }
        if (activity.type === 'single') {
        	prefix = 'I did a ';
        }
        if (activity.type === 'duration') {
        	prefix = 'I started ';
        }
        if (activity.type === 'countdown') {
        	prefix = 'I will start ';
        }

		return prefix + activity.name + '!';
	}

	function addActivity() {
		$ionicPopup.show({
			title: 'What activity do you want to track?',
			inputType: 'text',
			templateUrl: '/templates/popup-add.html',
			scope: $scope,
			buttons: [{
				text: 'Cancel'
			}, {
				text: 'Add',
				type: 'button-positive',
				onTap: function() {
					return vm.newActivityName;
				}
			}]
		}).then(function(res) {
	   		vm.activities.push({name: res, type: 'quantity'})
	 	});
	}

	function toggleQuantityActivity(activity) {
		$ionicPopup.prompt({
			title: 'How many '+activity.name+' did you do?',
			inputType: 'number',
		}).then(function(res) {
	   		activity.value = res;
	 	});
	}

	function toggleSingleActivity(activity) {
		$ionicPopup.alert({
			title: 'Congratulations!',
		}).then(function() {
	   		activity.value = new Date();
	 	});
	}
}
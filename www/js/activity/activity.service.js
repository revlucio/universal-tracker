angular.module('tracker')
	.factory('activityService', activityService);

function activityService() {
    var activities = loadActivities();

	return {
		moveItem: moveItem,
		getActivities: getActivities,
		add: add,
		remove: remove,
        getActivityTypes: getActivityTypes,
        getActionTags: getActionTags
	};

    function loadActivities() {
        if (window.localStorage.activities) {
            return JSON.parse(window.localStorage.activities);
        } else {
            return [
                { name: 'Push ups', type: 'multi' },
                { name: 'Drank a coffee', type: 'single' },
                { name: 'Commuting', type: 'duration', duration: 0 },
                { name: 'Meditating', type: 'countdown' }
            ];
        }
    }

    function getActivityTypes() {
        return [
            "Coding",
            "Commuting",
            "Excercising",
            "Meditating",
            "Meetings",
            "Partying"
        ];
    }

    function getActionTags() {
        return [];
    }

	function moveItem(item, fromIndex, toIndex) {
    	activities.splice(fromIndex, 1);
    	activities.splice(toIndex, 0, item);
		save();
    }

    function getActivities() {
        return activities;
    }

    function add(activity) {
    	activities.push(activity);
   		save();
    }

    function remove(index) {
    	activities.splice(index, 1);
    	save();
    }

    function save() {
   		window.localStorage.activities = JSON.stringify(activities);
    }
}

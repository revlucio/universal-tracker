angular.module('tracker')
	.factory('activityService', activityService);

function activityService() {
	var activities = JSON.parse(window.localStorage['activities'] || '[]');;

	return {
		moveItem,
		get,
		add,
		remove
	};

	function moveItem(item, fromIndex, toIndex) {
    	activities.splice(fromIndex, 1);
    	activities.splice(toIndex, 0, item);
		save();
    }

    function get() {
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
   		window.localStorage['activities'] = JSON.stringify(activities);
    }
}

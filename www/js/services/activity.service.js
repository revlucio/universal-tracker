angular.module('tracker')
	.factory('activityService', activityService);

function activityService($filter) {
    var activities = loadActivities();
    var activityTypes = [
        "Coding",
        "Commuting",
        "Excercising",
        "Meditating",
        "Meetings",
        "Partying",
        "Playing Instrument",
        "Playing Games",
        "Reading",
        "Sitting",
        "Sleeping",
        "Standing",
        "Studying",
        "Tooth Brushing",
        "Tooth Flossing",
        "TV Watching ",
        "Working",
        "Writing"
    ];

	return {
		moveItem: moveItem,
		getActivities: getActivities,
		add: add,
		remove: remove,
        getActivityTypes: getActivityTypes,
        getActionTags: getActionTags,
        getDurationSplit: getDurationSplit
	};

    function loadActivities() {
        if (window.localStorage.activities) {
            return JSON.parse(window.localStorage.activities);
        } else {
            return [
                { name: 'Push ups', type: 'multi' },
                { name: 'Drank a coffee', type: 'single' },
                { name: 'Commuting', type: 'duration', duration: 0 },
                { name: 'Meditating', type: 'countdown', duration: 600000, remaining: 600000 }
            ];
        }
    }

    function getActivityTypes() {
        var currentActivityNames = _.map(getActivities(), 'name');
        var filtered = _.filter(activityTypes, function(type) {
            return !_.includes(currentActivityNames, type);
        });
        return filtered;
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

    function getDurationSplit(activity) {
        var durationString = $filter('millisecondsToStringFilter')(activity.duration);
        var durationParts = durationString.split(':');

        return {
            duration: {
                hours: parseInt(durationParts[0], 10),
                minutes: parseInt(durationParts[1], 10),
                seconds: parseInt(durationParts[2], 10),
                milliseconds: parseInt(durationParts[3], 10)
            }
        };
    }
}

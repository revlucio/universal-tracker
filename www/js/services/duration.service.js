angular.module('tracker')
	.factory('durationService', durationService);

function durationService($filter) {
	return {
		isValidDuration: isValidDuration,
		durationToMilliseconds: durationToMilliseconds,
		humanizeTime: humanizeTime,
		getDurationSplit: getDurationSplit,
        durationToSeconds: durationToSeconds
	};

	function isValidDuration(duration) {
		if (duration && (
			duration.hours > 0 || 
			duration.minutes > 0 || 
			duration.seconds > 0)
			) return true;

		return false;
	}

	function durationToMilliseconds(duration) {
    	return duration.hours * 3600000 + duration.minutes * 60000 + duration.seconds * 1000 + duration.milliseconds;
    }

    function durationToSeconds(duration) {
        return Math.floor(durationToMilliseconds(duration) / 1000);
    }

    function humanizeTime(duration) {
        var tstring = $filter('millisecondsToStringFilter')(duration*1000).split(':');
        var times = {
            hours: parseInt(tstring[0], 10),
            minutes: parseInt(tstring[1], 10),
            seconds: parseInt(tstring[2], 10)
        };

        var result = '';
        if (times.hours) result += times.hours + 'h ';
        if (times.minutes) result += times.minutes + 'm ';
        if (times.seconds) result += times.seconds + 's ';

        return result;
    };

    function getDurationSplit(duration) {
    	var durationString = $filter('millisecondsToStringFilter')(duration);
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

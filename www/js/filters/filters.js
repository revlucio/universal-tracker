angular.module('tracker')
    .filter('durationPartFilter', function() {
        return function(str) {
            return str.substr(0, 8);
        }
    })
    .filter('tenthsPartFilter', function() {
        return function(str) {
            return str.substr(9, str.length);
        }
    })
    .filter('buildEventFilter', function() {
        return function(activity) {
            return {
                "activity": activity.title,
                "dateTime": activity.startDate,
                "duration": activity.duration/1000
            };
        };
    });
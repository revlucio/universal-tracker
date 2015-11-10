angular.module('tracker')
    .service('activityTimingService', activityTimingService);

function activityTimingService(
    moment, $interval, NotificationService, historyService, toastService, $filter) {
    return {
        toggleActivity: toggleActivity,
        toggleCountdownActivity: toggleCountdownActivity
    };
    

    function toggleActivity(activity) {
        if (!activity.interval) {
            NotificationService.showNotification();
            activity.startDate = moment();
            updateActivityTime();
            activity.interval = $interval(updateActivityTime, 100);
            storeActiveActivity(activity);
        } else {
            NotificationService.cancelNotification();
            $interval.cancel(activity.interval);
            delete activity.interval;
            removeActiveActivity(activity);
        }

        function updateActivityTime() {
            var elapsedTime = moment.duration(moment().diff(activity.startDate));
            activity.duration = elapsedTime.asMilliseconds();
        };

        function updateActiveActivity() {
            var active_activities = getActiveActivities();
            if(activity.title in active_activities){
                activity.startDate = active_activities[activity.title].startDate;

                //cancel any previous intervals (if, any)
                $interval.cancel(activity.interval);

                //create new
                updateActivityTime();
                activity.interval = $interval(updateActivityTime, 100);
            }
        };

        return activity;
    };

    function toggleCountdownActivity(activity) {
        if (!activity.interval) {
            NotificationService.showNotification();
            activity.startDate = moment();
            activity.endDate = moment().add(activity.duration, 'ms');
            updateActivityTime();
            activity.interval = $interval(updateActivityTime, 100);
            storeActiveActivity(activity);
        } else {
            NotificationService.cancelNotification();
            $interval.cancel(activity.interval);
            delete activity.interval;
            removeActiveActivity(activity);
        }

        function updateActivityTime() {
            if (activity.remaining > 100) {
                var timeRemaining = moment.duration(moment(activity.endDate).diff(moment()));
                activity.remaining = timeRemaining.asMilliseconds();
            } else {

                var duration = moment.duration(moment().diff(activity.startDate));
                var event = { event:activity.name, duration:duration.asMilliseconds() };
                historyService.add(event);
                var message = 'Logged ' +humanizeTime(event.duration)+ ' of ' +event.event;
                toastService.show(message, 'short', 'center');

                NotificationService.cancelNotification();
                $interval.cancel(activity.interval);
                activity.remaining = activity.duration;
                delete activity.interval;
                removeActiveActivity(activity);
            }
        }

        function humanizeTime(duration) {
            var tstring = $filter('millisecondsToStringFilter')(duration).split(':');
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
        }
    }

    // --- privates --- //

    function storeActiveActivity(activity) {
        var active_activities = getActiveActivities();
        active_activities[activity.title] = {startDate: activity.startDate};
        window.localStorage.active_activities = angular.toJson(active_activities);
    };

    function removeActiveActivity(activity) {
        var active_activities = getActiveActivities();
        delete active_activities[activity.title];
        window.localStorage.active_activities = angular.toJson(active_activities);
    };

    function getActiveActivities() {
        var active_activities = window.localStorage.active_activities;
        if (active_activities) {
            return angular.fromJson(active_activities);
        } else {
            return {};
        }
    };
}
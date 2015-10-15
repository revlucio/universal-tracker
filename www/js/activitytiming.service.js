angular.module('tracker')
    .service('activityTimingService', activityTimingService);

function activityTimingService(moment, $interval, NotificationService, historyService) {
    return {
        toggleActivity,
        toggleCountdownActivity
    };

    function toggleActivity(activity) {
        if (!activity.interval) {
            // NotificationService.showNotification();
            activity.startDate = moment();
            updateActivityTime();
            activity.interval = $interval(updateActivityTime, 100);
            storeActiveActivity(activity);
        } else {
            // NotificationService.cancelNotification();
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
            activity.startDate = moment();
            activity.endDate = moment().add(activity.duration, 'ms');
            updateActivityTime();
            activity.interval = $interval(updateActivityTime, 100);
            storeActiveActivity(activity);
        } else {
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
                historyService.add({event:activity.name, duration:duration.asMilliseconds()});

                $interval.cancel(activity.interval);
                delete activity.interval;
                removeActiveActivity(activity);
            }
        };
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
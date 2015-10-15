angular.module('tracker')
    .service('activityTimingService', activityTimingService);

function activityTimingService(moment, $interval, NotificationService) {
    var toggleActivity = function(activity) {
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

        function getActiveActivities() {
            var active_activities = window.localStorage.active_activities;
            if (active_activities) {
                return angular.fromJson(active_activities);
            } else {
                return {};
            }
        };

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

    return {
        toggleActivity
    };
}
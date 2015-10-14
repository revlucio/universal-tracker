angular.module('tracker')
    .service('ActivityTimingService', ActivityTimingService);

function ActivityTimingService(moment, $interval, NotificationService) {
    var updateActivity = function(activity, action) {
        var updateActivityTime = function() {
            var elapsedTime = moment.duration(moment().diff(activity.startDate));
            activity.duration = elapsedTime.asMilliseconds();
        },

        getActiveActivities = function(){
            var active_activities = window.localStorage.active_activities;
            if (active_activities) {
                return angular.fromJson(active_activities);
            } else {
                return {};
            }
        },

        storeActiveActivity = function(activity){
            var active_activities = getActiveActivities();
            active_activities[activity.title] = {startDate: activity.startDate};
            window.localStorage.active_activities = angular.toJson(active_activities);
        },

        removeActiveActivity = function(activity){
            var active_activities = getActiveActivities();
            delete active_activities[activity.title];
            window.localStorage.active_activities = angular.toJson(active_activities);
        },

        toggleActivity = function(){
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
        },

        updateActiveActivity = function(){
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

        //main
        if("toggle" == action){
            toggleActivity();
        }
        else{
            updateActiveActivity();
        }

        return activity;
    };

    return {
        updateActivity: updateActivity
    };
}
angular.module('tracker')
    .factory('NotificationService', NotificationService);

function NotificationService($ionicPlatform){
    var id = "1";
    var count = 0;

    if (window.localStorage.active_activities) {
        count = Object.keys(angular.fromJson(window.localStorage.active_activities)).length;
    }

    return {
        showNotification: showNotification,
        cancelNotification: cancelNotification
    };

    function showNotification() {
        if (window.plugin) {
            $ionicPlatform.ready(function() {
                count++;
                id = window.plugin.notification.local.add({
                    id: id,
                    title: 'Universal Tracker',
                    message: 'Timers active:',
                    date: new Date(),
                    ongoing: true,
                    badge: count
                });
            });
        }
    };

    function cancelNotification() {
        if (window.plugin) {
            $ionicPlatform.ready(function() {
                count--;
                if (count === 0) {
                    window.plugin.notification.local.cancelAll();
                }
                else {
                    window.plugin.notification.local.add({
                        id: id,
                        title: 'Duration',
                        message: 'Timer active',
                        ongoing: true,
                        sound: null,
                        badge: count});
                }
            });
        }
    };
}

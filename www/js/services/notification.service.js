angular.module('tracker')
    .factory('NotificationService', NotificationService);

function NotificationService($ionicPlatform, appName){
    var id = "1";
    var count = 0;
    var message = "Timers active:";

    if (window.localStorage.active_activities) {
        count = Object.keys(angular.fromJson(window.localStorage.active_activities)).length;
    }

    return {
        showNotification: showNotification,
        cancelNotification: cancelNotification
    };

    function showNotification() {
        if (window.plugin && window.plugin.notification) {
            $ionicPlatform.ready(function() {
                count++;
                id = window.plugin.notification.local.add({
                    id: id,
                    title: appName,
                    message: message,
                    date: new Date(),
                    ongoing: true,
                    badge: count
                });
            });
        } else {
            console.log('Notification shown');
        }
    };

    function cancelNotification() {
        if (window.plugin && window.plugin.notification) {
            $ionicPlatform.ready(function() {
                count--;
                if (count === 0) {
                    window.plugin.notification.local.cancelAll();
                }
                else {
                    window.plugin.notification.local.add({
                        id: id,
                        title: appName,
                        message: message,
                        ongoing: true,
                        sound: null,
                        badge: count});
                }
            });
        } else {
            console.log('Notification cancelled');
        }
    };
}

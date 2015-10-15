angular.module('tracker')
    .filter('humanize', humanize);

function humanize(moment) {
    moment.locale('en', {
        calendar: {
            lastDay: '[Yesterday]',
            sameDay: '[Today]',
            lastWeek: '[Last] dddd LL',
            sameElse: 'LL'
        }
    });

    return function(date) {
        return moment(date).calendar();
    };
}
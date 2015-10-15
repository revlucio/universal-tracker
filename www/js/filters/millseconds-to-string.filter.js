angular.module('tracker')
    .filter('millisecondsToStringFilter', millisecondsToStringFilter);

function millisecondsToStringFilter() {
    return function(milliseconds) {
        if (milliseconds !== 0 && !milliseconds) return "";

        var seconds = Math.floor(milliseconds / 1000);
        milliseconds = Math.floor((milliseconds % 1000) / 100);
        var minutes = Math.floor(seconds / 60);
        seconds = seconds - (minutes * 60);
        var hours = Math.floor(minutes / 60);
        minutes = minutes - (hours * 60);

        var zeroPad = function(num, numZeros) {
            var n = Math.abs(num);
            var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
            var zeroString = Math.pow(10, zeros).toString().substr(1);
            if (num < 0) {
                zeroString = '-' + zeroString;
            }
            return zeroString + n;
        }

        var durationString = '';
        durationString += zeroPad(hours, 2) + ':' + zeroPad(minutes, 2) + ':' + zeroPad(seconds, 2) + ":" + zeroPad(milliseconds, 2);
        return durationString;
    };
}
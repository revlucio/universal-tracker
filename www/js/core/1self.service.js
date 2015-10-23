angular.module('tracker')
	.factory('oneSelfService', oneSelfService);

function oneSelfService(API) {
    var lib1self = new Lib1selfClient(API, "sandbox");

    var stream;
    lib1self.fetchStream(function(err, response) {
        stream = response;
    });

	return {
		sendEventToApi: sendEventToApi,
		getChartUrl: getChartUrl
	};

	function sendEventToApi(event) {
		var eventToLog = {
            source: API.appName,
            version: API.appVersion,
            objectTags: ["self"],
            actionTags: event.event,
            properties: { }
        };

        if (event.note) eventToLog.note = event.note;

        if (event.amount) { 
            eventToLog.properties.quantity = event.amount;
        } else {
            eventToLog.properties.duration = event.duration / 1000;
        }

        lib1self.sendEvent(eventToLog, stream);
	}

	function getChartUrl(actionTag, type) {
        var sum = (type === 'single' || type === 'multi') ? 'quantity' : 'duration';

		var url = lib1self
            .objectTags(["self"])
            .actionTags([actionTag])
            .sum(sum)
            .barChart()
            .backgroundColor("ddcc19")
            .url(stream);

        return url;
	}
}
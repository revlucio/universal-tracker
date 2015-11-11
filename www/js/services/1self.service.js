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
            actionTags: clean(event.action),
            properties: { },
        };

        if (event.note) {
            eventToLog.note = event.note;
        }

        if (event.amount) { 
            eventToLog.properties.quantity = event.amount;
        } else if (event.duration) {
            eventToLog.properties.duration = event.duration;
        }

        lib1self.sendEvent(eventToLog, stream);
	}

	function getChartUrl(actionTag, type) {
        var sum = (type === 'single' || type === 'multi') ? 'quantity' : 'duration';

		var url = lib1self
            .objectTags(["self"])
            .actionTags([clean(actionTag)])
            .sum(sum)
            .barChart()
            .backgroundColor("00B8E7")
            .url(stream);

        return url;
	}

    function clean(event) {
        return event.toLowerCase().replace(' ', '-');
    }
}
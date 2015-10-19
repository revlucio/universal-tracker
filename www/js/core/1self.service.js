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
            "source": API.appName,
            "version": API.appVersion,
            "objectTags": ["self"],
            "actionTags": event.event,
            "properties": {
                "quantity": event.amount
            }
        };

        lib1self.sendEvent(eventToLog, stream);
	}

	function getChartUrl(actionTags) {
		var url = lib1self
            .objectTags(["self"])
            .actionTags(actionTags)
            .sum("quantity")
            .barChart()
            .backgroundColor("ddcc19")
            .url(stream);

        return url;
	}
}
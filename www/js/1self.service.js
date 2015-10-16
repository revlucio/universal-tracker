angular.module('tracker')
	.factory('oneSelfService', oneSelfService);

function oneSelfService() {
	var config = {
        appId: "app-id-2ce584ae4feb02d056bf92c83c4a643e",
        appSecret: "app-secret-c798c1120a9e56ec047da064431c75da1619efb58c00f4ab0611e2f3c6fd62f8",
        "appName": "co.1self.universaltracker",
        "appVersion": "0.0.1"
    };

    var lib1self = new Lib1selfClient(config, "sandbox");

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
            "source": config.appName,
            "version": config.appVersion,
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
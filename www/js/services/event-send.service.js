angular.module('tracker')
    .service('EventSendService', EventSendService);

function EventSendService($http, $timeout, API, $filter) {
    var getQueue = function() {
        var queueString = window.localStorage.events;
        if (queueString) {
            return angular.fromJson(queueString);
        } else {
            return [];
        }
    },

    queueEvent = function(activity) {
        var queue = getQueue();
        queue.push(activity);
        window.localStorage.events = angular.toJson(queue);
    },

    getLastSentIndex = function(){
        var last_event_sent_index = window.localStorage.last_event_sent_index;
        if(typeof last_event_sent_index === 'undefined'){
            return -1;
        }else{
            return parseInt(last_event_sent_index, 10);
        }
    },

    updateLastSentIndex = function(number_of_sent) {
        var last_index = getLastSentIndex(),
        new_last_sent_index = last_index + number_of_sent;
        window.localStorage.last_event_sent_index = new_last_sent_index;
    },


    getUnsentEvents = function() {
        var queue = getQueue(),
        last_event_sent_index = getLastSentIndex(),
        queue_length = queue.length;

        return queue.slice(last_event_sent_index + 1, queue_length);
    },

    sendEvents = function() {
        var api_credentials = angular.fromJson(window.localStorage.api_credentials),
        api_headers = {
            'Authorization': api_credentials.writeToken,
            'Content-Type': 'application/json'
        },

        buildAPIEvent = function(event) {
            // var tags = ActivitiesService.getTags(event.activity);
            return {
                "dateTime": event.dateTime,
                "source": API.appName,
                "version": API.appVersion,
                // "objectTags": tags.objectTags,
                // "actionTags": tags.actionTags,
                "properties": {
                    "duration": event.duration
                }
            };
        },

        lock = false,

        poller = function() {
            var api_events = [],
            events = getUnsentEvents();

            if (0 !== events.length) {
                for (var i = 0; i < events.length; i++) {
                    api_events.push(buildAPIEvent(events[i]));
                }
                
            if (!lock) {
                lock = true;
                $http.post(API.endpoint + "/v1/streams/" + api_credentials.streamid + '/events/batch',
                        api_events, {
                            headers: api_headers
                        })
                    .success(function(data) {
                        updateLastSentIndex(api_events.length);
                        lock = false;
                    })
                    .error(function(data) {
                        lock = false;
                    });
            }
        }
            $timeout(poller, 2000);
        };

        poller();
    };

    return {
        queueEvent: queueEvent,
        sendEvents: sendEvents,
        getQueue: getQueue
    };
}
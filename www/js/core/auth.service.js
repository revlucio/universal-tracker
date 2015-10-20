angular.module('tracker')
    .factory('AuthenticationService', AuthenticationService);

function AuthenticationService($http, API, $ionicPopup, $cordovaToast, EventSendService) {
    var auth_headers = {
        'Authorization': API.appId + ":" + API.appSecret
    };
    
    return {
        authenticate: showDisclaimer,
        authenticated: authenticated
    };

    function showDisclaimer(force_show, callback) {
        var onConfirm = function(res) {
            if (res) {
                console.log("Authenticated, yay!");
                registerStream();
                try {
                    $cordovaToast.show("Authenticating...", 'long', 'bottom');
                } catch (e) {
                    console.error(new Error(e));
                }
            } else {
                window.localStorage.api_credentials = 'Not authenticated';
                console.log('Not authenticated :(');
            }
            if(callback) callback(res);
        };
        var api_credentials = window.localStorage.api_credentials;

        if (typeof api_credentials === 'undefined' || force_show) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Duration Data Policy',
                template: "<style>.button-continue{background-color: #00b8e7;}</style><p>1self Duration uses the 1self cloud to show you smart visualizations of your activity. Once connected you can also share and correlate your data. Your raw data will never be shown and it won't be possible to tell who you are or where you've been. Would you like to connect Duration to the 1self cloud?</p>",
                buttons: [{
                    text: 'No thanks',
                    onTap: function(e) {
                        onConfirm(false);
                    }
                }, {
                    text: 'Continue',
                    type: 'button-continue',
                    onTap: function(e) {
                        onConfirm(true);
                    }
                }]
            });
        }
    };

    
    function registerStream() {
        $http.post(API.endpoint + "/v1/streams", {}, {
            headers: auth_headers
        })
        .success(function(data) {
            window.localStorage.api_credentials = angular.toJson(data);
            window.localStorage.last_event_sent_index = -1;

            //a continuous service to send pending events
            EventSendService.sendEvents();

            try {
                $cordovaToast.show("Authenticated", 'long', 'bottom')
            } catch (e) {
                console.error(new Error(e));
            }
        })
        .error(function(data, status, headers, config) {
            //try again next time :(
        });
    };

    function authenticated() {
        var api_credentials = window.localStorage.api_credentials;
        return (api_credentials !== "Not authenticated") && (typeof api_credentials !== 'undefined');
    };
}
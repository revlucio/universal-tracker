angular.module('tracker')
	.factory('toastService', toastService);

function toastService($cordovaToast) {
	return {
		show: show
	};

	function show(message, duration, position) {
		if (window.plugin && window.plugin.toast) {
            $cordovaToast.show(message, duration, position);
        } else {
        	console.log('Toast: ' +message+ ' | ' +duration+ ' | ' +position)
        }
	}
}
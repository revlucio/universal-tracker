angular.module('tracker')
	.factory('toastService', toastService);

function toastService() {
	return {
		show: show
	};

	function show(message, duration, position) {
		if (window.plugins && window.plugins.toast) {
            window.plugins.toast.show(message, duration, position);
        } else {
        	console.log('Toast: ' +message+ ' | ' +duration+ ' | ' +position)
        }
	}
}
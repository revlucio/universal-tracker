angular.module('tracker')
	.directive('utClick', click);

// this exists to prevent the 'double click' issue when ngTouch is used
function click() {
    return function(scope, element, attrs) {
        element.bind('touchstart click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            scope.$apply(attrs['utClick']);
        });
    };
}

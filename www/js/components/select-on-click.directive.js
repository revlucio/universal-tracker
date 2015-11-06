angular.module('tracker')
    .directive('utSelectOnClick', selectOnClick);

function selectOnClick($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('mouseup', function () {
                this.setSelectionRange(0, this.value.length);
            });
        }
    }
}

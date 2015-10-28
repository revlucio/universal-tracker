angular.module('tracker')
  .directive('utRestrict', restrict);

function restrict() {
  return {
    require: '?ngModel',
    restrict: 'A',
    link: function(scope, element, attributes, ngModelCtrl) {
      if(!ngModelCtrl) {
        return; 
      }

      var match = new RegExp(attributes.utRestrict, 'g');

      ngModelCtrl.$parsers.push(function(val) {
        var clean = val.match(match) ? val.match(match).join('') : '';

        ngModelCtrl.$setViewValue(clean);
        ngModelCtrl.$render();
        return clean;
      });

      // for some reason space bar doesnt fire by default
      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
}
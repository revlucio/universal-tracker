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
        var asString = (val) ? val.toString() : '';
        var clean = asString.match(match) ? asString.match(match).join('') : '';

        if (clean !== asString) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });
    }
  };
}
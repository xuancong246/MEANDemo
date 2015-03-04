(function() {
  angular.module('app').filter('stickCross', StickCross);
  StickCross.$inject = [];

  function StickCross() {
    return function(input) {
      return input ? '\u2713' : '\u2718';
    }
  }
})();

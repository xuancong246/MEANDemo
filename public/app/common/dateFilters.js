(function() {
  angular.module('app').filter('standardDate', StandardDate);
  StandardDate.$inject = ['$filter'];

  function StandardDate($filter) {
    var angularDateFilter = $filter('date');
    return function(date) {
      return angularDateFilter(date, 'dd-MMM-yyyy');
    }
  }
})();

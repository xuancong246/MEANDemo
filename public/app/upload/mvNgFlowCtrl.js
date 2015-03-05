(function() {
  angular.module('app').controller('mvNgFlowCtrl', MvNgFlowCtrl);
  MvNgFlowCtrl.$inject = ['$scope'];

  function MvNgFlowCtrl($scope) {
    init();
    function init() {
      $scope.$on('flow::fileAdded', function () {
        alert('file added');
      });
    }
  }
})();

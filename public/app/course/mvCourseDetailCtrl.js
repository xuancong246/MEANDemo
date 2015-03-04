(function() {
  angular.module('app').controller('mvCourseDetailCtrl', MvCourseDetailCtrl);
  MvCourseDetailCtrl.$inject = ['mvCachedCoursesSvc', '$routeParams'];

  function MvCourseDetailCtrl(mvCachedCoursesSvc, $routeParams) {
    var vm = this;
    vm.model = {};

    init();
    function init() {
      var courseId = $routeParams.id;
      vm.model.course = mvCachedCoursesSvc.getByIdFromCache(courseId);
      if (vm.model.course === undefined) {
        var temp = mvCachedCoursesSvc.get(courseId);
        temp.$promise.then(function(data) {
          vm.model.course = data;
        }, function(reason) {
          console.log(reason);
        });
      }
    }
  }
})();

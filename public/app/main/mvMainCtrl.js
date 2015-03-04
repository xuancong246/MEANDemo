(function() {
  'use strict',
  angular.module('app').controller('mvMainCtrl', MvMainCtrl);
  MvMainCtrl.$inject = ['mvCachedCoursesSvc', 'systemCfg'];

  function MvMainCtrl(mvCachedCoursesSvc, systemCfg) {
    var vm = this;
    vm.model = {};
    vm.model.courses = [];

    init();
    function init() {
      console.log('congtest:' + systemCfg.standardDateFormat);
      var tempCourses = vm.model.courses = mvCachedCoursesSvc.getCoursesFromCache();
      if (tempCourses === undefined) {
        if (mvCachedCoursesSvc.getInitialDataStatus() === 'none') {
          //TODO: need to refactor
          mvCachedCoursesSvc.initialData();
          mvCachedCoursesSvc.query().$promise.then(function(data) {
            vm.model.courses = data;
          }, function(reason) {
            console.log(reason);
            vm.model.courses = [];
          });
        } else {
          vm.model.courses = [];
        }
      }
    }
  }
})();

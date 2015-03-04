(function() {
  angular.module('app').controller('mvCourseListCtrl', MvCourseListCtrl);
  MvCourseListCtrl.$inject = ['mvCachedCoursesSvc', '$http', '$filter', 'filterFilter'];

  function MvCourseListCtrl(mvCachedCoursesSvc, $http, $filter, filterFilter) {
    var vm = this;
    vm.model = {
      sortOptions: [{
        value: 'title',
        text: 'Sort by Title'
      }, {
        value: 'published',
        text: 'Sort by Publish Date'
      }],
      courses: [],
      searchText: ''
    };
    vm.model.sortOrder = vm.model.sortOptions[0].value;

    vm.exportCsv = exportCsv;

    init();
    function init() {
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

    function exportCsv() {
      var exportedCourses = filterFilter(vm.model.courses, vm.model.searchText);
      exportedCourses = $filter('orderBy')(exportedCourses, vm.model.sortOrder);
      return getCoursesForCSV(exportedCourses);

      function getCoursesForCSV(courses_) {
        var returnCourses = [];
        if (courses_ && typeof courses_ === 'object' && courses_.length > 0) {
          for (var i = 0; i < courses_.length; i ++) {
            var course = courses_[i];
            var tempCourse = {
              title: course.title,
              // published: $filter('date')(course.published, 'dd-MMM-yyyy'),
              published: $filter('standardDate')(course.published),
              featured: course.featured,
            };
            returnCourses.push(tempCourse);
          }
        }
        return returnCourses;
      }
    }
  }
})();

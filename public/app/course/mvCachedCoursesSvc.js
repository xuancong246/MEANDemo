(function() {
  angular.module('app').factory('mvCachedCoursesSvc', MvCachedCoursesSvc);
  MvCachedCoursesSvc.$inject = ['mvCourse', '$q'];

  function MvCachedCoursesSvc(mvCourse, $q) {
    var courses,
      initialDataStatus = 'none'; // 'none', 'running', 'done'
    var service = {
      initialData: initialData,
      query: query,
      getCoursesFromCache: getCoursesFromCache,
      getInitialDataStatus: getInitialDataStatus,
      getByIdFromCache: getByIdFromCache,
      get: get
    };
    return service;

    function initialData() {
      initialDataStatus = 'running';
      var temp = query();
      temp.$promise.then(function(data) {
        courses = data;
        initialDataStatus = 'done';
      }, function(reason) {
        console.log(reason);
        courses = undefined;
        initialDataStatus = 'done';
      });
    }

    function query() {
      return mvCourse.query();
    }

    function getCoursesFromCache() {
      return courses;
    }

    function getInitialDataStatus() {
      return initialDataStatus;
    }

    function getByIdFromCache(id) {
      if (courses !== undefined) {
        courses.forEach(function(course) {
          if (course._id === id) {
            return course;
          }
        });
      }
      return undefined;
    }

    function get(id) {
      return mvCourse.get({id: id});
    }
  }
})();

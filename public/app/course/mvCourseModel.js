(function() {
  angular.module('app').factory('mvCourse', MvCourse);
  MvCourse.$inject = ['$resource'];

  function MvCourse($resource) {
    var CourseResource = $resource('/api/courses/:id', {_id: '@id'}, {
      update: {method: 'PUT', isArray: false}
    });

    return CourseResource;
  }
})();

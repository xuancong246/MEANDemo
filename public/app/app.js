angular.module('app', ['ngResource', 'ngRoute', 'ngSanitize', 'ngCsv', 'ngGrid']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider.
      when('/', {templateUrl: '/partials/main/main', controller: 'mvMainCtrl', controllerAs: 'vm'}).
      when('/signin', {templateUrl: '/partials/account/signin', controller: 'mvSigninCtrl', controllerAs: 'vm'}).
      when('/signup', {templateUrl: '/partials/account/signup', controller: 'mvSignupCtrl', controllerAs: 'vm'}).
      when('/profile', {templateUrl: '/partials/account/profile', controller: 'mvProfileCtrl', controllerAs: 'vm'}).
      when('/admin/users', {templateUrl: '/partials/admin/user-list', controller: 'mvUserListCtrl', controllerAs: 'vm'}).
      when('/courses', {templateUrl: '/partials/course/course-list', controller: 'mvCourseListCtrl', controllerAs: 'vm'}).
      when('/courses/:id', {templateUrl: '/partials/course/course-detail', controller: 'mvCourseDetailCtrl', controllerAs: 'vm'}).
      when('/courses-ng-grid', {templateUrl: '/partials/course/using-ng-grid/course-list', controller: 'mvCourseListNgGridCtrl', controllerAs: 'vm'});
});

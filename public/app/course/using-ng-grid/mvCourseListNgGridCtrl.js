(function() {
  angular.module('app').controller('mvCourseListNgGridCtrl', MvCourseListNgGridCtrl);
  MvCourseListNgGridCtrl.$inject = ['$scope', '$http', 'mvCachedCoursesSvc'];

  function MvCourseListNgGridCtrl($scope, $http, mvCachedCoursesSvc) {
    var vm = this;
    vm.model = {};
    vm.model.courses = [];

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

    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize: 5,
        currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize){
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('./app/course/using-ng-grid/largeLoad.json').success(function (largeLoad) {
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });
            } else {
              $scope.setPagingData(vm.model.courses, page, pageSize);
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && (newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize)) {
          if (newVal.pageSize !== oldVal.pageSize) {
            var newMaxPage = Math.ceil($scope.totalServerItems / newVal.pageSize);
            if ($scope.pagingOptions.currentPage > newMaxPage) {
              $scope.pagingOptions.currentPage = newMaxPage;
            }
          }
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'myData',
        columnDefs: [{
          field: 'title', displayName: 'Title'}, {
          field: 'published', displayName: 'Published Date', cellFilter: 'standardDate'}, {
          field: 'featured', displayName: 'Featured', cellFilter: 'stickCross'
        }],
        enablePaging: true,
        showFooter: true,
        totalServerItems:'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
  }
})();

(function() {
  angular.module('app').controller('mvNavBarLoginCtrl', MvNavBarLoginCtrl);
  MvNavBarLoginCtrl.$inject = ['$scope', 'mvIdentity', 'mvAuthSvc', 'mvNotifier', '$location'];

  function MvNavBarLoginCtrl($scope, mvIdentity, mvAuthSvc, mvNotifier, $location) {
    var vm = this;
    vm.identity = mvIdentity;
    vm.model = {};

    vm.signOut = signOut;

    function signOut() {
      mvAuthSvc.logoutUser().then(function() {
        mvNotifier.showSuccess('You have successfully signed out!');
        vm.model.username = '';
        vm.model.password = '';
        $location.path('/');
      });
    }
  }
})();

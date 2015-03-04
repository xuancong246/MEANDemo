(function() {
  angular.module('app').controller('mvNavBarLoginCtrl', MvNavBarLoginCtrl);
  MvNavBarLoginCtrl.$inject = ['$scope', 'mvIdentity', 'mvAuthSvc', 'mvNotifier', '$location'];

  function MvNavBarLoginCtrl($scope, mvIdentity, mvAuthSvc, mvNotifier, $location) {
    var vm = this;
    vm.identity = mvIdentity;
    vm.model = {};

    vm.signIn = signIn;
    vm.signOut = signOut;

    function signIn() {
      mvAuthSvc.authenticateUser(vm.model.username, vm.model.password).then(function(success) {
        if (success) {
          mvNotifier.showSuccess('Login successfully!');
        } else {
          mvNotifier.showWarning('Login failed!');
        }
      }, function(reason) {
        alert('Failed');
      });
    }

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

(function() {
  angular.module('app').controller('mvSigninCtrl', MvSigninCtrl);
  MvSigninCtrl.$inject = ['mvAuthSvc', 'mvNotifier', '$location'];

  function MvSigninCtrl(mvAuthSvc, mvNotifier, $location) {
    var vm = this;
    vm.model = {};

    vm.signIn = signIn;

    function signIn() {
      mvAuthSvc.authenticateUser(vm.model.username, vm.model.password).then(function(success) {
        if (success) {
          mvNotifier.showSuccess('Login successfully!');
          $location.path('/');
        } else {
          mvNotifier.showWarning('Login failed!');
        }
      }, function(reason) {
        alert('Failed');
      });
    }
  }
})();

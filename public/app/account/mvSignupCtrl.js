(function() {
  angular.module('app').controller('mvSignupCtrl', MvSignupCtrl);
  MvSignupCtrl.$inject = ['mvAuthSvc', 'mvNotifier', '$location'];

  function MvSignupCtrl(mvAuthSvc, mvNotifier, $location) {
    var vm = this;
    vm.model = {};

    vm.signUp = signUp;

    function signUp() {
      var newUserData = {
        username: vm.model.username,
        password: vm.model.password,
        firstName: vm.model.firstName,
        lastName: vm.model.lastName
      };

      mvAuthSvc.createUser(newUserData).then(function() {
        mvNotifier.showSuccess('User account created!');
        $location.path('/');
      }, function(response) {
        mvNotifier.showError(response.data.toString());
      });
    }
  }
})();

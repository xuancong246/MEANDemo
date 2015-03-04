(function() {
  angular.module('app').controller('mvProfileCtrl', MvProfileCtrl);
  MvProfileCtrl.$inject = ['mvIdentity', 'mvNotifier', 'mvAuthSvc'];

  function MvProfileCtrl(mvIdentity, mvNotifier, mvAuthSvc) {
    var vm = this;
    vm.model = {};

    vm.update = update;

    init();
    function init() {
      if (!mvIdentity.currentUser) return;
      vm.model.username = mvIdentity.currentUser.username;
      vm.model.firstName = mvIdentity.currentUser.firstName;
      vm.model.lastName = mvIdentity.currentUser.lastName;
    }

    function update() {
      var updateUserData = {
        username: vm.model.username,
        firstName: vm.model.firstName,
        lastName: vm.model.lastName
      };
      if (vm.model.password) {
        updateUserData.password = vm.model.password;
      }

      mvAuthSvc.updateUser(updateUserData).then(function() {
        mvNotifier.showSuccess('Your user account has been updated');
      }, function(reason) {
        mvNotifier.showError(reason);
      });
    }
  }
})();

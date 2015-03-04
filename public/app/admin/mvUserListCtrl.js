(function() {
  angular.module('app').controller('mvUserListCtrl', MvUserListCtrl);
  MvUserListCtrl.$inject = ['mvUser', 'mvIdentity'];

  function MvUserListCtrl(mvUser, mvIdentity) {
    var vm = this;
    vm.model = {
      users: []
    };

    init();
    function init() {
      if (mvIdentity.isAuthenticated()) {
        mvUser.query().$promise.then(function(data) {
          vm.model.users = data;
        }, function(reason) {
          console.log(reason);
        });
      }
    }
  }
})();

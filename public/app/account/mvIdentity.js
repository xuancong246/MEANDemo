(function() {
  angular.module('app').factory('mvIdentity', MvIdentity);
  MvIdentity.$inject = ['$window', 'mvUser'];

  function MvIdentity($window, mvUser) {
    var currentUser;

    init();
    function init() {
      if (!!$window.bootstrappedUserObject) {
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
      }
    }

    var factory = {
      currentUser: currentUser,
      isAuthenticated: isAuthenticated
    };
    return factory;

    function isAuthenticated() {
      return !!this.currentUser;
    }
  }
})();

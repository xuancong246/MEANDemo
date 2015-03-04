(function() {
  angular.module('app').factory('mvAuthSvc', MvAuthSvc);
  MvAuthSvc.$inject = ['$q', '$http', 'mvUser', 'mvIdentity'];

  function MvAuthSvc($q, $http, mvUser, mvIdentity) {
    var service = {
      authenticateUser: authenticateUser,
      createUser: createUser,
      logoutUser: logoutUser,
      updateUser: updateUser
    };
    return service;

    function authenticateUser(username, password) {
      var defer = $q.defer();
      $http.post('/login', {username: username, password: password}).success(function(data, status, headers, config) {
        if (data && data.success && data.user) {
          var user = new mvUser();
          angular.extend(user, data.user);
          mvIdentity.currentUser = user;
          defer.resolve(true);
        } else {
          defer.resolve(false);
        }
      }).error(function(data, status, headers, config) {
        console.log('on error');
      });
      return defer.promise;
    }

    function createUser(newUserData) {
      var newUser = new mvUser(newUserData);
      var defer = $q.defer();

      newUser.$save().then(function() {
        mvIdentity.currentUser = newUser;
        defer.resolve();
      }, function(res) {
        defer.reject(res);
      });
      return defer.promise;
    }

    function logoutUser() {
      var defer = $q.defer();
      $http.post('/logout', {}).then(function() {
        mvIdentity.currentUser = undefined;
        defer.resolve();
      });
      return defer.promise;
    }

    function updateUser(userData) {
      var defer = $q.defer();
      var updateUserData = angular.copy(mvIdentity.currentUser);
      angular.extend(updateUserData, userData);

      updateUserData.$update().then(function() {
        mvIdentity.currentUser = updateUserData;
        defer.resolve();
      }, function(reason) {
        defer.resolve(reason);
      });
      return defer.promise;
    }
  }
})();

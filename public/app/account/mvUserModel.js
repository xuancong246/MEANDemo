(function() {
  angular.module('app').factory('mvUser', MvUser);
  MvUser.$inject = ['$resource'];

  function MvUser($resource) {
    // $resource default actions: $get, $save, $query, $remove, $delete
    var UserResource = $resource('/api/users/:id', {_id: '@id'}, {
      update: {method: 'PUT', isArray: false}
    });

    UserResource.prototype.isAdmin = function() {
      return this.roles && this.roles.indexOf('admin') > -1;
    }

    return UserResource;
  }
})();

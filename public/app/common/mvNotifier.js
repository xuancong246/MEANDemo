(function() {
  angular.module('app').value('mvToastr', toastr);

  angular.module('app').factory('mvNotifier', MvNotifier);
  // MvNotifier.$inject = ['toastr'];

  function MvNotifier(mvToastr) {
    var factory = {
      showWarning: showWarning,
      showSuccess: showSuccess,
      showError: showError
    }
    return factory;

    function showWarning(msg) {
      mvToastr.warning(msg);
    }

    function showSuccess(msg) {
      mvToastr.success(msg);
    }

    function showError(msg) {
      mvToastr.error(msg);
    }
  }
})();

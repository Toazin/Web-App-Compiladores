(function() {
  'use strict';

  angular
    .module('webAppCompiladores')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

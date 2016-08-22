(function () {
  'use strict';

  angular.module('<%= namespace %>')
    .filter('<%= nxModuleName %>', ['$timeout',function ($timeout) {
      return function(inValue) {
          return inValue+'-filter template!!!';
      };
    }]);

})();

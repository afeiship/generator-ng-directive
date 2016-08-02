(function () {
  'use strict';

  angular.module('<%= namespace %>')
    .directive('<%= nxModuleName %>', ['$timeout',function ($timeout) {
      return {
        restrict: 'E',
        scope: {
          cssClass: '@',
          value: '='
        },
        controller: ['$scope', function ($scope) {
          $scope.plus = plus;
          $scope.minus = minus;
          $scope.value = $scope.value || 0;

          function plus() {
            $scope.value++;
          }

          function minus() {
            $scope.value--;
          }
        }],
        template: '<div class="nx-widget-<%= module_name %> {{cssClass}}">' +
        '<button class="btn plus" ng-click="plus()">+</button>' +
        '<input class="value" ng-model="value" type="tel">' +
        '<button class="btn minus" ng-click="minus()">-</button>' +
        '</div>'
      };

    }]);


})();

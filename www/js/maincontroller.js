(function() {
    'use strict';

    angular.module('starter')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', 'localStorageService', '$ionicPopover', '$rootScope'];

    function MainCtrl($scope, localStorageService, $ionicPopover, $rootScope) {
        $scope.user = {};

        var user = JSON.parse(localStorageService.get('user'));
        $scope.user = user;

        $ionicPopover.fromTemplateUrl('./templates/dialog/submit.html', {
            scope: $scope,
        }).then(function(popover) {
            $rootScope.mainPopover = popover;
        });

    }
})();

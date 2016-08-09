(function() {
    'use strict';

    angular.module('starter')
        .controller('LoginCtrl', LoginCtrl)
        .controller('sentCtrl', sentCtrl);

    sentCtrl.$inject = ['$scope', '$ionicViewSwitcher', '$state', '$ionicHistory'];
    LoginCtrl.$inject = ['$scope', '$ionicViewSwitcher', '$state', 'localStorageService', '$ionicPopup', '$timeout'];

    function LoginCtrl($scope, $ionicViewSwitcher, $state, localStorageService, $ionicPopup, $timeout) {
        $scope.data = {
            username: '',
            password: ''
        };

        $scope.$on("$ionicView.beforeEnter", function(event, data) {
            $scope.data = {
                username: '',
                password: '',
                usertype: ''
            };
        });
        
        

        $scope.login = function() {

            if ($scope.data.username == 'proc' && $scope.data.password == '123456') {
                $scope.data.usertype = 'proc';
                localStorageService.set('user', JSON.stringify($scope.data));
                $ionicViewSwitcher.nextDirection('forward');
                $timeout(function() {
                    $state.go('tab.admindash');
                }, 300);

            } else if ($scope.data.username == 'con' && $scope.data.password == '123456') {
                $scope.data.usertype = 'con';
                localStorageService.set('user', JSON.stringify($scope.data));
                $ionicViewSwitcher.nextDirection('forward');
                $timeout(function() {
                    $state.go('tab.dash');
                }, 300);

            } else {
                $ionicPopup.alert({
                    title: 'Invalid Account',
                    template: 'Username and Password not match!!!'
                });
            }
        }



    };

    function sentCtrl($scope, $ionicViewSwitcher, $state, $ionicHistory) {
        $scope.sent = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });

            $ionicViewSwitcher.nextDirection('forward');
            $state.go('login');
        }
    }
})();

(function() {
    'use strict';

    angular.module('starter')
        .controller('VendorQualificationCtrl', VendorQualificationCtrl);

    VendorQualificationCtrl.$inject = ['$scope', '$ionicModal', '$ionicPopup', '$timeout', '$state', '$ionicHistory', '$ionicViewSwitcher', 'localStorageService', '$filter'];

    function VendorQualificationCtrl($scope, $ionicModal, $ionicPopup, $timeout, $state, $ionicHistory, $ionicViewSwitcher, localStorageServic, $filter) {
        $scope.data = {};
        $scope.others = {};

        $scope.groups = [];
        $scope.othersList = [];
        $scope.filenames = [];

        for (var i = 0; i < 1; i++) {
            $scope.groups[i] = {
                name: i,
                items: []
            };
            for (var j = 0; j < 1; j++) {
                $scope.groups[i].items.push(i + '-' + j);
            }
        }

        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };

        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };

        $scope.removeOther = function(index) {
            $scope.othersList.splice(index, 1);
        };

        $scope.addOthers = function(task) {
            if (!_.isEmpty(task)) {
                $scope.othersList.push(task);
                $scope.others = {};
            }
        };

        $scope.uploadFiles = function(element) {
            var files = element.files;
            var filenames = [];

            for (i = 0; i < files.length; i++) {
                filenames.push(files[i].name);
            }

            $scope.files = files;
            $timeout(function(){
                $scope.$apply(function(){
                    $scope.filenames = filenames;
                });
            },10);
            console.log(files, filenames);
        };

        $scope.removetest = function(elemet){
            $scope.filenames.splice(element,1);
        };

        $scope.showCancel = function() {
            $ionicPopup.confirm({
                title: '',
                template: 'Are you sure you want to cancel application?'

            }).then(function(res) {
                if (res) {
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $ionicViewSwitcher.nextDirection('back');
                    $state.go('login');

                } else {
                    console.log('You are not sure');
                }
            });
        };

        $scope.showConfirm = function() {
            $ionicPopup.confirm({
                title: '',
                template: 'Are you sure you want to submit application?'

            }).then(function(res) {
                if (res) {
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $ionicViewSwitcher.nextDirection('forward');
                    $state.go('sent');

                } else {
                    console.log('You are not sure');
                }
            });
        };
    }
})();

(function() {
    'use strict';

    angular.module('starter')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', 'localStorageService', '$ionicPopover', '$rootScope', '$ionicModal'];

    function MainCtrl($scope, localStorageService, $ionicPopover, $rootScope, $ionicModal) {
        $scope.user = {};
        $scope.isa = false;
        $scope.duha = false;
        $scope.tulo = false;
        $scope.opat = false;
        $scope.date = new Date();

        var user = JSON.parse(localStorageService.get('user'));
        $scope.user = user;

        $scope.groups = [];
        for (var i = 0; i < 1; i++) {
            $scope.groups[i] = {
                name: i,
                items: []
            };
            for (var j = 0; j < 1; j++) {
                $scope.groups[i].items.push(i + '-' + j);
            }
        }

        if (localStorage.getItem("mytodos") == null) {
            $scope.todoList = [{ todoText: 'Create app', done: false }];
            localStorage.setItem("mytodos", angular.toJson($scope.todoList));

        } else {

            $scope.todoList = angular.fromJson(localStorage.getItem("mytodos"));
        }

        $scope.toggleGroup = function(group) {
            group.show = !group.show;
        };
        $scope.isGroupShown = function(group) {
            return group.show;
        };
        // $scope.toggleGroup2 = function(group) {
        //     group.show = !group2.show;
        // };
        // $scope.isGroup2Shown = function(group) {
        //     return group2.show;
        // };
        $ionicPopover.fromTemplateUrl('./templates/dialog/editpro.html', {
            rootScope: $rootScope,
        }).then(function(popover) {
            $rootScope.popover1 = popover;
        });
        // $scope.showPopoveredit = function($event) {
        //     $scope.popover1.show($event);
        // };



        $ionicPopover.fromTemplateUrl('./templates/dialog/submit.html', {
            scope: $scope,
        }).then(function(popover) {
            $rootScope.mainPopover = popover;
        });
        // $ionicPopover.fromTemplateUrl('./templates/dialog/popadmin.html', {
        //     scope: $scope,
        // }).then(function(popover) {
        //     $rootScope.mainPopover2 = popover;
        // });

        $rootScope.$on('closeModal', function() {
            console.log('closetaskmodal');
            $scope.progressModal.hide();
        });
        $ionicModal.fromTemplateUrl('./templates/dialog/progress.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.progressModal = modal;
        });
        $scope.opendetailsModal = function() {
            console.log('opendetailsModal');
            $scope.progressModal.show();
        };

        $scope.closeModal = function() {
            $scope.progressModal.hide();
        };


        $rootScope.$on('closetaskinprogressModal', function() {
            console.log('closetaskmodal');
            $scope.taskinprogressModal.hide();
        });
        $ionicModal.fromTemplateUrl('./templates/dialog/taskinprogress.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.taskinprogressModal = modal;
        });
        $scope.opentaskinprogressModal = function() {

            $scope.taskinprogressModal.show();
        };

        $scope.closetaskinprogressModal = function() {
            $scope.taskinprogressModal.hide();
        };

        $rootScope.$on('closependingModal', function() {

            $scope.pendingModal.hide();
        });
        $ionicModal.fromTemplateUrl('./templates/dialog/pending.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.pendingModal = modal;
        });
        $scope.openpendingModal = function() {
            console.log('openpendingModal');
            $scope.pendingModal.show();
        };

        $scope.closependingModal = function() {
            $scope.pendingModal.hide();
        };

        $ionicModal.fromTemplateUrl('./templates/dialog/newtask.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.newtaskModal = modal;
        });

        $rootScope.$on('closetaskmodal', function() {
            console.log('closetaskmodal');
            $scope.newtaskModal.hide();
        });

        $scope.opennewtaskModal = function() {
            console.log('opendetailsModal');
            $scope.newtaskModal.show();
        };

        $scope.closenewtaskModal = function() {
            $scope.newtaskModal.hide();
        };

        $ionicModal.fromTemplateUrl('./templates/dialog/completed.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.completedModal = modal;
        });

        $rootScope.$on('closecompletedModal', function() {

            $scope.completedModal.hide();
        });

        $scope.opencompletedModal = function() {
            console.log('opendetailsModal');
            $scope.completedModal.show();
        };

        $scope.closecompletedModal = function() {
            $scope.completedModal.hide();
        };

        $rootScope.$on('closerecentreportModal', function() {
            console.log('closetaskmodal');
            $scope.recentreportModal.hide();
        });
        $ionicModal.fromTemplateUrl('./templates/dialog/recentlysentreport.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.recentreportModal = modal;
        });
        $scope.openrecentreportModal = function() {
            console.log('opendetailsModal');
            $scope.recentreportModal.show();
        };

        $scope.closerecentreportModal = function() {
            $scope.recentreportModal.hide();
        };

        $rootScope.$on('closemyreportModal', function() {
            $scope.myreportModal.hide();
        });
        $ionicModal.fromTemplateUrl('./templates/dialog/myreports.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.myreportModal = modal;
        });
        $scope.openmyreportModal = function() {
            console.log('opendetailsModal');
            $scope.myreportModal.show();
        };

        $scope.closemyreportModal = function() {
            $scope.myreportModal.hide();
        };

        // $scope.clickToCheckout = function() {
        //     console.log('clickToCancel')
        //     ngDialog.openConfirm({
        //         templateUrl: './templates/dialog/checkout.html',
        //         className: 'ngdialog-theme-default',
        //         scope: $scope
        //     }).then(function() {
        //         $ionicViewSwitcher.nextDirection('forward');
        //         $timeout(function() {
        //             $state.go('reporting');
        //             // $scope.popover.remove();
        //         }, 100);
        //         console.log('YES')
        //     }, function() {
        //         console.log('NO')
        //     });
        // };
    }
})();

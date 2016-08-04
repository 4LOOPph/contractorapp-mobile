(function() {
    'use strict';

    angular.module('starter')
        .controller('ChatsCtrl', ['$scope', 'Chats', '$ionicPopover', '$state', '$timeout', '$ionicViewSwitcher', 'ngDialog', '$ionicModal',

            function($scope, Chats, $ionicPopover, $state, $timeout, $ionicViewSwitcher, ngDialog, $ionicModal) {
                $scope.$on('$ionicView.enter', function(e) {
                    $scope.progressData = [];
                    $scope.pendingData = [];
                    $scope.completedData = [];
                    $scope.contacts = [
                        { name: '' },
                    ];
                    $scope.chats = Chats.all();

                    // $scope.ratingsObject = {
                    //     iconOn: 'ion-ios-star', //Optional
                    //     iconOff: 'ion-ios-star-outline', //Optional
                    //     iconOnColor: 'rgb(200, 200, 100)', //Optional
                    //     iconOffColor: 'rgb(200, 100, 100)', //Optional
                    //     rating: 4, //Optional
                    //     minRating: 0, //Optional
                    //     readOnly: false //Optional
                    // };

                    // console.log('$scope.ratingsObject: ', $scope.ratingsObject)

                    $ionicPopover.fromTemplateUrl('./templates/dialog/editpro.html', {
                        scope: $scope,
                    }).then(function(popover) {
                        $scope.popover1 = popover;
                    });

                    $scope.showPopoveredit = function($event) {
                        $scope.popover1.show($event);
                    };

                    $ionicPopover.fromTemplateUrl('./templates/dialog/popadmin.html', {
                        scope: $scope,
                    }).then(function(popover) {
                        $scope.popover2 = popover;
                    });

                    $scope.showPopoveradmin = function($event) {
                        $scope.popover2.show($event);
                    };



                    $scope.signOut = function($event) {
                        $scope.popover.hide();

                        $ionicViewSwitcher.nextDirection('back');
                        $timeout(function() {
                            $state.go('login');
                        }, 100);
                    };
                    $scope.pendingDetails = function($event) {
                        $scope.popover.hide();

                        $ionicViewSwitcher.nextDirection('forward');
                        $timeout(function() {
                            $state.go('pendingtask');
                        }, 100);
                    };
                    $scope.newTask = function($event) {
                        $scope.popover.hide();

                        $ionicViewSwitcher.nextDirection('forward');
                        $timeout(function() {
                            $state.go('newdetails');
                        }, 100);
                    };
                    $scope.clickDecline = function($event) {
                        $scope.popover.hide();

                        $ionicViewSwitcher.nextDirection('back');
                        $timeout(function() {
                            $state.go('tab.tasks');
                        }, 100);
                    };
                    $scope.proFile = function($event) {
                        $scope.popover.hide();

                        $ionicViewSwitcher.nextDirection('forward');
                        $timeout(function() {
                            $state.go('userprofile');
                        }, 100);
                    };
                    $scope.adminproFile = function($event) {
                        $scope.popover.hide();

                        $ionicViewSwitcher.nextDirection('forward');
                        $timeout(function() {
                            $state.go('adminprofile');
                        }, 100);
                    };
                    $scope.supportreport = function($event) {
                        $scope.popover.hide();
                        $ionicViewSwitcher.nextDirection('forward');
                        $timeout(function() {
                            $state.go('reporting');
                            $scope.popover.remove();
                        }, 100);
                    };
                    $scope.editpro = function($event) {
                        $scope.popover.hide();
                        $ionicViewSwitcher.nextDirection('forward');
                        $timeout(function() {
                            $state.go('editpro');
                            $scope.popover.remove();
                        }, 100);
                    };
                    $scope.editavailability = function($event) {
                        $scope.popover.hide();
                        $ionicViewSwitcher.nextDirection('forward');
                        $timeout(function() {
                            $state.go('editavailability');
                            $scope.popover.remove();
                        }, 100);
                    };
                    $scope.editrate = function($event) {
                        $scope.popover.hide();
                        $ionicViewSwitcher.nextDirection('forward');
                        $timeout(function() {
                            $state.go('editrate');
                            $scope.popover.remove();
                        }, 100);
                    };
                    $scope.sitesurvey = function($event) {
                        $scope.popover.hide();

                        $ionicViewSwitcher.nextDirection('forward');
                        $timeout(function() {
                            $state.go('sitesurvey');
                        }, 100);
                    };
                    $scope.clickToCheckout2 = function() {
                        console.log('clickToCancel')
                        ngDialog.openConfirm({
                            templateUrl: './templates/dialog/checkout2.html',
                            className: 'ngdialog-theme-default',
                            scope: $scope
                        }).then(function() {
                            $ionicViewSwitcher.nextDirection('forward');
                            $timeout(function() {
                                $state.go('installationreport');
                            }, 100);
                            console.log('YES')
                        }, function() {
                            console.log('NO')
                        });
                    };
                    $scope.clickToCheckout3 = function() {
                        console.log('clickToCancel')
                        ngDialog.openConfirm({
                            templateUrl: './templates/dialog/checkout3.html',
                            className: 'ngdialog-theme-default',
                            scope: $scope
                        }).then(function() {
                            $ionicViewSwitcher.nextDirection('forward');
                            $timeout(function() {
                                $state.go('sitesurvey');
                            }, 100);
                            console.log('YES')
                        }, function() {
                            console.log('NO')
                        });
                    };
                    $scope.clickToCheckout = function() {
                        console.log('clickToCancel')
                        ngDialog.openConfirm({
                            templateUrl: './templates/dialog/checkout.html',
                            className: 'ngdialog-theme-default',
                            scope: $scope
                        }).then(function() {
                            $ionicViewSwitcher.nextDirection('forward');
                            $timeout(function() {
                                $state.go('reporting');
                                $scope.popover.remove();
                            }, 100);
                            console.log('YES')
                        }, function() {
                            console.log('NO')
                        });
                    };

                    $scope.clickToCheckin = function() {
                        console.log('clickToCheckin')
                        ngDialog.openConfirm({
                            templateUrl: './templates/dialog/checkin.html',
                            className: 'ngdialog-theme-default',
                            scope: $scope
                        }).then(function() {
                            console.log('YES')
                        }, function() {
                            console.log('NO')
                        });
                    };
                    $scope.clickToCurrentin = function() {
                        console.log('clickToCurrentin')
                        ngDialog.openConfirm({
                            templateUrl: './templates/dialog/currentin.html',
                            className: 'ngdialog-theme-default',
                            scope: $scope
                        }).then(function() {
                            console.log('YES')
                        }, function() {
                            console.log('NO')
                        });
                    };

                    $ionicModal.fromTemplateUrl('./templates/dialog/addmaterial.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function(modal) {
                        $scope.modal = modal;
                    });
                    $scope.openModal = function() {
                        $scope.modal.show();
                    };
                    $scope.closeModal = function() {
                        $scope.modal.hide();
                    };
                    $scope.createContact = function(u) {
                        $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
                        $scope.modal.hide();
                    };

                    _.each($scope.chats, function(row) {
                        if (row.status == 'progress') {
                            $scope.progressData.push(row);
                        } else if (row.status == 'pending') {
                            $scope.pendingData.push(row);
                        } else if (row.status == 'completed') {
                            $scope.completedData.push(row);
                        }
                    });

                    console.log('$scope.progressData: ', $scope.progressData);
                    console.log('$scope.pendingData: ', $scope.pendingData);
                    console.log('$scope.completedData: ', $scope.completedData);
                });
            }
        ]);

})();

(function() {
    'use strict';

    angular.module('starter')
        .controller('DashCtrl', ['$scope', '$ionicPopover', '$state', '$timeout', '$ionicViewSwitcher', 'ngDialog', 'ionicDatePicker', 'ionicTimePicker', '$ionicModal',

            function($scope, $ionicPopover, $state, $timeout, $ionicViewSwitcher, ngDialog, ionicDatePicker, ionicTimePicker, $ionicModal) {

                /*dropdown.show(targetEl, { placement: 'left' });
                dropdown.hide();
                dropdown.show(); //show on same element as before
                dropdown.remove(); //destroys & cleans up dropdown

                $scope.dropdown = dropdown;

                var dropdown = $ionicDropdown.create({
                    templateUrl: '../mobile/templates/dialog/cancel.html',
                    className: 'ngdialog-theme-default',

                });*/


                $scope.filter = {
                    direct: false,
                    check: true,
                    check1: false
                };

                $scope.showModerate = function() {
                    $scope.filter = {
                        direct: true,
                        check: false,
                        check1: false
                    };
                };

                $scope.showHigh = function() {
                    $scope.filter = {
                        direct: false,
                        check: true,
                        check1: false
                    };
                };

                $scope.showLow = function() {
                    $scope.filter = {
                        direct: false,
                        check: false,
                        check1: true
                    };
                };

                $ionicModal.fromTemplateUrl('./templates/dialog/contractorlist.html', {
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

                var ipObj1 = {
                    callback: function(val) { //Mandatory
                        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                    },
                    disabledDates: [ //Optional
                        new Date(2016, 2, 16),
                        new Date(2015, 3, 16),
                        new Date(2015, 4, 16),
                        new Date(2015, 5, 16),
                        new Date('Wednesday, August 12, 2015'),
                        new Date("08-16-2016"),
                        new Date(1439676000000)
                    ],
                    from: new Date(2012, 1, 1), //Optional
                    to: new Date(2016, 10, 30), //Optional
                    inputDate: new Date(), //Optional
                    mondayFirst: true, //Optional
                    disableWeekdays: [0], //Optional
                    closeOnSelect: false, //Optional
                    templateType: 'popup' //Optional
                };

                $scope.openDatePicker = function() {
                    ionicDatePicker.openDatePicker(ipObj1);
                };

                var ipObj2 = {
                    callback: function(val) {
                        if (typeof(val) === 'undefined') {
                            console.log('Time not selected');
                        } else {
                            var selectedTime = new Date(val * 1000);
                            var hours = selectedTime.getHours();
                            var minutes = "0" + selectedTime.getMinutes();
                            var seconds = "0" + selectedTime.getSeconds();

                            $scope.rate.start = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                        }
                    },
                    inputTime: 50400,
                    format: 12,
                    step: 15,
                    setLabel: 'Set Start'
                };
                $scope.openTime = function() {
                    ionicTimePicker.openTimePicker(ipObj1);
                };

                

                $ionicPopover.fromTemplateUrl('./templates/dialog/popadmin.html', {
                    scope: $scope,
                }).then(function(popover) {
                    $scope.popover2 = popover;
                });

                $scope.showPopoveradmin = function($event) {
                    $scope.popover2.show($event);
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
                // $scope.supportreport = function($event) {
                //     $scope.popover.hide();
                //     $ionicViewSwitcher.nextDirection('forward');
                //     $timeout(function() {
                //         $state.go('reporting');
                //         $scope.popover.remove();
                //     }, 100);
                // };
                $scope.pendingDetails = function($event) {
                    $scope.popover.hide();

                    $ionicViewSwitcher.nextDirection('forward');
                    $timeout(function() {
                        $state.go('pendingtask');
                    }, 100);
                };
                // $scope.installationreport = function($event) {
                //     $scope.popover.hide();

                //     $ionicViewSwitcher.nextDirection('forward');
                //     $timeout(function() {
                //         $state.go('installationreport');
                //     }, 100);
                // };
                // $scope.sitesurvey = function($event) {
                //     $scope.popover.hide();

                //     $ionicViewSwitcher.nextDirection('forward');
                //     $timeout(function() {
                //         $state.go('sitesurvey');
                //     }, 100);
                // };
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
                

            }
        ]);

})();

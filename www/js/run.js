(function() {
    'use strict';

    angular.module('starter')
        .run(run);

    run.$inject = ['$rootScope', '$ionicPlatform', '$window','$ionicHistory', '$ionicViewSwitcher', 'localStorageService',
        '$timeout', '$state', '$ionicModal', '$ionicPopup'
    ];

    function run($rootScope, $ionicPlatform, $window, $ionicHistory, $ionicViewSwitcher, localStorageService,
        $timeout, $state, $ionicModal, $ionicPopup) {


        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $rootScope.dreport = function() {
            $ionicPopup.alert({
                title: '',
                template: 'Report has been downloaded'
            });
        }
        $rootScope.dimage = function() {
            $ionicPopup.alert({
                title: '',
                template: 'Images downloaded'
            });
        }

        $rootScope.showPopover = function($event) {
            $rootScope.mainPopover.show($event);
        };
        $rootScope.showPopoveredit = function($event) {
            $rootScope.popover1.show($event);
        };
        // $rootScope.showPopoveradmin = function($event) {
        //     $rootScope.mainPopover2.show($event);
        // };

        $rootScope.myGoBack = function() {
            console.log('myGoBack');
            $ionicViewSwitcher.nextDirection('back');
            $ionicHistory.goBack();
        };

        $rootScope.signOut = function() {
            $rootScope.mainPopover.hide();

            $ionicViewSwitcher.nextDirection('back');
            localStorageService.remove('user');
            $timeout(function() {
                $state.go('login');
            }, 100);
        };
        $rootScope.sign = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $ionicViewSwitcher.nextDirection('back');
            $timeout(function() {
                $state.go('login');
            }, 100);
        };

        $rootScope.gotToProfile = function() {
            $rootScope.mainPopover.hide();
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('userprofile');
        };

        $rootScope.gotToProf = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            // $rootScope.mainPopover.hide();
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('userprofile');
        };
        $rootScope.comptask = function() {
            // $ionicHistory.nextViewOptions({
            //     disableBack: true
            // });
            $rootScope.$broadcast('closecompletedModal');
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('comptask');
        };

        $rootScope.reportdone = function() {
            // $ionicHistory.nextViewOptions({
            //     disableBack: true
            // });
            $rootScope.$broadcast('closerecentreportModal');
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('reportdone');
        };
        $rootScope.reportdone2 = function() {
            // $ionicHistory.nextViewOptions({
            //     disableBack: true
            // });
            $rootScope.$broadcast('closerecentreportModal');
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('reportdone2');
        };
        $rootScope.myreportdone = function() {

            $rootScope.$broadcast('closemyreportModal');
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('reportdone');
        };

        $rootScope.gotoprog = function($event) {
            var user = JSON.parse(localStorageService.get('user'));
            console.log('user: ', user.usertype);
            $rootScope.$broadcast('closetaskinprogressModal');
            $ionicViewSwitcher.nextDirection('forward');
            // $state.go('progress');
            $timeout(function() {
                if (user.usertype === 'proc') {
                    console.log('proc: ');
                    $state.go('adminprogress');
                } else {
                    console.log('con: ');
                    $state.go('detailsH');
                }
            }, 100);
        };
        // $rootScope.detailsTask = function($event) {
        //     var tasklist = angular.toJson(localStorage.getItem('tasklist'));
        //     $rootScope.$broadcast('closetaskinprogressModal');
        //     $ionicViewSwitcher.nextDirection('forward');

        //     $timeout(function() {
        //         if (tasklist.Status == 'High') {
        //             $state.go('detailsH')
        //         } else if (tasklist.Status == 'Medium') {
        //             $state.go('detailsM')
        //         } else {
        //             console.log('con: ');
        //             $state.go('detailsL');
        //         }
        //     }, 100);
        // };

        $rootScope.detailsH = function($event) {
            $rootScope.$broadcast('closetaskinprogressModal');
            $rootScope.$broadcast('closetaskmodal');
            $rootScope.$broadcast('closecompletedModal');
            $rootScope.$broadcast('closependingModal');
            $ionicViewSwitcher.nextDirection('forward');
            $timeout(function() {
                $state.go('detailsH');
            }, 100);
        };
        $rootScope.detailsM = function($event) {
            $rootScope.$broadcast('closetaskinprogressModal');
            $rootScope.$broadcast('closetaskmodal');
            $rootScope.$broadcast('closecompletedModal');
            $rootScope.$broadcast('closependingModal');
            $ionicViewSwitcher.nextDirection('forward');
            $timeout(function() {
                $state.go('detailsM');
            }, 100);
        };
        $rootScope.detailsL = function($event) {
            $rootScope.$broadcast('closetaskinprogressModal');
            $rootScope.$broadcast('closetaskmodal');
            $rootScope.$broadcast('closecompletedModal');
            $rootScope.$broadcast('closependingModal');
            $ionicViewSwitcher.nextDirection('forward');
            $timeout(function() {
                $state.go('detailsL');
            }, 100);
        };

        $rootScope.newTask = function($event) {
            $rootScope.$broadcast('closetaskmodal');
            $ionicViewSwitcher.nextDirection('forward');

            $timeout(function() {
                $state.go('newdetails');
            }, 100);
        };
        $rootScope.newTaskqow = function($event) {
            $rootScope.$broadcast('closetaskmodal');
            $ionicViewSwitcher.nextDirection('forward');

            $timeout(function() {
                $state.go('qow');
            }, 100);
        };
        $rootScope.qowlist = function($event) {
            $rootScope.$broadcast('closetaskinprogressModal');
            $rootScope.$broadcast('closetaskmodal');
            $ionicViewSwitcher.nextDirection('forward');
            $timeout(function() {
                $state.go('quotelist');
            }, 100);
        };
        $rootScope.pendingDetails = function($event) {
            var user = JSON.parse(localStorageService.get('user'));
            console.log('user: ', user.usertype);
            $rootScope.$broadcast('closependingModal');
            $ionicViewSwitcher.nextDirection('forward');

            $timeout(function() {
                if (user.usertype === 'proc') {
                    console.log('proc: ');
                    $state.go('forapproval');
                } else {
                    console.log('con: ');
                    $state.go('pendingtask');
                }
            }, 100);
        };

        $rootScope.gotToadminProfile = function() {
            $rootScope.mainPopover.hide();
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('adminprofile');
        };

        $rootScope.editProfile = function() {
            $rootScope.popover1.hide();
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('editpro');
        };


        // $scope.delete = function() {
        //     $ionicPopup.confirm({
        //         title: '',
        //         template: 'Are you sure to close Task?',
        //         buttons: [
        //             { text: 'NO' }, {
        //                 text: '<b>YES</b>',
        //                 type: 'button-positive',
        //                 onTap: function(res) {
        //                     if (res) {
        //                         $scope.delete = false;
        //                     } else {}
        //                 }
        //             },
        //         ]
        //     })
        //     console.log('$scope.tasklist1:', $scope.tasklist);
        // };
        $rootScope.showCheck = function() {
            $ionicPopup.confirm({
                title: '',
                template: 'Complete Task?',
                buttons: [
                    { text: 'NO' }, {
                        text: 'YES',
                        type: 'button-positive',
                        onTap: function(res) {
                            if (res) {
                                $rootScope.$broadcast('closeModal');
                                $rootScope.$broadcast('closetaskinprogressModal');
                                $ionicViewSwitcher.nextDirection('forward');
                                $state.go('installationreport');
                            } else {}
                        }
                    },
                ]
            })
        };
        $rootScope.showCheck2 = function() {
            $ionicPopup.confirm({
                title: '',
                template: 'Complete Task?',
                buttons: [
                    { text: 'NO' }, {
                        text: 'YES',
                        type: 'button-positive',
                        onTap: function(res) {
                            if (res) {
                                $rootScope.$broadcast('closeModal');
                                $rootScope.$broadcast('closetaskinprogressModal');
                                $ionicViewSwitcher.nextDirection('forward');
                                $state.go('reporting');
                            } else {}
                        }
                    },
                ]
            })
        };
        $rootScope.showCheck3 = function() {
            $ionicPopup.confirm({
                title: '',
                template: 'Complete Task?',
                buttons: [
                    { text: 'NO' }, {
                        text: 'YES',
                        type: 'button-positive',
                        onTap: function(res) {
                            if (res) {
                                $rootScope.$broadcast('closeModal');
                                $rootScope.$broadcast('closetaskinprogressModal');
                                $ionicViewSwitcher.nextDirection('forward');
                                $state.go('sitesurvey');
                            } else {}
                        }
                    },
                ]
            })
        };


        $rootScope.clickCurrentin = function() {

            $ionicPopup.alert({
                templateUrl: '../mobile/templates/dialog/currentin.html',
                rootScope: $rootScope
            })

        };

        $rootScope.tasksend = function() {
            $ionicPopup.alert({
                title: '',
                template: 'Your task has been sent'
            }).then(function(res) {
                $ionicViewSwitcher.nextDirection('back');
                $state.go('tab.admintasks');
            });
        };


    }
})();

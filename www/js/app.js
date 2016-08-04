(function() {
    'use strict';

    angular.module('starter', [
            'ionic', 'ionic-timepicker', 'ngDialog', 'ionic-datepicker',
            'LocalStorageModule'
        ])
        .run(['$rootScope', '$ionicPlatform', '$window','$ionicHistory', '$ionicViewSwitcher', 'localStorageService', '$timeout', '$state',
            function($rootScope, $ionicPlatform, $window, $ionicHistory, $ionicViewSwitcher, localStorageService, $timeout, $state) {
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


                $rootScope.showPopover = function($event) {
                    $rootScope.mainPopover.show($event);
                };

                $rootScope.myGoBack = function() {
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

                $rootScope.gotToProfile = function(){
                    $rootScope.mainPopover.hide();
                    $ionicViewSwitcher.nextDirection('forward');
                    $state.go('userprofile');
                };

            }
        ])
        .config(['$stateProvider', '$urlRouterProvider', 'ionicTimePickerProvider', '$ionicConfigProvider', 'localStorageServiceProvider',
            function($stateProvider, $urlRouterProvider, ionicTimePickerProvider, $ionicConfigProvider, localStorageServiceProvider) {

                var timePickerObj = {
                    inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
                    format: 12,
                    step: 15,
                    setLabel: 'Set',
                    closeLabel: 'Close'
                };
                ionicTimePickerProvider.configTimePicker(timePickerObj);


                $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-left');
                $ionicConfigProvider.tabs.position('bottom');

                localStorageServiceProvider.setStorageType('sessionStorage');

                $stateProvider
                    .state('login', {
                        url: '/login',
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    })
                    .state('vendorInfo', {
                        url: '/vendorInfo',
                        templateUrl: 'templates/vendorInfo.html',
                        controller: 'AccountCtrl'
                    })
                    .state('vendorcontactInfo', {
                        url: '/vendorcontactinfo',
                        templateUrl: 'templates/vendorcontactinfo.html'
                    })
                    .state('vendorRate', {
                        url: '/vendorrate',
                        templateUrl: 'templates/vendorRate.html',
                        controller: 'AccountCtrl'
                    })
                    .state('sent', {
                        url: '/sent',
                        templateUrl: 'templates/sent.html',
                        controller: 'sentCtrl'
                    })
                    .state('qualification', {
                        url: '/qualification',
                        templateUrl: 'templates/qualification.html',
                        controller: 'AccountCtrl'
                    })
                    .state('certification', {
                        url: '/certification',
                        templateUrl: 'templates/certification.html'
                    })
                    .state('certifications', {
                        url: '/certifications',
                        templateUrl: 'templates/certifications.html'
                    })
                    .state('tab', {
                        url: '/tab',
                        abstract: true,
                        templateUrl: 'templates/tabs.html',
                        controller: 'MainCtrl'
                    })
                    .state('tab.dash', {
                        url: '/dash',
                        views: {
                            'tab-dash': {
                                templateUrl: 'templates/tab-dash.html',
                                controller: 'DashCtrl'
                            }
                        }
                    })
                    .state('tab.tasks', {
                        url: '/tasks',
                        views: {
                            'tab-tasks': {
                                templateUrl: 'templates/tab-tasks.html',
                                controller: 'ChatsCtrl'
                            }
                        }
                    })
                    .state('newdetails', {
                        url: '/newdetails',
                        templateUrl: 'templates/newdetails.html',
                        controller: 'ChatsCtrl'
                    })
                    .state('progress', {
                        url: '/progress',
                        templateUrl: 'templates/progress.html',
                        controller: 'ChatsCtrl'
                    })
                    .state('pendingtask', {
                        url: '/pendingtask',
                        templateUrl: 'templates/pendingtask.html',
                        controller: 'ChatsCtrl'
                    })
                    .state('qow', {
                        url: '/qow',
                        templateUrl: 'templates/qow.html',
                        controller: 'ChatsCtrl'
                    })
                    .state('userprofile', {
                        url: '/userprofile',
                        templateUrl: 'templates/profile.html',
                        controller: 'ChatsCtrl'
                    })
                    .state('adminprofile', {
                        url: '/adminprofile',
                        templateUrl: 'templates/adminprofile.html',
                        controller: 'ChatsCtrl'
                    })
                    .state('editpro', {
                        url: '/editpro',
                        templateUrl: 'templates/editvendorinfo.html',
                        controller: 'ChatsCtrl'
                    })
                    .state('editavailability', {
                        url: '/editavailability',
                        templateUrl: 'templates/editavailability.html',
                        controller: 'ChatsCtrl'
                    })
                    .state('editrate', {
                        url: '/editrate',
                        templateUrl: 'templates/editrate.html',
                        controller: 'ChatsCtrl'
                    })
                    .state('reporting', {
                        url: '/supportreport',
                        templateUrl: 'templates/supportreport.html',
                        controller: 'ChatsCtrl'
                    })
                    .state('installationreport', {
                        url: '/installationreport',
                        templateUrl: 'templates/installationreport.html',
                        controller: 'ChatsCtrl'
                    })
                    .state('sitesurvey', {
                        url: '/sitesurvey',
                        templateUrl: 'templates/sitesurvey.html',
                        controller: 'ChatsCtrl'
                    })
                    .state('tab.task-detail', {
                        url: '/tasks/:chatId',
                        views: {
                            'tab-tasks': {
                                templateUrl: 'templates/task-detail.html',
                                controller: 'ChatDetailCtrl'
                            }
                        }
                    })
                    .state('tab.account', {
                        url: '/account',
                        views: {
                            'tab-account': {
                                templateUrl: 'templates/tab-account.html',
                                controller: 'DashCtrl'
                            }
                        }
                    })
                    .state('tab.admindash', {
                        url: '/admindash',
                        views: {
                            'tab-admindash': {
                                templateUrl: 'templates/tab-admindash.html',
                                controller: 'DashCtrl'
                            }
                        }
                    })
                    .state('tab.admintasks', {
                        url: '/admintasks',
                        views: {
                            'tab-admintasks': {
                                templateUrl: 'templates/tab-admintask.html',
                                controller: 'DashCtrl'
                            }
                        }
                    })
                    .state('tab.adminreport', {
                        url: '/adminreport',
                        views: {
                            'tab-adminreport': {
                                templateUrl: 'templates/tab-adminreport.html',
                                controller: 'DashCtrl'
                            }
                        }
                    })
                    .state('tab.createtask', {
                        url: '/createtask',
                        views: {
                            'tab-create-task': {
                                templateUrl: 'templates/tab-createtask.html',
                                controller: 'DashCtrl'
                            }
                        }
                    });

                // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise('/login');

            }
        ]);

})();

(function() {
    'use strict';

    angular.module('starter', [
            'ionic',
            'ionic-timepicker',
            'ionic-datepicker',
            'LocalStorageModule',
            'angularMoment',
            'ngMessages',
            'ionic-toast',
            'ion-autocomplete'
        ])
        .config(['$stateProvider', '$urlRouterProvider', 'ionicTimePickerProvider', '$ionicConfigProvider', 'localStorageServiceProvider',
            function($stateProvider, $urlRouterProvider, ionicTimePickerProvider, $ionicConfigProvider, localStorageServiceProvider) {

                var timePickerObj = {
                    inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
                    format: 12,
                    step: 1,
                    setLabel: 'Set',
                    closeLabel: 'Close'
                };
                ionicTimePickerProvider.configTimePicker(timePickerObj);

                $ionicConfigProvider.backButton.text('');
                $ionicConfigProvider.backButton.icon('ion-ios-arrow-left');
                $ionicConfigProvider.backButton.previousTitleText('');

                $ionicConfigProvider.scrolling.jsScrolling(true);
                $ionicConfigProvider.tabs.position('bottom');


                localStorageServiceProvider.setStorageType('sessionStorage');

                $stateProvider
                    .state('login', {
                        url: '/login',
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    })
                    .state('vendorInfo', {
                        url: '/vendorinfo',
                        templateUrl: './templates/application/vendorInfo.html',
                        controller: 'VendorInfoCtrl'
                    })
                    .state('vendorRate', {
                        url: '/vendorrate',
                        templateUrl: './templates/application/vendorRate.html',
                        controller: 'VendorRateCtrl'
                    })
                    .state('qualification', {
                        url: '/qualification',
                        templateUrl: './templates/application/qualification.html',
                        controller: 'VendorQualificationCtrl'
                        // controller: 'AccountCtrl'
                    })
                    .state('sent', {
                        url: '/sent',
                        templateUrl: './templates/application/sent.html',
                        controller: 'sentCtrl'
                    })                    
                    .state('certification', {
                        url: '/certification',
                        templateUrl: 'templates/certification.html'
                    })
                    .state('certifications', {
                        url: '/certifications',
                        templateUrl: 'templates/certifications.html'
                    });

                // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise('/login');

            }
        ]);

})();

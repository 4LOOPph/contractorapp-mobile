(function() {
    'use strict';

    angular.module('starter')
        .controller('VendorInfoCtrl', VendorInfoCtrl);

    VendorInfoCtrl.$inject = ['$scope', '$ionicModal', '$ionicPopup', '$timeout', 'WeekDays', 'States', 'Country', 'CityState', 'ionicTimePicker', '$state', '$ionicHistory', '$ionicViewSwitcher', 'localStorageService', '$filter'];

    function VendorInfoCtrl($scope, $ionicModal, $ionicPopup, $timeout, WeekDays, States, Country, CityState, ionicTimePicker, $state, $ionicHistory, $ionicViewSwitcher, localStorageService, $filter) {

        $scope.data = {};
        $scope.data.availabilityArr = [];
        $scope.data.coverageArr = [];

        $scope.avail = {};
        $scope.area = {};


        $scope.weekdays = WeekDays.all();
        $scope.countries = Country.all();
        $scope.cities = [];
        $scope.citiesCopy = [];

        $scope.groups = [];
        $scope.othersList = [];


        $scope.getCountryState = function(country) {
            if (country == 'AUS') {
                $scope.states = States.all();
            } else {
                $scope.states = [];
            }
        };

        $scope.getCityState = function(state) {
            console.log('getCityState: ',state);
            CityState.all(state).then(function(resp) {
                $scope.cities = resp.data;

                var index = 0;
                _.each($scope.cities, function(row) {
                    $scope.citiesCopy.push({
                        id: index,
                        name: row.place_name,
                        view: row.place_name
                    })
                    index++;
                });
            });
        };

        $scope.callbackMethod = function(value) {
            if (value) {
                var cities = $filter('filter')($scope.citiesCopy, value);
                return { items: cities };
            } else {
                return { items: [] };
            }
        };

        $scope.itemsClicked = function(callback) {
            $scope.data.check_city = callback.item.name;
        };


        $scope.addArea = function(item) {
            if (item) {
                $scope.data.coverageArr.push({
                    area: item
                });
                $scope.area.coverage = '';
            }
        };

        $scope.increaseHours = function() {
            $scope.time.hours = Number($scope.time.hours);
            if ($scope.mainObj.format == 12) {
                if ($scope.time.hours != 12) {
                    $scope.time.hours += 1;
                } else {
                    $scope.time.hours = 1;
                }
            }
            if ($scope.mainObj.format == 24) {
                $scope.time.hours = ($scope.time.hours + 1) % 24;
            }
            $scope.time.hours = ($scope.time.hours < 10) ? ('0' + $scope.time.hours) : $scope.time.hours;
        };

        $scope.openTime = function(ionicTimePickerProvider) {
            $scope.data.created = new Date();
            ionicTimePicker.openTimePicker({
                callback: function(val) {
                    var hours = Math.floor(val / 60 / 60),
                        minutes = val / 60 % 60;
                    $scope.data.created.setHours(hours, minutes);
                    var sample = $scope.data.created.getHours();
                    var ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    $scope.avail.start = hours + ':' + minutes + ' ' + ampm;
                },
                inputTime: ((($scope.data.created.getHours() * 60 * 60) + (($scope.data.created.getMinutes() * 60)))),
                format: 12
            });

        };

        $scope.openTime2 = function() {
            var dated = new Date();
            ionicTimePicker.openTimePicker({
                callback: function(val) {
                    var hours = Math.floor(val / 60 / 60),
                        minutes = val / 60 % 60;
                    dated.setHours(hours, minutes);
                    var sample = dated.getHours();
                    var ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    $scope.avail.end = hours + ':' + minutes + ' ' + ampm;
                },
                inputTime: (((dated.getHours() * 60 * 60) + ((dated.getMinutes() * 60)))),
                format: 12
            });
        };

        $scope.openTime3 = function(item) {
            var dated = new Date();
            ionicTimePicker.openTimePicker({
                callback: function(val) {
                    var hours = Math.floor(val / 60 / 60),
                        minutes = val / 60 % 60;
                    dated.setHours(hours, minutes);
                    var sample = dated.getHours();
                    var ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    item.start = hours + ':' + minutes + ' ' + ampm;

                },
                inputTime: (((dated.getHours() * 60 * 60) + ((dated.getMinutes() * 60)))),
                format: 12
            });

        };

        $scope.openTime4 = function(item) {
            var dated = new Date();
            ionicTimePicker.openTimePicker({
                callback: function(val) {
                    var hours = Math.floor(val / 60 / 60),
                        minutes = val / 60 % 60;
                    dated.setHours(hours, minutes);
                    var sample = dated.getHours();
                    var ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    item.end = hours + ':' + minutes + ' ' + ampm;
                },
                inputTime: (((dated.getHours() * 60 * 60) + ((dated.getMinutes() * 60)))),
                format: 12
            });
        };

        $scope.addSched = function(item) {
            if (item) {
                $scope.data.availabilityArr.push({
                    availability: item.availability,
                    start: item.start,
                    end: item.end
                });

                $scope.avail.availability = '';
                $scope.avail.start = '';
                $scope.avail.end = '';
            }
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

        $scope.vendorinf = function(form) {
            if (form.$valid) {

                if ($scope.avail.availability) {
                    $scope.data.availabilityArr.push({
                        availability: $scope.avail.availability,
                        start: $scope.avail.start,
                        end: $scope.avail.end
                    });

                    $scope.avail.availability = '';
                    $scope.avail.start = '';
                    $scope.avail.end = '';
                }

                if ($scope.area.coverage) {
                    $scope.data.coverageArr.push({
                        area: $scope.area.coverage
                    });
                    $scope.area.coverage = '';
                }

                localStorageService.set('vendor', JSON.stringify($scope.data));
                $state.go('vendorRate');
            }
        };

    }
})();

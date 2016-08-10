(function() {
    'use strict';

    angular.module('starter')
        .controller('VendorRateCtrl', VendorRateCtrl);

    VendorRateCtrl.$inject = ['$scope', '$ionicModal', '$ionicPopup', '$timeout', 'Banks', 'Currencies', 'Country', 'CityState','States', '$state', '$ionicHistory', '$ionicViewSwitcher', 'localStorageService', '$filter'];

    function VendorRateCtrl($scope, $ionicModal, $ionicPopup, $timeout, Banks, Currencies, Country, CityState,States, $state, $ionicHistory, $ionicViewSwitcher, localStorageService, $filter) {
        console.log('VendorRateCtrl');

        $scope.data = {};
        $scope.rate = {};

        $scope.banks = [];
        $scope.banksCopy = [];
        $scope.currencies = [];
        $scope.countries = Country.all();
        $scope.cities = [];
        $scope.citiesCopy = [];

        $ionicModal.fromTemplateUrl('./templates/dialog/termandcondition.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        Banks.all().then(function(resp) {
            $scope.banks = resp.data;

            _.each($scope.banks, function(row) {
                $scope.banksCopy.push({
                    id: row.id,
                    name: row.name,
                    view: row.name
                });
            });
        });

        Currencies.all().then(function(resp) {
            var currencies = resp.data;

            $timeout(function() {
                $scope.$apply(function() {
                    $scope.currencies = currencies;
                });
            }, 10);
        });

        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.getCountryState = function(country) {
            if (country == 'AUS') {
                $scope.states = States.all();
            } else {
                $scope.states = [];
            }
        };

        $scope.getCityState = function(state) {
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

        $scope.callbackCityMethod = function(value) {
            if (value) {
                var cities = $filter('filter')($scope.citiesCopy, value);
                return { items: cities };
            } else {
                return { items: [] };
            }
        };

        $scope.itemsCityClicked = function(callback) {
            $scope.data.city = callback.item.name;
        };

        $scope.callbackMethod = function(value) {
            if (value) {
                var banks = $filter('filter')($scope.banksCopy, value);
                return { items: banks };
            } else {
                return { items: [] };
            }
        };

        $scope.itemsClicked = function(callback) {
            $scope.data.bankname = callback.item.name;
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
    }
})();

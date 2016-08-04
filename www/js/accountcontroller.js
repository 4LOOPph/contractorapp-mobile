(function() {
    'use strict';

    angular.module('starter')
        .controller('AccountCtrl', AccountCtrl);

    AccountCtrl.$inject = ['$scope', '$ionicModal', '$ionicPopup', '$timeout', 'WeekDays', 'ionicTimePicker', 'ngDialog', '$state', '$ionicHistory', '$ionicViewSwitcher'];

    function AccountCtrl($scope, $ionicModal, $ionicPopup, $timeout, WeekDays, ionicTimePicker, ngDialog, $state, $ionicHistory, $ionicViewSwitcher) {
        $scope.data = {};

        $scope.inputs = [];

        $scope.input = [];

        $scope.rates = [];

        $scope.weekdays = WeekDays.all();

        $scope.rate = {};

        $scope.groups = [];

        $scope.othersList = [];
        $scope.others = {};





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

        $scope.clickToCancel = function() {
            console.log('clickToCancel')
            ngDialog.openConfirm({
                templateUrl: '../templates/dialog/cancel.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            }).then(function() {
                console.log('YES')
            }, function() {
                console.log('NO')
            });
        };
        $scope.clickToterm = function() {
            console.log('clickToterm')
            ngDialog.openConfirm({
                templateUrl: './templates/dialog/termandcondition.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            }).then(function() {
                console.log('YES')
            }, function() {
                console.log('NO')
            });
        };


        $ionicModal.fromTemplateUrl('./templates/dialog/termandcondition.html', {
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

        $scope.clickToSubmit = function() {
            console.log('clickToSubmit')
            ngDialog.openConfirm({
                templateUrl: './templates/dialog/submit.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            }).then(function() {
                console.log('YES')
            }, function() {
                console.log('NO')
            });
        };

        $scope.addOthers = function(task) {
            if (!_.isEmpty(task)) {
                $scope.othersList.push(task);
                $scope.others = {};
            }
        };
        $scope.proFile = function($event) {
            $scope.popover.hide();

            $ionicViewSwitcher.nextDirection('forward');
            $timeout(function() {
                $state.go('userprofile');
            }, 100);
        };
        $scope.removeOther = function(index) {
            $scope.othersList.splice(index, 1);
        };

        $scope.addArea = function() {
            $scope.input.push({});
        };

        $scope.addSched = function() {
            $scope.inputs.push({});
        };

        $scope.showPopup = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Terms and Conditions',
                content: "",
                buttons: [{
                    text: 'Close',
                    type: 'button-positive',
                    onTap: function(e) {
                        return true;
                    }
                }]
            });
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
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
        // $ionicPopup.show({
        //       templateUrl: 'popup-template.html',
        //       title: 'Enter Wi-Fi Password',
        //       subTitle: 'WPA2',
        //       scope: $scope,
        //       buttons: [
        //         { text: 'Cancel', onTap: function(e) { return true; } },
        //         {
        //           text: '<b>Save</b>',
        //           type: 'button-positive',
        //           onTap: function(e) {
        //             return $scope.data.wifi;
        //           }
        //         },
        //       ]
        //       })
        // .then(function(res) {
        //         console.log('Tapped!', res);
        //       }, function(err) {
        //         console.log('Err:', err);
        //       }, function(msg) {
        //         console.log('message:', msg);
        //       });
        //       $timeout(function() {
        //       $ionicPopup.alert({
        //         title: 'Unable to connect to network'
        //       }).then(function(res) {
        //         console.log('Your love for ice cream:', res);
        //       });
        //     }, 1000);
        //   };

        $scope.todoAdd = function() {
            // if ($scope.todoInput == null || $scope.todoInput == '') {
            //     return;
            // }

            $scope.todoList.push({ todoText: $scope.todoInput, done: false });
            $scope.todoInput = "";
            localStorage.setItem("mytodos", angular.toJson($scope.todoList));
        };
        $scope.remove = function() {
            //copy list
            var oldList = $scope.todoList;
            //clear list
            $scope.todoList = [];
            //cycle through list
            angular.forEach(oldList, function(x) {
                //add any non-done items to todo list
                if (!x.done) $scope.todoList.push(x);
            });
            //update local storage
            localStorage.setItem("mytodos", angular.toJson($scope.todoList));

        };
        $scope.update = function() {
            //update local storage 100 ms after the checkbox is clicked to allow it to process
            setTimeout(function() {
                localStorage.setItem("mytodos", angular.toJson($scope.todoList));
            }, 100)

        };




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

        if (localStorage.getItem("mytodos") == null) {
            $scope.todoList = [{ todoText: 'Create app', done: false }];
            localStorage.setItem("mytodos", angular.toJson($scope.todoList));

        } else {
            //set the todolist from local storage
            $scope.todoList = angular.fromJson(localStorage.getItem("mytodos"));
        }


        $ionicModal.fromTemplateUrl('termcon.html', {
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

        var ipObj1 = {
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


        var ipObj2 = {
            callback: function(val) {
                if (typeof(val) === 'undefined') {
                    console.log('Time not selected');
                } else {
                    var selectedTime = new Date(val * 1000);
                    var hours = selectedTime.getHours();
                    var minutes = "0" + selectedTime.getMinutes();
                    var seconds = "0" + selectedTime.getSeconds();

                    $scope.rate.end = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                }
            },
            inputTime: 50400,
            format: 12,
            step: 15,
            setLabel: 'Set End'
        };


        $scope.openTime = function() {
            ionicTimePicker.openTimePicker(ipObj1);
        };

        $scope.openTime2 = function() {
            ionicTimePicker.openTimePicker(ipObj2);
        };
        $scope.openTime3 = function() {
            ionicTimePicker.openTimePicker(ipObj1);
        };

        $scope.openTime4 = function() {
            ionicTimePicker.openTimePicker(ipObj2);
        };
        $scope.addRate = function(rate) {
            console.log('rate: ', rate);
            if (!_.isUndefined(rate)) {
                $scope.rates.push({
                    amount: rate.amount,
                    weekday: rate.weekday,
                    note: rate.note
                });
            }
        };

    }
})();

(function() {
    'use strict';

    angular.module('starter')
        .controller('ChatsCtrl', ['$scope', '$ionicPopover', '$state', '$timeout', '$ionicViewSwitcher', '$ionicModal', '$ionicPopup',
            '$filter', 'localStorageService', 'Tasks', '$stateParams', '$rootScope',

            function($scope, $ionicPopover, $state, $timeout, $ionicViewSwitcher, $ionicModal, $ionicPopup, $filter, localStorageService, Tasks, $stateParams, $rootScope) {
                $scope.$on('$ionicView.enter', function(e) {
                    $scope.progressData = [];
                    $scope.pendingData = [];
                    $scope.completedData = [];
                    $scope.progress = false;
                    $scope.date = new Date();
                    $scope.delete = true;
                    $scope.delete2 = true;
                    $scope.delete3 = true;
                    $scope.delete4 = true;
                    $scope.contacts = [];
                    $scope.toggles = [
                        { state: true },
                        { state: false },
                        { state: true }
                    ];

                    $scope.tasklist = Tasks.all();
                    console.log('tasks: ', $scope.tasklist);

                    $scope.selectedTask = $scope.tasklist[0];


                    $scope.isa = false;
                    $scope.duha = false;
                    $scope.tulo = false;
                    $scope.opat = false;

                    // console.log('$scope.ratingsObject: ', $scope.ratingsObject)
                    $scope.clickable = function() {
                        console.log('padulong diri');
                    }

                    $ionicPopover.fromTemplateUrl('./templates/dialog/popadmin.html', {
                        scope: $scope,
                    }).then(function(popover) {
                        $scope.popover2 = popover;
                    });

                    $scope.showPopoveradmin = function($event) {
                        $scope.popover2.show($event);
                    };

                    $scope.showActiveTask = function(task) {
                        $scope.selectedTask = task;
                        console.log('$scope.selectedTask: ', $scope.selectedTask);
                    };

                    $scope.completedTask = function($event) {
                        $ionicViewSwitcher.nextDirection('forward');
                        $timeout(function() {
                            $state.go('completedtask');
                        }, 100);
                    };

                    $scope.clickDecline = function($event) {
                        $scope.popover.hide();

                        $ionicViewSwitcher.nextDirection('back');
                        $timeout(function() {
                            $state.go('tab.tasks');
                        }, 100);
                    };
                    $scope.showConfirm = function() {
                        $ionicPopup.confirm({
                            title: '',
                            template: 'Are you sure you want to assign the task to Lorem Impatsu?'

                        }).then(function(res) {
                            if (res) {

                                $ionicViewSwitcher.nextDirection('forward');
                                $state.go('approve');

                            } else {
                                console.log('You are not sure');
                            }
                        });
                    };

                    $scope.quotsub = function() {
                        $ionicPopup.confirm({
                            title: '',
                            template: 'Submit Quote?'

                        }).then(function(res) {
                            if (res) {

                                $ionicViewSwitcher.nextDirection('back');
                                $state.go('tab.tasks');

                            } else {
                                console.log('You are not sure');
                            }
                        });
                    };

                    $scope.complete = function() {
                        console.log('$stateParams:', $stateParams.id);
                        var result = Tasks.get($stateParams.id);
                        console.log('result:', result);
                        if (result) {
                            $ionicPopup.confirm({
                                title: '',
                                template: 'Send report?',
                                buttons: [
                                    { text: 'NO' }, {
                                        text: 'YES',
                                        type: 'button-positive',
                                        onTap: function(res) {
                                            if (res) {
                                                console.log('asdasdasd')
                                                _.map($scope.tasklist, function(row) {
                                                    if (row == result) {
                                                        row.Task = 'complete';
                                                        $state.go('tab.tasks')
                                                    }
                                                });
                                                $scope.progress = _.filter($scope.tasklist, function(row) {
                                                    return row.Task == 'progress';
                                                });
                                                localStorage.setItem("tasklist", angular.toJson($scope.tasklist));
                                            } else {
                                                console.log('You are not sure');
                                            }
                                        }
                                    },
                                ]

                            })

                        }


                    };
                    $scope.checkInOut = function(list) {
                        console.log('list:', list);
                        var result2 = [];
                        var result = _.find($scope.tasklist, function(row) {
                            return row.Check == 'in';
                        });
                        if (_.isUndefined(result)) {

                        } else {
                            result2.push(result);
                        }
                        if (list.Check == 'in') {
                            $ionicPopup.confirm({
                                title: '<h4>Check-out to pause task</h4>',
                                templateUrl: './templates/dialog/checkout.html',
                                buttons: [
                                    { text: 'NO' }, {
                                        text: 'YES',
                                        type: 'button-positive',
                                        onTap: function(res) {
                                            if (res) {
                                                console.log('asdasdasd')
                                                _.map($scope.tasklist, function(row) {
                                                    if (row == list) {
                                                        row.Check = 'out';
                                                    }
                                                });
                                                localStorage.setItem("tasklist", angular.toJson($scope.tasklist));
                                            } else {
                                                console.log('You are not sure');
                                            }
                                        }
                                    },
                                ]

                            })

                        } else {
                            if (result2.length == 1) {
                                $ionicPopup.alert({
                                    template: 'You are currently check-in to other task. <br> Please check-out.'
                                })
                            } else {
                                $ionicPopup.confirm({
                                    title: '<h4>Check-in to resume task</h4>',
                                    templateUrl: './templates/dialog/checkin.html',
                                    buttons: [
                                        { text: 'NO' }, {
                                            text: 'YES',
                                            type: 'button-positive',
                                            onTap: function(res) {
                                                if (res) {
                                                    _.map($scope.tasklist, function(row) {
                                                        if (row == list) {
                                                            row.Check = 'in';
                                                        }
                                                    });
                                                    localStorage.setItem("tasklist", angular.toJson($scope.tasklist));
                                                } else {
                                                    console.log('You are not sure');
                                                }
                                            }
                                        },
                                    ]

                                })
                            }

                        }
                        // if (_.isUndefined(result) || result.length == 1) {
                        //     $ionicPopup.confirm({
                        //         title: '',
                        //         template: 'Are you sure to Check in?',
                        //         buttons: [
                        //             { text: 'NO' }, {
                        //                 text: 'YES',
                        //                 type: 'button-positive',
                        //                 onTap: function(res) {
                        //                     if (res) {
                        //                         console.log('asdasdasd')
                        //                         _.map($scope.tasklist, function(row) {
                        //                             if (row == list) {
                        //                                 row.Check = 'in';
                        //                             }
                        //                         });
                        //                         localStorage.setItem("tasklist", angular.toJson($scope.tasklist));
                        //                     } else {
                        //                         console.log('You are not sure');
                        //                     }
                        //                 }
                        //             },
                        //         ]

                        //     })

                        // } else {

                        // }

                    };

                    $scope.showCheck = function(list) {
                        console.log('ASDASDASD');
                        if (list.Status == 'High') {
                            $ionicPopup.show({
                                title: '<h4>Check-out to complete task</h4>',
                                templateUrl: './templates/dialog/checkout.html',
                                buttons: [
                                    { text: 'NO' }, {
                                        text: 'YES',
                                        type: 'button-positive',
                                        onTap: function(res) {
                                            if (res) {
                                                $ionicViewSwitcher.nextDirection('forward');
                                                $state.go('installationreport', { id: list.id }, { reload: false });
                                            } else {
                                                console.log('You are not sure');
                                            }
                                        }
                                    },
                                ]

                            })

                        } else if (list.Status == 'Medium') {
                            $ionicPopup.confirm({
                                title: '<h4>Check-out to complete task</h4>',
                                templateUrl: './templates/dialog/checkout.html',
                                buttons: [
                                    { text: 'NO' }, {
                                        text: 'YES',
                                        type: 'button-positive',
                                        onTap: function(res) {
                                            if (res) {
                                                $ionicViewSwitcher.nextDirection('forward');
                                                $state.go('reporting', { id: list.id }, { reload: false });
                                            } else {
                                                console.log('You are not sure');
                                            }
                                        }
                                    },
                                ]

                            })

                        } else if (list.Status == 'Low') {
                            $ionicPopup.confirm({
                                title: '<h4>Check-out to complete task</h4>',
                                templateUrl: './templates/dialog/checkout.html',
                                buttons: [
                                    { text: 'NO' }, {
                                        text: 'YES',
                                        type: 'button-positive',
                                        onTap: function(res) {
                                            if (res) {
                                                $ionicViewSwitcher.nextDirection('forward');
                                                $state.go('sitesurvey', { id: list.id }, { reload: false });
                                            } else {
                                                console.log('You are not sure');
                                            }
                                        }
                                    },
                                ]

                            })

                        }
                    };
                    $scope.deTails = function(list) {
                        console.log('ASDASDASD');
                        if (list.Status == 'High') {
                            $ionicViewSwitcher.nextDirection('forward');
                            $state.go('detailsH');
                        } else if (list.Status == 'Medium') {
                            $ionicViewSwitcher.nextDirection('forward');
                            $state.go('detailsM');

                        } else if (list.Status == 'Low') {
                            $ionicViewSwitcher.nextDirection('forward');
                            $state.go('detailsL');

                        }
                    };


                    $scope.add = function(list) {
                        var result = _.filter($scope.tasklist, function(row) {
                            return row.Task == 'progress';
                        });
                        console.log('result:', result);
                        if (result.length > 2) {
                            $ionicPopup.alert({
                                template: 'You are currently check-in to 3 task. <br> Please check-out.'
                            })
                        } else {
                            $ionicPopup.confirm({
                                title: '<h4>Check-in to start task</h4>',
                                templateUrl: './templates/dialog/checkin.html',

                            }).then(function(res) {
                                if (res) {
                                    _.map($scope.tasklist, function(row) {
                                        if (row == list) {
                                            row.Task = 'progress';
                                        }
                                    });
                                    $scope.pending = _.filter($scope.tasklist, function(row) {
                                        return row.Task == 'pending';
                                    });
                                    $scope.tasklist.splice(list, 0);
                                } else {
                                    console.log('You are not sure');
                                }
                            });
                            console.log('$scope.tasklist1:', $scope.tasklist);
                        }
                    };


                    $scope.delete = function() {
                        $ionicPopup.confirm({
                            title: '',
                            template: 'Are you sure you want to close task?',
                            buttons: [
                                { text: 'NO' }, {
                                    text: 'YES',
                                    type: 'button-positive',
                                    onTap: function(res) {
                                        if (res) {
                                            $scope.delete = false;
                                        } else {}
                                    }
                                },
                            ]
                        })
                        console.log('$scope.tasklist1:', $scope.tasklist);
                    };

                    $scope.delete2 = function() {
                        $ionicPopup.confirm({
                            title: '',
                            template: 'Are you sure you want to close task?',
                            buttons: [
                                { text: 'NO' }, {
                                    text: 'YES',
                                    type: 'button-positive',
                                    onTap: function(res) {
                                        if (res) {
                                            $scope.delete2 = false;
                                        } else {}
                                    }
                                },
                            ]
                        })
                        console.log('$scope.tasklist1:', $scope.tasklist);
                    };

                    $scope.delete3 = function() {
                        $ionicPopup.confirm({
                            title: '',
                            template: 'Are you sure you want to decline task?',
                            buttons: [
                                { text: 'NO' }, {
                                    text: 'YES',
                                    type: 'button-positive',
                                    onTap: function(res) {
                                        if (res) {
                                            $scope.delete3 = false;
                                        } else {}
                                    }
                                },
                            ]
                        })
                        console.log('$scope.tasklist1:', $scope.tasklist);
                    };

                    $scope.delete4 = function() {
                        $ionicPopup.confirm({
                            title: '',
                            template: 'Are you sure you want to decline task?',
                            buttons: [
                                { text: 'NO' }, {
                                    text: 'YES',
                                    type: 'button-positive',
                                    onTap: function(res) {
                                        if (res) {
                                            $scope.delete4 = false;
                                        } else {}
                                    }
                                },
                            ]
                        })
                        console.log('$scope.tasklist1:', $scope.tasklist);
                    };

                    // $scope.dreport = function() {
                    //     $ionicPopup.alert({
                    //         title: '',
                    //         template: 'Report downloaded...'
                    //     });

                    //     alertPopup.then(function(res) {
                    //         console.log('Thank you for advice.');
                    //     });
                    // }



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
                    // $scope.proFile = function($event) {
                    //     $scope.popover.hide();

                    //     $ionicViewSwitcher.nextDirection('forward');
                    //     $timeout(function() {
                    //         $state.go('userprofile');
                    //     }, 100);
                    // };
                    // $scope.adminproFile = function($event) {
                    //     $scope.popover.hide();

                    //     $ionicViewSwitcher.nextDirection('forward');
                    //     $timeout(function() {
                    //         $state.go('adminprofile');
                    //     }, 100);
                    // };
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
                        $scope.contacts.push({ name: u.firstName, description: u.description, rate: u.rate });
                        $scope.modal.hide();
                    };
                    // $scope.goProfile = function() {
                    //     // $scope.mainPopover.hide();
                    //     // $ionicViewSwitcher.nextDirection('forward');
                    //     $state.go('userprofile');
                    // };

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

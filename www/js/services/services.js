(function() {
    'use strict';
    angular.module('starter')
        .factory('Tasks', function() {
            var tasks = [{
                id: 1,
                Title: 'Network Setup',
                Description: '7-Eleven',
                Status: 'High',
                Task: 'progress',
                Check: 'out'
            }, {
                id: 2,
                Title: 'AV-Installation',
                Description: 'Telstra,Melbourne',
                Status: 'Medium',
                Task: 'progress',
                Check: 'out'
            }, {
                id: 3,
                Title: 'Hardware Installation',
                Description: 'Telstra,Melbourne',
                Status: 'Low',
                Task: 'progress',
                Check: 'out'
            }, {
                id: 4,
                Title: 'Network Setup',
                Description: '7-Eleven',
                Status: 'High',
                Task: 'pending',
                Check: 'out'
            }, {
                id: 5,
                Title: 'AV-Installation',
                Description: 'Telstra,Melbourne',
                Status: 'Medium',
                Task: 'pending',
                Check: 'out'
            }, {
                id: 6,
                Title: 'Hardware Installation',
                Description: 'Telstra,Melbourne',
                Status: 'Low',
                Task: 'pending',
                Check: 'out'
            }, {
                id: 7,
                Title: 'luckzuu Installation',
                Description: 'Telstra,Melbourne',
                Status: 'Low',
                Task: ''
            }, {
                id: 8,
                Title: 'luckzuu Setup',
                Description: 'Telstra,Melbourne',
                Status: 'Low',
                Task: ''
            }];

            return {
                all: function() {
                    return tasks;
                },
                remove: function(task) {
                    tasks.splice(tasks.indexOf(task), 1);
                },
                get: function(id) {
                    for (var i = 0; i < tasks.length; i++) {
                        if (tasks[i].id === parseInt(id)) {
                            return tasks[i];
                        }
                    }
                    return null;
                }
            };
        })
        .factory('WeekDays', function() {
            var chats = [{
                id: 1,
                name: 'Sunday',
                abbr: 'SUN'
            }, {
                id: 2,
                name: 'Monday',
                abbr: 'MON'
            }, {
                id: 3,
                name: 'Tuesday',
                abbr: 'TUE'
            }, {
                id: 4,
                name: 'Wednesday',
                abbr: 'WED'
            }, {
                id: 5,
                name: 'Thursday',
                abbr: 'THU'
            }, {
                id: 6,
                name: 'Friday',
                abbr: 'FRI'
            }, {
                id: 7,
                name: 'Saturday',
                abbr: 'SAT'
            }];

            return {
                all: function() {
                    return chats;
                },
                get: function(chatId) {
                    for (var i = 0; i < chats.length; i++) {
                        if (chats[i].id === parseInt(chatId)) {
                            return chats[i];
                        }
                    }
                    return null;
                }
            };
        })
        .factory('States', function() {
            var states = [{
                id: 1,
                code: 'ACT',
                name: 'Australian Capital Territory'
            }, {
                id: 2,
                code: 'NSW',
                name: 'New South Wales'
            }, {
                id: 3,
                code: 'NT',
                name: 'Northern Territory'
            }, {
                id: 4,
                code: 'QLD',
                name: 'Queensland'
            }, {
                id: 5,
                code: 'SA',
                name: 'South Australia'
            }, {
                id: 6,
                code: 'TAS',
                name: 'Tasmania'
            }, {
                id: 7,
                code: 'VIC',
                name: 'Victoria'
            }, {
                id: 8,
                code: 'WA',
                name: 'Western Australia'
            }];

            return {
                all: function() {
                    return states;
                },
                get: function(stateId) {
                    for (var i = 0; i < states.length; i++) {
                        if (states[i].id === parseInt(stateId)) {
                            return states[i];
                        }
                    }
                    return null;
                }
            };
        })
        .factory('Country', function() {
            var countries = [{
                id: 1,
                code: 'AUS',
                name: 'Australia'
            }, {
                id: 2,
                code: 'NZ',
                name: 'New Zealand'
            }];

            return {
                all: function() {
                    return countries;
                },
                get: function(stateId) {
                    for (var i = 0; i < countries.length; i++) {
                        if (countries[i].id === parseInt(stateId)) {
                            return countries[i];
                        }
                    }
                    return null;
                }
            };
        })
        .factory('CityState', ['$http', function($http) {
            return {
                all: function(state) {
                    if (state == 'ACT') {
                        console.log('state: ', state);
                        return $http.get('./data/act.json').success(function(data) {
                            return data;
                        });
                    } else if (state == 'NSW') {
                        return $http.get('./data/nsw.json').success(function(data) {
                            return data;
                        });
                    } else if (state == 'NT') {
                        return $http.get('./data/nt.json').success(function(data) {
                            return data;
                        });
                    } else if (state == 'QLD') {
                        return $http.get('./data/qld.json').success(function(data) {
                            return data;
                        });
                    } else if (state == 'SA') {
                        return $http.get('./data/sa.json').success(function(data) {
                            return data;
                        });
                    } else if (state == 'VIC') {
                        return $http.get('./data/vic.json').success(function(data) {
                            return data;
                        });
                    } else if (state == 'WA') {
                        return $http.get('./data/wa.json').success(function(data) {
                            return data;
                        });
                    }
                },
                get: function(stateId) {

                }
            };
        }])
        .factory('Banks', ['$http', function($http) {
            return {
                all: function() {
                    return $http.get('./data/bank.json').success(function(data) {
                        return data;
                    });
                },
                get: function(bankId) {
                    return $http.get('./data/bank.json').success(function(data) {
                        return data;
                    });
                }
            };
        }])
        .factory('Currencies', ['$http', function($http) {
            return {
                all: function() {
                    return $http.get('./data/currency.json').success(function(data) {
                        return data;
                    });
                },
                get: function(bankId) {
                    return $http.get('./data/bank.json').success(function(data) {
                        return data;
                    });
                }
            };
        }]);

})();

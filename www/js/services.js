(function() {
    'use strict';

    angular.module('starter')
    .factory('Chats', function() {
        var chats = [{
            id: 0,
            name: 'Digital Ticket Testing',
            client: 'Telstra',
            date_created: new Date(),
            status: 'progress',
            priority: 'normal'
        }, {
            id: 1,
            name: 'Network Setup',
            client: '7-Eleven',
            date_created: new Date(),
            status: 'progress',
            priority: 'normal'
        }, {
            id: 2,
            name: 'Hardware Installation',
            client: 'Telstra',
            date_created: new Date(),
            status: 'progress',
            priority: 'low'
        }, {
            id: 3,
            name: 'Hardware Installation',
            client: '7-Evelen',
            date_created: new Date(),
            status: 'pending',
            priority: 'high'
        }, {
            id: 4,
            name: 'Network Setup',
            client: 'BUPA',
            date_created: new Date(),
            status: 'pending',
            priority: 'normal'
        }, {
            id: 5,
            name: 'Hardware Installation',
            client: 'NAB',
            date_created: new Date(),
            status: 'pending',
            priority: 'low'
        }, {
            id: 6,
            name: 'Hardware Installation',
            client: 'Forever New',
            date_created: new Date(),
            status: 'completed',
            priority: 'low'
        }, {
            id: 7,
            name: 'Network Setup',
            client: 'NAB',
            date_created: new Date(),
            status: 'completed',
            priority: 'low'
        }];

        return {
            all: function() {
                return chats;
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
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
    .factory('WeekDays', function() {
        var chats = [{
            id: 0,
            name: 'Base Rate',
            label: 'Base Rate'
        }, {
            id: 1,
            name: 'After Hours',
            label: 'After Hours'
        }, {
            id: 2,
            name: 'Weekend',
            label: 'Weekend'
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
    });

})();

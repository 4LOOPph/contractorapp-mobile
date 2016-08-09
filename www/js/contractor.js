(function () {
  'use strict';

  angular.module('starter')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider
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
              controller: 'ChatsCtrl'
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
        .state('detailsH', {
          url: '/detailsH',
          templateUrl: 'templates/detailsH.html',
          controller: 'ChatsCtrl'
        })
        .state('detailsM', {
          url: '/detailsM',
          templateUrl: 'templates/detailsM.html',
          controller: 'ChatsCtrl'
        })
        .state('detailsL', {
          url: '/detailsL',
          templateUrl: 'templates/detailsL.html',
          controller: 'ChatsCtrl'
        })
        .state('adminprogress', {
          url: '/adminprogress',
          templateUrl: 'templates/adminprogress.html',
          controller: 'ChatsCtrl'
        })
        .state('pendingtask', {
          url: '/pendingtask',
          templateUrl: 'templates/pendingtask.html',
          controller: 'ChatsCtrl'
        })
        .state('forapproval', {
          url: '/forapproval',
          templateUrl: 'templates/forapproval.html',
          controller: 'ChatsCtrl'
        })
        .state('completedtask', {
          url: '/completedtask',
          templateUrl: 'templates/completedtask.html',
          controller: 'ChatsCtrl'
        })
        .state('comptask', {
          url: '/comptask',
          templateUrl: 'templates/comptask.html',
          controller: 'ChatsCtrl'
        })
        .state('reportdone', {
          url: '/reportdone',
          templateUrl: 'templates/reportdone.html',
          controller: 'ChatsCtrl'
        })
        .state('reportdone2', {
          url: '/reportdone2',
          templateUrl: 'templates/reportdone2.html',
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
        });

    }]);
})();

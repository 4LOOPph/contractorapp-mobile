(function () {
  'use strict';

  angular.module('starter')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider
        .state('quotelist', {
          url: '/quotelist',
          templateUrl: 'templates/quotelist.html',
          controller: 'ChatsCtrl'
        })
        .state('quotedetails', {
          url: '/quotedetails',
          templateUrl: 'templates/qowlist.html',
          controller: 'ChatsCtrl'
        })
        .state('approve', {
          url: '/approve',
          templateUrl: 'templates/approve.html',
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
          url: '/supportreport/:id',
          templateUrl: 'templates/supportreport.html',
          controller: 'ChatsCtrl'
        })
        .state('installationreport', {
          url: '/installationreport/:id',
          templateUrl: 'templates/installationreport.html',
          controller: 'ChatsCtrl'
        })
        .state('sitesurvey', {
          url: '/sitesurvey/:id',
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
              controller: 'ChatsCtrl'
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
        })
    }]);

})()

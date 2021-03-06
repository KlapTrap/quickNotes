define([
    'angular',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
    ], function (angular) {
        'use strict';

        return angular.module('notesApp', [
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ngRoute'
        ]).config(function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider.when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            }).when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            }).otherwise({
                redirectTo: '/'
            });

    });
});

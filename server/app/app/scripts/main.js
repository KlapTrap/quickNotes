require.config({
	paths: {
		angular: '../../bower_components/angular/angular',
		angularMocks: '../../bower_components/angular-mocks/angular-mocks',
		text: '../../bower_components/requirejs-text/text',
		ngCookies: '../../bower_components/angular-cookies/angular-cookies',
		ngResource: '../../bower_components/angular-resource/angular-resource',
		ngSanitize: '../../bower_components/angular-sanitize/angular-sanitize',
		ngRoute: '../../bower_components/angular-route/angular-route',
		app: './app'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'ngRoute': ['angular'],
		'ngCookies': ['angular'],
		'ngResource': ['angular'],
		'ngSanitize': ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		},
		'app': {
			deps: ['angular'],
			'exports' : 'app'
		}
	},
	priority: [
		"angular"
	]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
	'angular',
	'app',
	'ngRoute'
], function(angular, app, routes) {
	'use strict';
	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		angular.resumeBootstrap([app['notesApp']]);
	});
});

'use strict';

const DATE = +new Date(),
	VERSION = `?v=${DATE}`;

angular.module('app', [
	'ngRoute',

	'app.config',
	'app.controllers'
]).config(['$locationProvider', '$routeProvider', ($locationProvider, $routeProvider) => {
	$locationProvider.html5Mode(true);

	$routeProvider.when('/', {
		templateUrl: `app/bundles/app/views/index.html${VERSION}`,
		controller: 'indexCtrl',
		title: 'Strona główna',
		requireLogin: false
	});
	$routeProvider.when('/login', {
		templateUrl: `app/bundles/authentication/views/login.html${VERSION}`,
		controller: 'loginCtrl',
		title: 'Logowanie',
		requireLogin: false
	});
	$routeProvider.when('/logout', {
		templateUrl: `app/bundles/authentication/views/logout.html${VERSION}`,
		controller: 'logoutCtrl',
		title: 'Trwa wylogowywanie...',
		requireLogin: false
	});
	$routeProvider.when('/user/add', {
		templateUrl: `app/bundles/user/views/add.html${VERSION}`,
		controller: 'userAddCtrl',
		title: 'Użytkownicy - dodawanie',
		requireLogin: true
	});
	$routeProvider.when('/user/list', {
		templateUrl: `app/bundles/user/views/list.html${VERSION}`,
		controller: 'userListCtrl',
		title: 'Użytkownicy - lista',
		requireLogin: true
	});
	$routeProvider.when('/user/:id', {
		templateUrl: `app/bundles/user/views/details.html${VERSION}`,
		controller: 'userDetailsCtrl',
		title: 'Użytkownicy - szczegóły',
		requireLogin: true
	});
	$routeProvider.when('/user/:id/edit', {
		templateUrl: `app/bundles/user/views/edit.html${VERSION}`,
		controller: 'userEditCtrl',
		title: 'Użytkownicy - edytowanie',
		requireLogin: true
	});

	$routeProvider.otherwise({
		templateUrl: 'app/bundles/app/views/404.html' + VERSION,
		controller: '404Ctrl',
		title: 'Ta strona nie istnieje',
		requireLogin: false
	});
}]).constant('APP_NAME', 'Zavijava');

const app = angular.module('app.controllers', []);

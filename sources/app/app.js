'use strict';

const app = angular.module('app.controllers', []);

angular.module('app', [
	'ngRoute',

	'app.config',
	'app.controllers'
]).config(['$locationProvider', '$routeProvider', 'config', ($locationProvider, $routeProvider, config) => {
	const VERSION = '?v=' + config.version;

	$locationProvider.html5Mode(true);

	$routeProvider.when('/', {
		templateUrl: `app/bundles/app/views/index.html${VERSION}`,
		controller: 'indexCtrl',
		controllerAs: 'index',
		title: 'Strona główna',
		requireLogin: false
	}).when('/login', {
		templateUrl: `app/bundles/authentication/views/login.html${VERSION}`,
		controller: 'loginCtrl',
		controllerAs: 'login',
		title: 'Logowanie',
		requireLogin: false
	}).when('/logout', {
		templateUrl: `app/bundles/authentication/views/logout.html${VERSION}`,
		controller: 'logoutCtrl',
		controllerAs: 'logout',
		title: 'Trwa wylogowywanie...',
		requireLogin: false
	}).when('/user/add', {
		templateUrl: `app/bundles/user/views/add.html${VERSION}`,
		controller: 'userAddCtrl',
		controllerAs: 'userAdd',
		title: 'Użytkownicy - dodawanie',
		requireLogin: true
	}).when('/user/list', {
		templateUrl: `app/bundles/user/views/list.html${VERSION}`,
		controller: 'userListCtrl',
		controllerAs: 'userList',
		title: 'Użytkownicy - lista',
		requireLogin: true
	}).when('/user/:id', {
		templateUrl: `app/bundles/user/views/details.html${VERSION}`,
		controller: 'userDetailsCtrl',
		controllerAs: 'userDetails',
		title: 'Użytkownicy - szczegóły',
		requireLogin: true
	}).when('/user/:id/edit', {
		templateUrl: `app/bundles/user/views/edit.html${VERSION}`,
		controller: 'userEditCtrl',
		controllerAs: 'userEdit',
		title: 'Użytkownicy - edytowanie',
		requireLogin: true
	}).otherwise({
		templateUrl: `app/bundles/app/views/404.html${VERSION}`,
		controller: '404Ctrl',
		controllerAs: '404',
		title: 'Ta strona nie istnieje',
		requireLogin: false
	});
}]).constant('APP_NAME', 'Zavijava');

'use strict';

app.controller('sidebarCtrl', ['$location', function ($location) {
	this.menu = [
		{
			name: 'Strona główna',
			url: '/'
		},
		{
			name: 'Logowanie',
			url: '/login'
		},
		{
			name: 'Wylogowanie',
			url: '/logout'
		},
		{
			name: 'Lista użytkowników',
			url: '/user/list'
		},
		{
			name: 'Dodaj użytkownika',
			url: '/user/add'
		}
	];

	this.amIOnThisPath = path => ($location.path() === path);
}]);

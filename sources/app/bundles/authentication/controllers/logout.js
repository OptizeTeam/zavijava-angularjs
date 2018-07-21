'use strict';

app.controller('logoutCtrl', ['$location', 'ajax', 'notify', function ($location, ajax, notify) {
	if (!ajax.hasToken()) {
		notify.info('Nie jesteś zalogowany/a');

		$location.path('/');

		return;
	}

	ajax.post('/logout').then(function () {
		ajax.unsetToken();

		notify.success('Do zobaczenia!');

		$location.path('/');
	}).catch(function (r) {
		notify.error(`Wystąpił błąd: ${r.statusText} (${r.status})`, angular.toJson(r.data));
	});
}]);

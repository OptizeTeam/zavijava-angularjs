'use strict';

app.controller('loginCtrl', ['$location', 'ajax', 'notify', function ($location, ajax, notify) {
	if (ajax.hasToken()) {
		notify.info('Jesteś już zalogowany/a');

		$location.path('/');

		return;
	}

	this.data = {};

	this.submit = () => {
		ajax.post('/login', this.data).then(function (r) {
			ajax.setToken(r.data.token);

			notify.success('Witaj!');

			$location.path('/');
		}).catch(function (r) {
			notify.error(`Wystąpił błąd: ${r.statusText} (${r.status})`, angular.toJson(r.data));
		});
	};
}]);

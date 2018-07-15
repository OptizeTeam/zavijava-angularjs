'use strict';

app.controller('404Ctrl', ['$window', function ($window) {
	const content = {
		title: 'Ta strona nie istnieje (404)',
		text: 'Strona, której szukasz nie istnieje - być może element, który powinien się tu znajdować został usunięty. Jeśli uważasz, że jest to błąd - możesz nam go zgłosić.',
		type: 'error',
		confirmButtonText: 'Przejdź do strony głównej',
		reverseButtons: true,
		footer: '<a href="https://github.com/OptizeTeam/zavijava-angularjs/issues" target="_blank">Zgłoś błąd</a>'
	};

	let callback;

	if (1 < $window.history.length) {
		content.showCancelButton = true;
		content.cancelButtonText = 'Wróc do poprzedniej strony';

		callback = r => {
			if (r.value) {
				$window.location = '/';
			}
			else {
				$window.history.back();
			}
		};
	}
	else {
		callback = () => {
			$window.location = '/';
		};
	}

	swal(content).then(callback);
}]);

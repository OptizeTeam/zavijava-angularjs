'use strict';

app.controller('mainCtrl', ['$rootScope', '$location', 'ajax', 'APP_NAME', function ($rootScope, $location, ajax, APP_NAME) {
	this.APP_NAME = APP_NAME;
	this.currentPage = '';
	this.title = this.APP_NAME;

	$rootScope.$on(
		'$routeChangeStart',
		/**
		 * @param {Object} e
		 * @param {Object} nextUrl
		 * @param {Boolean} nextUrl.requireLogin
		 */
		(e, nextUrl) => {
			if (
				null === ajax.token &&
				'undefined' !== typeof nextUrl.requireLogin &&
				nextUrl.requireLogin
			) {
				$location.path('/login');
			}
		}
	);

	$rootScope.$on(
		'$routeChangeSuccess',
		/**
		 * @param {Object} e
		 * @param {Object} currentUrl
		 * @param {String} currentUrl.title
		 */
		(e, currentUrl) => {
			if ('undefined' !== typeof currentUrl.title) {
				this.currentPage = currentUrl.title;
				this.title = `${this.APP_NAME}: ${this.currentPage}`;
			}
			else {
				this.currentPage = '';
				this.title = this.APP_NAME;
			}
		}
	);
}]);

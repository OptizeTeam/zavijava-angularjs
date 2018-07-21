angular.module('ajaxProvider', []).provider('ajax', [function () {
	this.api = '/';

	this.$get = ($http, $localStorage) => {
		/**
		 * @param {String} method
		 * @param {String} path
		 * @param {Object} [data]
		 *
		 * @return {Promise}
		 */
		const request = (method, path, data) => {
			const req = {
				url: this.api + path,
				method: method
			};

			if (angular.isDefined(data)) {
				req.data = data;
			}

			if (angular.isDefined($localStorage.token)) {
				req.headers = {
					token: $localStorage.token
				};
			}

			return $http(req);
		};

		/**
		 * @param {String} path
		 *
		 * @return {Promise}
		 */
		const get = path => {
			return request(
				'GET',
				path
			);
		};

		/**
		 * @param {String} path
		 * @param {Object} [data]
		 *
		 * @return {Promise}
		 */
		const post = (path, data) => {
			return request(
				'POST',
				path,
				data
			);
		};

		/**
		 * @param {String} path
		 * @param {Object} [data]
		 *
		 * @return {Promise}
		 */
		const put = (path, data) => {
			return request(
				'PUT',
				path,
				data
			);
		};

		/**
		 * @param {String} path
		 *
		 * @return {Promise}
		 */
		const remove = path => {
			return request(
				'DELETE',
				path
			);
		};

		/**
		 * @return {Boolean}
		 */
		const hasToken = () => angular.isDefined($localStorage.token);

		/**
		 * @param token
		 */
		const setToken = token => {
			$localStorage.token = token;
		};

		const unsetToken = () => {
			delete $localStorage.token;
		};

		return {
			get: get,
			post: post,
			put: put,
			remove: remove,
			hasToken: hasToken,
			setToken: setToken,
			unsetToken: unsetToken
		};
	};

}]);
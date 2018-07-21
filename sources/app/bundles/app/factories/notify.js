angular.module('notifyFactory', []).factory('notify', [function () {
	/**
	 * @param {String} type
	 * @param {String} title
	 * @param {String} [text]
	 */
	const notify = (type, title, text) => {
		const data = {
			type: type,
			title: title
		};

		if (angular.isDefined(text)) {
			data.text = text;
		}
		else {
			data.showConfirmButton = false;
			data.position = 'top-end';
			data.timer = 1500;

		}

		swal(data);
	};

	/**
	 * @param {String} title
	 * @param {String} [text]
	 */
	const error = (title, text) => {
		notify('info', title, text);
	};

	/**
	 * @param {String} title
	 */
	const info = title => {
		notify('info', title);
	};

	/**
	 * @param {String} title
	 */
	const success = title => {
		notify('success', title);
	};

	return {
		error: error,
		info: info,
		success: success
	}
}]);
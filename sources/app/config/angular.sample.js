'use strict';

angular.module('app.config', []).constant('config', {
	api: 'https://api.zavijava.optize.pl/1.0',
	debug: true,
	version: +new Date()
});

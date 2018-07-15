'use strict';

const fs = require('fs'),
	nodeSass = require('node-sass');

const environment = require('./sources/app/config/environment');

const pugPretty = environment.debug,
	sassOutputStyle = environment.debug ? 'expanded' : 'compressed',
	sassSourceMap = environment.debug,
	uglifyBeautify = environment.debug,
	uglifyCompress = environment.debug ? false : {},
	uglifyMangle = environment.debug ? false : {},
	uglifySourceMap = environment.debug,
	jsAssetsFilePath = 'www/assets/scripts.js',
	copyTasks = {
		vendors: {
			files: [
				{
					cwd: 'node_modules/font-awesome/fonts',
					src: '**',
					dest: 'www/assets/fonts/font-awesome',
					expand: true
				},
				{
					cwd: 'node_modules/lato-font/fonts',
					src: '**',
					dest: 'www/assets/fonts/lato',
					expand: true
				}
			]
		}
	},
	pugTasks = {
		index: {
			options: {
				pretty: pugPretty
			},
			src: 'sources/index.pug',
			dest: 'www/index.html'
		},
	},
	sassTasks = {
		options: {
			implementation: nodeSass,
			outputStyle: sassOutputStyle,
			sourceMap: sassSourceMap
		},
		global: {
			src: 'sources/assets/styles/global.sass',
			dest: 'www/assets/styles.css'
		}
	},
	uglifyTasks = {
		options: {
			beautify: uglifyBeautify,
			compress: uglifyCompress,
			mangle: uglifyMangle,
			sourceMap: uglifySourceMap
		},
		global: {
			files: {
				[jsAssetsFilePath]: [
					'node_modules/angular/angular.js',
					'node_modules/angular-route/angular-route.js',
					'node_modules/sweetalert2/dist/sweetalert2.js',
					'sources/app/config/angular.js',
					'sources/app/app.js'
				]
			}
		}
	},
	watchTasks = {
		uglifyGlobal: {
			files: 'sources/app/**/*.js',
			tasks: [
				'uglify:global'
			]
		},
		pugIndex: {
			files: 'sources/index.pug',
			tasks: [
				'pug:index'
			]
		},
		sassGlobal: {
			files: 'sources/assets/styles/**/*.sass',
			tasks: [
				'sass:global'
			]
		}
	};


function capitalizeFirstLetter(string) {
	return string[0].toUpperCase() + string.slice(1);
}


/**
 * Create grunt tasks for pug depending on created bundles
 */
fs.readdirSync('sources/app/bundles').forEach(bundle => {
	const bundleCapitalized = capitalizeFirstLetter(bundle);

	pugTasks[`bundle${bundleCapitalized}`] = {
		options: {
			pretty: pugPretty
		},
		files: [
			{
				cwd: `sources/app/bundles/${bundle}/views/`,
				src: [
					'**/*.pug',
					'!**/_*.pug'
				],
				dest: `www/app/bundles/${bundle}/views/`,
				ext: '.html',
				expand: true
			}
		]
	};

	watchTasks[`pugBundle${bundleCapitalized}`] = {
		files: `sources/app/bundles/${bundle}/views/*.pug`,
		tasks: [
			`pug:bundle${bundleCapitalized}`
		]
	};

	fs.readdirSync(`sources/app/bundles/${bundle}/controllers/`).forEach(controller => {
		uglifyTasks.global.files[jsAssetsFilePath].push(`sources/app/bundles/${bundle}/controllers/${controller}`);
	});
});

/**
 * @param {Object} grunt
 * @param {Function} grunt.initConfig
 * @param {Object} grunt.file
 * @param {Function} grunt.loadNpmTasks
 * @param {Function} grunt.registerTask
 */
module.exports = grunt => {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: copyTasks,
		pug: pugTasks,
		sass: sassTasks,
		uglify: uglifyTasks,
		watch: watchTasks
	});
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('default', [
		'watch'
	]);
	grunt.registerTask('build', [
		'copy',
		'pug',
		'sass',
		'uglify'
	]);
};

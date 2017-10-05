module.exports = function(grunt) {

	grunt.config.init({

		babel: {
			options: {
				sourceMap: false,
				// presets: ['babel-preset-es2015'],
				compact: false
			},
			latinWords: {
				files: {
					'bin/LatinWords.js': 'src/LatinWords.js'
				}
			}
		},

		watch: {
			latinWords: {
				files: ['src/LatinWords.js'],
				tasks: ['LatinWords'],
				options: {
					spawn: false
				}
			}
		}

	});

	// load grunt plugins
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// define tasks
	// grunt.registerTask('greekKeyboard', ['babel']);
	// grunt.registerTask('LatinWords', ['babel:latinWords']);
  grunt.registerTask('LatinWords', ['babel']);
};

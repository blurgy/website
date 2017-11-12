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
			},
			spanishWords: {
				files: {
					'bin/SpanishWords.js': 'src/SpanishWords.js'
				}
			}
			,
			frenchWords: {
				files: {
					'bin/FrenchWords.js': 'src/FrenchWords.js'
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
			},
			spanishWords: {
				files: ['src/SpanishWords.js'],
				tasks: ['SpanishWords'],
				options: {
					spawn: false
				}
			},
			frenchWords: {
				files: ['src/FrenchWords.js'],
				tasks: ['FrenchWords'],
				options: {
					spawn: false
				}
			},
		}

	});

	// load grunt plugins
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// define tasks
	// grunt.registerTask('greekKeyboard', ['babel']);
	// grunt.registerTask('LatinWords', ['babel:latinWords']);
  grunt.registerTask('LatinWords', ['babel']);
  grunt.registerTask('SpanishWords', ['babel']);
  grunt.registerTask('FrenchWords', ['babel']);
};

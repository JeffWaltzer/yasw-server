module.exports = function(grunt) {
  grunt.initConfig({

    jasmine_node: {
      useHelpers: true,
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec',
        jUnit: {
          report: false,
          savePath: "./build/reports/jasmine/",
          useDotNotation: true,
          consolidate: true
        }
      },
        all: {specNameMatcher: ['spec/obj/*_spec.js', 'spec/new/*_spec.js']},
      quick: {specNamMatcher: 'spec/obj/vector_spec.js'}
    },

    jshint: {
      all: ['src/**/*.js'],
      options: {
        // globals: {
        //   _: false
        // },
        browser: true,
        devel: true,
        reporterOutput: ""
      }
    },

    clean: {
      release: {
        options: {force: true},
        src: ['public']
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['jshint', 'jasmine_node:all']);
  grunt.registerTask('quick',   ['jshint', 'jasmine_node:quick']);
};

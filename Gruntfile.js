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
        all: {specNameMatcher: 'spec/**/*_spec.js'}
    },

    jshint: {
      all: ['src/**/*.js'],
      options: {
        browser: true,
        devel: true,
        reporterOutput: "",
        esversion: 6
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

  grunt.registerTask('default', ['jshint', 'jasmine_node:all']);
};

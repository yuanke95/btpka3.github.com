module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-usemin');

  // Default task.
  grunt.registerTask('default', [
    'clean',
    'copy',

    'htmlmin',
    'html2js',
    'concat',
    'uglify',

    'less',
    'cssmin'

  ]);


  // Project configuration.
  grunt.initConfig({
      distdir: 'dist',

      pkg: grunt.file.readJSON('package.json'),

      banner: '' +
      '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
      ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',

      clean: {
        asserts: {
          src: ["target/dist/assert/"]
        },
        css: {
          src: ["target/dist/css/"]
        },
        html: {
          src: ["target/dist/html/"]
        },
        lib: {
          src: ["target/dist/lib/"]
        },
        appJs: {
          src: [
            "target/dist/js/<%= pkg.name %>.app*.js"
          ]
        },
        viewsJs: {
          src: [
            "target/dist/js/<%= pkg.name %>.views*.js"
          ]
        },
        allJs: {
          src: [
            "target/dist/js/<%= pkg.name %>.all*.js"
          ]
        },
        index: {
          src: ["target/dist/index.html"]
        }
      },

      copy: {
        assets: {
          files: [
            {
              expand: true,
              cwd: 'src/assets/',
              dest: 'target/dist/assets',
              src: '**'
            }
          ]
        },
        html: {
          files: [
            {
              expand: true,
              cwd: 'src/html/',
              dest: 'target/dist/html',
              src: '**'
            }
          ]
        },
        lib: {
          files: [
            {
              expand: true,
              cwd: 'src/lib/',
              dest: 'target/dist/lib',
              src: '**'
            }
          ]
        }
      },

      htmlmin: {
        views: {
          options: {
            removeComments: true,
            collapseWhitespace: true
          },
          files: [{
            expand: true,
            cwd: 'src/app/views',
            src: '**/*.html',
            dest: 'target/work/htmlmin.views'
          }]
        },
        index: {
          options: {
            removeComments: true,
            collapseWhitespace: true
          },
          files: [{
            expand: true,
            cwd: 'src',
            src: 'index.html',
            dest: 'target/dist/'
          }]
        }
      },

      html2js: {
        viewsJs: {
          options: {
            base: 'target/work/htmlmin.views'
          },
          src: ['target/work/htmlmin.views/**/*.html'],
          dest: 'target/dist/<%= pkg.name %>.views.js',
          module: '<%= pkg.name %>.views'
        }
      },

      concat: {
        appJs: {
          src: [
            'src/app/app.js',
            'src/app/services/*.js',
            'src/app/controllers/*.js'
          ],
          dest: 'target/dist/<%= pkg.name %>.app.js'
        },

        allJs: {
          options: {
            banner: "<%= banner %>"
          },
          src: [
            'target/dist/<%= pkg.name %>.app.js',
            'target/dist/<%= pkg.name %>.views.js'
          ],
          dest: 'target/dist/<%= pkg.name %>.all.js'
        }
      },

      uglify: {
        appJs: {
          options: {
            banner: "<%= banner %>",
            sourceMap: true,
            sourceMapName: function (path) {
              return path.replace(/\.js$/, ".map")
            }
          }
          ,
          src: 'target/dist/<%= pkg.name %>.app.js',
          dest: 'target/dist/<%= pkg.name %>.app.min.js'
        },
        viewJs: {
          options: {
            banner: "<%= banner %>",
            sourceMap: true,
            sourceMapName: function (path) {
              return path.replace(/\.js$/, ".map")
            }
          }
          ,
          src: 'target/dist/<%= pkg.name %>.view.js',
          dest: 'target/dist/<%= pkg.name %>.view.min.js'
        },
        allJs: {
          options: {
            banner: "<%= banner %>",
            sourceMap: true,
            sourceMapName: function (path) {
              return path.replace(/\.js$/, ".map")
            }
          }
          ,
          src: 'target/dist/<%= pkg.name %>.all.js',
          dest: 'target/dist/<%= pkg.name %>.all.min.js'
        }
      },

      less: {
        css: {
          options: {
            strictMath: true,
            sourceMap: true,
            outputSourceFiles: true,
            sourceMapURL: '<%= pkg.name %>.css.map',
            sourceMapFilename: 'target/dist/css/<%= pkg.name %>.css.map'
          }
          ,
          src: 'src/css/index.less',
          dest: 'target/dist/css/<%= pkg.name %>.css'
        }
      },

      cssmin: {
        options: {
          shorthandCompacting: false,
          roundingPrecision: -1
        },
        css: {
          files: [{
            expand: false,
            src: 'target/dist/css/<%= pkg.name %>.css',
            dest: 'target/dist/css/<%= pkg.name %>.min.css'
          }]
        }
      },

      watch: {
        assets: {
          files: ['src/assets/**/*'],
          tasks: ['clean:assets', 'copy:assets']
        },
        css: {
          files: 'src/css/**/*',
          tasks: ['less:css', 'cssmin:css']
        },
        appJs: {
          files: ['src/app/**/*.js'],
          tasks: ['jshint:appJs',
            'clean:appJs', 'concat:appJs', 'uglify:appJs',
            'clean:allJs', 'concat:allJs', 'uglify:allJs'
          ]
        },
        viewsJs: {
          files: 'src/app/views/**/*.html',
          tasks: ['clean:viewJs', 'htmlmin:views', 'html2js:viewsJs',
            'clean:allJs', 'concat:allJs', 'uglify:allJs'
          ]
        },
        index: {
          files: 'src/index.html',
          tasks: ['clean:index', 'htmlmin:index']
        }
      },

      jshint: {
        appJs: {
          files: [
            'src/app/**/*.js'
          ],
          options: {
            curly: true,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            boss: true,
            eqnull: true,
            globals: {}
          }
        }
      }
    }
  );
};
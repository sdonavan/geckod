var Vulcanize = require('vulcanize')
var fs = require('fs')
var path = require('path')



module.exports = function(grunt)
{
    // Project configuration.
    grunt.initConfig(
    {
        pkg: grunt.file.readJSON('package.json'),

        copy:
        {
            files:
            {
                cwd: 'ui',  // set working folder / root to copy
                src: '**/*',           // copy all files and subfolders
                dest: 'build',    // destination folder
                expand: true           // required when using cwd
            }
        },

        uglify:
        {
            default:
            {
                files:
                [{
                    expand: true,
                    cwd: 'ui',
                    src: '**/*.js',
                    dest: 'build'
                }]
            }
        },

        minifyPolymer:
        {
            default:
            {
                files:
                [{
                    expand: true,
                    cwd: 'ui/',
                    src: ['**/*.html'],
                    dest: 'build/'
                }]
            }
        },

        minifyPolymerCSS:
        {
            default:
            {
                files:
                [{
                    expand: true,
                    cwd: 'ui/',
                    src: ['**/*.css'],
                    dest: 'build/'
                }]
            }
        },

        compress:
        {
            main:
            {
            options:
            {
                mode: 'gzip'
            },
                expand: true,
                cwd: 'ui/',
                src: ['index.html'],
                dest: 'build/'
            }
        }
    })

    grunt.task.registerTask('redeployDatabase', "Redeploy the database", function()
    {
        require('./server/backend/import')
    })


    grunt.task.registerTask('vulcanizeIndex', 'Vulcanize index', function(arg1, arg2)
    {
        var done = this.async()

        var indexVulcan = new Vulcanize(
        {
            inlineScripts: true,
            inlineCss: true,
            implicitStrip: true,
            stripComments: false,
            //excludes: [new RegExp('\/bower_components\/')]
        })

        var fileName = __dirname + '/build/' + 'index.html'
        indexVulcan.process(fileName, function(err, inlinedHtml)
        {
            console.log("Vulcanizing index")
            fs.writeFile(fileName, inlinedHtml, function(err)
            {
                console.log(err)
                done()
            })
        })
    })

    grunt.task.registerTask('vulcanizer', 'A sample task that logs stuff.', function(arg1, arg2)
    {
        var done = this.async()

        function getDirectories(srcpath)
        {
          return fs.readdirSync(srcpath).filter(function(file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
          })
        }


        var components = getDirectories(__dirname + '/build/components/')

        components.forEach(function(dir)
        {
            var vulcan = new Vulcanize(
            {
                inlineScripts: true,
                inlineCss: true,
                implicitStrip: true,
                stripComments: false,
                excludes: [new RegExp('\/bower_components\/')]
            })

            var fileName = __dirname + '/build/components/' + dir + '/' + dir + '.html'

            vulcan.process(fileName, function(err, inlinedHtml)
            {
                fs.writeFile(fileName, inlinedHtml, function(err)
                {

                })
            })
        })
    })

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-minify-polymer')
    grunt.loadNpmTasks('grunt-contrib-uglify')

    // Default task(s).
    grunt.registerTask('default', ['redeployDatabase',
                                   'copy',
                                   'minifyPolymer',
                                   'minifyPolymerCSS',
                                   'uglify',
                                   'vulcanizeIndex'])

}

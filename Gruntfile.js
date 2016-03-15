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


        cssmin:
        {
            target:
            {
                files:
                [{
                    expand: true,
                    cwd: 'ui',
                    src: '*.css',
                    dest: 'build'
                }]
            }
        }
    })

    grunt.task.registerTask('redeployDatabase', "Redeploy the database", function()
    {
        var done = this.async();

        try
        {
            var updateDatabase = require('./server/backend/import')
            updateDatabase(done)
        }
        catch (e)
        {
            console.log(e)
        }
    })


    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-uglify')

    // Default task(s).
    grunt.registerTask('default', ['redeployDatabase',
                                   'copy',
                                   'cssmin'])

}

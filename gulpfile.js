var gulp      = require('gulp')
var vulcanize = require('gulp-vulcanize')
var minifyCss = require('gulp-minify-css')
var gzip      = require('gulp-gzip')


gulp.task('default', function()
{
    gulp.start('copy', 'styles')
})

gulp.task('copy', function()
{
    return gulp.src(['ui/**/*']).pipe(gulp.dest('build'))
})

gulp.task('styles', ['copy'], function()
{
  return gulp.src('ui/**/*.css')
    .pipe(minifyCss({}))
    .pipe(gulp.dest('build'));
})

gulp.task('gzip', ['copy', 'styles'], function()
{
    gulp.src('ui/**/*.css')
        .pipe(gzip({ append: false }))
        .pipe(gulp.dest('build'))
})

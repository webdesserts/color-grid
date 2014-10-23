'use strict';

var gulp = require('gulp')
var g = require('gulp-load-plugins')()
var series = require('run-sequence')
var _ = require('lodash')

var browserSync = require('browser-sync')
var reload = browserSync.reload

gulp.task('jscs', function() {
  return gulp.src(['public/assets/scripts/**/*.js', '!public/assets/scripts/vendor/**/*'])
    .pipe(g.jscs())
    .on('error', warn)
})

gulp.task('test', function() {
  return gulp.src('test/runner.html')
    .pipe(g.mochaPhantomjs({reporter:'spec'}))
    .on('error', warn)
})

/**
 * $ gulp scripts
 * description: jscs your javascript
 */

gulp.task('scripts', function(done) {
  series('test','jscs','scripts:reload', done)
})

gulp.task('scripts:reload', function() {
  return gulp.src([ 'public/assets/scripts/**/*.js'])
  .pipe(reload({stream: true}))
  .pipe(g.size({title: 'js'}))
})

/**
 * $ gulp styles
 * description: compile stylus and prefix everything
 */

gulp.task('styles', function() {
  return gulp.src(['public/assets/styles/*.styl'])
  .pipe(g.plumber())
  .pipe(g.stylus())
  .pipe(g.plumber.stop())
  .pipe(gulp.dest('public/assets/styles'))
  .pipe(reload({stream: true}))
  .pipe(g.size({title: 'css'}))
})

/**
 * $gulp html
 * description: not really useful via commandline, currently only reloads html
 * while the server is up.
 */

gulp.task('html', function() {
  return gulp.src('public/**/*.html')
  .pipe(reload({stream: true}))
})

/**
 * $ gulp
 * description: start the development environment
 */

gulp.task('default', ['styles', 'scripts'], function() {
  browserSync.init({
    proxy: 'localhost:8080',
    logConnections: false,
    debugInfo: false,
    open: false,
    ghostMode: { location: true },
    //tunnel: 'colorgrid',
  })
  g.nodemon({script: 'server.js', ignore: ['public/**/*', 'Gulpfile.js']})
  gulp.watch('test/**/*.spec.js', ['test'])
  gulp.watch('public/assets/styles/**/*.styl', ['styles'])
  gulp.watch('public/assets/scripts/**/*.js', ['scripts'])
  gulp.watch('public/**/*.html', ['html'])
})

function handleError (stream, done) {
  var err
  stream.on('error', function(error) { err = error })
  stream.on('error', warn)
  stream.on('end', function() {
    done(err)
  })
}

function warn(err) {
  console.warn(err.message)
  this.emit('end')
}

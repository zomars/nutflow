const gulp = require('gulp')
const browserSync = require('browser-sync')
const config = require('../config')

var reload = browserSync.reload

// Watch for file changes
gulp.task('watch', function () {
  // Watch assets
  gulp.watch(config.sass.watchSrc, {cwd: config.sass.cwd}, ['sass'])

  // Watch site generators
  gulp.watch(config.templates.watch, ['site-watch'])
})

// Slow watch tasks
gulp.task('site-watch', ['templates'], reload)


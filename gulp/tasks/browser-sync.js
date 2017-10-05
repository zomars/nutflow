const gulp = require('gulp')
const browserSync = require('browser-sync')
const config = require('../config')

gulp.task('browserSync', function () {
  browserSync(config.browserSync)
})


const gulp = require('gulp')
const config = require('../config')
const del = require('del')

gulp.task('clean', () => {
  return del.sync([config.dest + '/**/*'])
})


const gulp = require('gulp')
const config = require('../config')
const plugins = require('gulp-load-plugins')
const $ = plugins()

gulp.task('configs', () => {
  return gulp.src(config.configs.src)
    .pipe($.if(`*${config.env}.yml`, $.rename('config_local.yml')))
    .pipe(gulp.dest(config.configs.dest))
})

const gulp = require('gulp')
const plugins = require('gulp-load-plugins')
const config = require('../config')
const $ = plugins()

gulp.task('images', () => {
  return gulp.src(config.images.src)
  .pipe($.if(config.env === 'prod', $.cache($.imagemin(config.images.opts))))
  .pipe(gulp.dest(config.images.dest))
  .pipe($.size({'title': 'images'}))
})

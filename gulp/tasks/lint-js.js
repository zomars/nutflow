const gulp = require('gulp')
const plugins = require('gulp-load-plugins')
const plumber = require('../custom_modules/plumber')
const $ = plugins()

gulp.task('lint:js', () => {
  return gulp.src('src/js/**/*.js')
  .pipe(plumber('Error Linting JS'))
  .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail', {
      ignoreWarning: true,
      ignoreInfo: true
    }))
    .pipe($.jscs({
      fix: true,
      configPath: '.jscsrc'
    }))
    .pipe(gulp.dest('src/js'))
})


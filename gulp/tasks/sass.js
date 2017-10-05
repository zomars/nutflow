const gulp = require('gulp')
const plugins = require('gulp-load-plugins')
const browserSync = require('browser-sync')
const config = require('../config')
const plumber = require('../custom_modules/plumber')
const $ = plugins()

gulp.task('sass', () => {
  return gulp.src(config.sass.src)
    .pipe(plumber('Error Running Sass'))
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError())
    .pipe($.sourcemaps.init())
    .pipe($.sass(config.sass.opts))
    .pipe($.autoprefixer(config.autoprefixer))
    .pipe($.sourcemaps.write())
    .pipe($.size({'title': 'styles'}))
    .pipe($.if(config.env === 'prod', $.if('*.css', $.cache($.cssnano()))))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.reload({
      stream: true
    }))
})

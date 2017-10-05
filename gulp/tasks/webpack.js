const gulp = require('gulp')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const browserSync = require('browser-sync')
const plugins = require('gulp-load-plugins')
const $ = plugins()

// const configs
const config = require('../config')
const plumber = require('../custom_modules/plumber')

gulp.task('webpack', function () {
  return gulp.src(config.webpack.src)
    .pipe(plumber('Error Running Webpack'))
    .pipe(webpackStream(config.webpack.options, webpack))
    .pipe($.if('*.js', $.if(config.env === 'prod', $.cache($.uglify()))))
    .pipe(gulp.dest(config.webpack.dest))
    .pipe(browserSync.reload({
      stream: true
    }))
})

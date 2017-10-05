const gulp = require('gulp')
const runSequence = require('run-sequence')
const config = require('../config')

gulp.task('default', (cb) => {
  if (config.env === 'dev') {
    runSequence(
      ['configs'],
      ['clean', 'lint:js'],
      ['images', 'svg', 'fonts'],
      ['sass', 'templates'],
      ['server'],
      ['browserSync', 'webpack', 'watch'],
      cb)
  } else if (config.env === 'prod') {
    runSequence(
      ['configs'],
      ['lint:js'],
      ['images', 'svg', 'fonts', 'webpack'],
      ['sass', 'templates'],
      cb
    )
  }
})

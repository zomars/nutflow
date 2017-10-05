const gulp = require('gulp')
const config = require('../config')

gulp.task('fonts', () => {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest))
})


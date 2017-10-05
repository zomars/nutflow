const gulp = require('gulp')
const config = require('../config')

gulp.task('templates', () => {
  return gulp.src(config.templates.src)
    .pipe(gulp.dest(config.templates.dest))
})


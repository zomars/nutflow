const gulp = require('gulp')
var exec = require('child_process').exec

gulp.task("server", function(cb) {
  var child = exec("php www/app/nut server:run")

  child.stdout.on('data', function(data) {
    console.log('stdout: ' + data)
    if(data.includes('[OK] Server running')) {
      console.log('Server initialization completed')
      return cb()
    }
  })

  child.stderr.on('data', function(data) {
    console.log('stderr: ' + data)
  })

  child.on('close', function(code) {
    console.log('closing code: ' + code)
  })
})
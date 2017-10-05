const gulp = require('gulp')
const fs = require('fs')
const plugins = require('gulp-load-plugins')
const rsync = require('rsyncwrapper')
const exec = require('shelljs').exec
const yaml = require('js-yaml')
const $ = plugins()

// const config
const config = require('../config')

// Deployment tasks
if (!process.env.CI) {
  var deployConfig = yaml.safeLoad(fs.readFileSync('./config/deploy.yml', 'utf8')) || {}
  var deploy = deployConfig[config.deploy.target].options

  gulp.task('deploy', () => {
    var deployMethod = config.deploy.method
    gulp.src(config.deploy.src)
      .pipe($.rename('.deploy.yml'))
      .pipe(gulp.dest(config.deploy.dest))
    gulp.start('deploy-' + deployMethod)
  })
}

gulp.task('deploy-rsync', () => {
  rsync({
    src: 'www/',
    dest: `${deploy.username}@${deploy.host}:${deploy.root}`,
    ssh: true,
    recursive: true,
    // deleteAll: true,
    args: [
      '--verbose',
      '--filter=":- .gitignore"'
    ]

  }, (error, stdout, stderr, cmd) => {
    if (error) {
      console.log(error.message)
      console.log(stdout)
      console.log(stderr)
    } else {
      console.log(stdout)
      gulp.start('composer')
    }
  })
})

gulp.task('deploy-simple', (cb) => {
  const child = exec(`php www/app/nut setup:deploy -n ${config.deploy.target}`)

  child.stdout.on('data', (data) => {
    console.log('stdout: ' + data)
    if (data.includes('[OK] Deployment to')) {
      console.log('Server initialization completed')
      return cb()
    }
  })

  child.stderr.on('data', (data) => {
    console.log('stderr: ' + data)
  })

  child.on('close', (code) => {
    console.log('closing code: ' + code)
  })
})

gulp.task('composer', (cb) => {
  const child = exec(`ssh ${deploy.username}@${deploy.host} composer update -d ${deploy.root}`)

  child.stdout.on('data', (data) => {
    console.log('stdout: ' + data)
    if (data.includes('Installing bolt_assets to')) {
      console.log('Server initialization completed')
      return cb()
    }
  })

  child.stderr.on('data', (data) => {
    console.log(data)
  })

  child.on('close', (code) => {
    console.log('closing code: ' + code)
  })
})

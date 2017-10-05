const webpackConfig = require('../webpack.conf')
const environment = require('../env')

var env = environment.env
var src = environment.src
var dest = environment.dest
var target = environment.target

var config = {
  env: env,
  src: src,
  dest: dest,
  target: target,

  autoprefixer: {
    browsers: ['last 2 versions']
  },

  browserSync: {
    proxy: '0.0.0.0:8000',
    open: false
  },

  configs: {
    src: [
      './config/**/*.yml',
      '!./config/deploy.yml',
      env === 'prod' ? '!./config/config_local_dev.yml' : '!./config/config_local_prod.yml'
    ],
    dest: './www/app/config'
  },

  deploy: {
    method: 'rsync', // rsync, aws or ghpages
    target: target,
    src: './config/deploy.yml',
    dest: './www/'
  },

  fonts: {
    src: src + '/fonts/**/*',
    dest: dest + '/fonts'
  },

  images: {
    src: [
      src + '/images/**/*.{png,jpeg,jpg,gif,svg}',
      '!' + src + '/images/sprites/*'
    ],
    dest: dest + '/images',
    opts: {
      interlaced: true,
      optimizationLevel: 5,
      progressive: true
    }
  },

  phpServer: {
    base: './www/public/'
  },

  sass: {
    src: src + '/scss/**/*.{scss,sass}',
    watchSrc: 'scss/**/*.{scss,sass}',
    cwd: src,
    dest: dest + '/css',
    opts: {
      includePaths: [
        src + '/bower_components',
        './node_modules'
      ]
    }
  },

  svg: {
    src: src + '/svg/**/*',
    dest: dest,
    opts: {
      mode: {
        symbol: true
      }
    }
  },

  templates: {
    src: src + '/templates/**/*',
    dest: dest + '/',
    watch: [
      src + '/templates/**/**'
    ],
  },

  webpack: Object.assign(webpackConfig, {
    src: src + '/js/main.js',
    dest: dest + '/js'
  })

}

module.exports = config

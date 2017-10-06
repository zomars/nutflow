const minimist = require('minimist')
const processArgs = minimist(process.argv)

var src = './src'
var dest = './www/public/theme/base-inuitcss_dev'
var env = 'dev'
var target = 'staging'
var proxy  = null;

if (processArgs.prod || processArgs.production) {
  dest = './www/public/theme/base-inuitcss'
  env = 'prod'
  target = 'production'
}

module.exports = {
  env: env,
  src: src,
  dest: dest,
  target: target
}

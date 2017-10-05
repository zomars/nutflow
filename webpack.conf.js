const environment = require('./env')
const BowerWebpackPlugin = require('bower-webpack-plugin')
const env = environment.env

module.exports = {
  options: {
    watch: env !== 'prod',
    output: {
      filename: '[name].js',
      pathinfo: true
    },
    resolve: {
      root: [
        './src/bower_components/'
      ]
    },
    devtool: env !== 'prod' ? '#source-map' : null,
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }],
      plugins: [new BowerWebpackPlugin()]
    }
  }
}

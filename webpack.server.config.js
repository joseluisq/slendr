const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  debug: true,
  watch: true,
  devtool: 'source-inline-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
        query: {
          presets: 'es2015'
        }
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!sass?sourceMap'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}

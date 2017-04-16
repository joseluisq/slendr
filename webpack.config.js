const { resolve } = require('path')
const pkg = require('./package.json')
const Webpack = require('webpack')
const UglifyJsPlugin = Webpack.optimize.UglifyJsPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ENV = process.env.NODE_ENV
const PORT = process.env.APP_PORT || 8080
let outputFile = pkg.name

const config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [ 'eslint-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [ resolve('node_modules') ],
        use: { loader: 'babel-loader' }
      }
    ]
  },
  plugins: []
}

if (ENV === 'development') {
  config.devtool = '#eval'

  config.entry = [
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    resolve('app/app.js')
  ]

  config.node = { fs: 'empty' }

  config.devServer = { hot: true, port: PORT, contentBase: resolve('app') }

  config.module.rules.push({
    test: /\.scss$/,
    loaders: [
      'style-loader',
      'css-loader?sourceMap',
      'postcss-loader?sourceMap=inline',
      'sass-loader?sourceMap'
    ]
  })
  config.module.rules.push({ test: /\.html$/, loader: 'html-loader' })

  config.plugins.push(new Webpack.HotModuleReplacementPlugin())

  config.plugins.push(new HtmlWebpackPlugin({
    template: resolve('app/index.html')
  }))
}

if (ENV !== 'development') {
  config.entry = resolve('src/index.js')

  if (ENV === 'min') {
    config.plugins.push(new UglifyJsPlugin({ minimize: true }))
    outputFile = `${outputFile}.min`
  }

  config.plugins.push(new Webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEVTOOLS__: false
  }))

  config.output = {
    path: resolve('dist'),
    filename: `${outputFile}.js`,
    library: pkg.library,
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
}

module.exports = config

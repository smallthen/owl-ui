const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common.config.js')
const config = require('../config')
const utils = require('./utils')

const configuration = merge(commonConfig, {
  devtool: 'inline-source-map',
  entry: {
    app: './examples/main',
    vendors: ['vue', 'vue-router']
  },
  output: {
    path: path.join(__dirname, '../examples/dist'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  devServer: {
    host: config.dev.host,
    port: config.dev.port,
    publicPath: '/',
    noInfo: true
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  }
})

configuration.plugins = configuration.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    filename: path.join(__dirname, '../examples/dist/index.html'),
    template: path.join(__dirname, '../examples/index.html'),
    inject: true
  })
])

module.exports = configuration
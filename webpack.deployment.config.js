const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: [
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'prod'),
    filename: 'bundle.js',
    publicPath: '/prod'
  },
  module: {
    loaders:[{
      test: /.jsx?$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'server'),
      exclude: '/node_modules/',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
};
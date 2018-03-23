
const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: {
    index: './source/assets/src/index.js',
    top: './source/assets/src/top.js'
  },
  output: {
    path: path.join(__dirname, 'source/assets/js'),
    filename: '[name].js'
  },

  plugins: [
     //new webpack.optimize.UglifyJsPlugin()
  ],
  
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
    
  },
  resolve: {
    extensions: ['.js'],

    alias: {
      'vue$': 'vue/dist/vue.esm.js'

    }
  }
};

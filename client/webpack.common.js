var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      }, {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader?name=assets/[name].[ext]',
          },
        ],
      },
    ]
  },
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve('./build/'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      favicon: './public/favicon.ico',
      template: './public/index.html',
      filename: 'index.html'
    })
  ],
};

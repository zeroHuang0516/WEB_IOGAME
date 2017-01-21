const path = require('path');
const webpack = require('webpack');

const phaserModulePath = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModulePath, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModulePath, 'build/custom/pixi.js');
const p2 = path.join(phaserModulePath, 'build/custom/p2.js');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/,
      },
      {
        test: /pixi\.js/,
        loader: 'expose?PIXI',
      },
      {
        test: /phaser-split\.js$/,
        loader: 'expose?Phaser',
      },
      {
        test: /p2\.js/,
        loader: 'expose?p2',
      },
    ]
  },
  resolve: {
    alias: {
      phaser,
      pixi,
      p2,
    }
  }
};

var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path              = require('path');

var exclude = /node_modules/;

module.exports = {
  entry: {app: path.join(__dirname, 'src', 'app.js')},
  output: {
    path:     path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: exclude, loader: 'babel'},
      {test: /\.jsx$/, exclude: exclude, loaders: ['jsx', 'babel']},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less')},
      {test: /\.woff2?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf$/,  loader: 'file'},
      {test: /\.eot$/,  loader: 'file'},
      {test: /\.svg$/,  loader: 'file'}
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', {allChunks: true})
  ]
};

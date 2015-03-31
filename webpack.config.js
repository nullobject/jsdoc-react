var path              = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      {test: /\.jsx$/, exclude: /node_modules/, loaders: ['jsx', 'babel']},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less')},
      {test: /\.woff$/, loader: 'url?limit=10000&minetype=application/font-woff'},
      {test: /\.ttf$/,  loader: 'file'},
      {test: /\.eot$/,  loader: 'file'},
      {test: /\.svg$/,  loader: 'file'}
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', {allChunks: true})
  ]
};

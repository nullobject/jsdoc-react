var path              = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
  entry: {app: path.join(__dirname, 'src', 'app.js')},
  output: {
    path:     path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')},
      {test: /\.jsx$/,  loader: 'jsx-loader'},
      {test: /\.woff$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
      {test: /\.ttf$/,  loader: 'file-loader'},
      {test: /\.eot$/,  loader: 'file-loader'},
      {test: /\.svg$/,  loader: 'file-loader'}
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', {allChunks: true})
  ]
}];

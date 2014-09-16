var webpack           = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

plugins = [
  new webpack.DefinePlugin({
    DEVELOPMENT: process.env.NODE_ENV === 'development' || true,
    PRODUCTION:  process.env.NODE_ENV === 'production' || false
  }),
  new ExtractTextPlugin('style.css', {allChunks: true})
];


module.exports = {
  entry: './src/main.js',
  output: {
    path:          './build',
    filename:      '[name].js',
    libraryTarget: 'commonjs2'
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
  plugins: plugins
};

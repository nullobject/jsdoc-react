const ExtractTextPlugin = require('extract-text-webpack-plugin')

const exclude = /node_modules/

module.exports = {
  entry: {app: __dirname + '/src/app.js'},
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: exclude, use: 'babel-loader'},
      {test: /\.jsx$/, exclude: exclude, use: ['jsx-loader', 'babel-loader']},
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'less-loader'],
          fallback: 'style-loader'
        })
      },
      {test: /\.woff2?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf$/, use: 'file-loader'},
      {test: /\.eot$/, use: 'file-loader'},
      {test: /\.svg$/, use: 'file-loader'}
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', {allChunks: true})
  ]
};

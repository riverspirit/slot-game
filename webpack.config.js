const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/public/js/app.js'],
  output: {
    path: path.resolve(__dirname, 'src', 'public', 'build'),
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
      },
    }],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};

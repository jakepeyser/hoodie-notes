const webpack = require('webpack');

// Init common paths used by config
const path = require('path');
const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public'),
  stylesheets: path.join(__dirname, 'src/style', 'style.scss')
};

// Standard build artifacts for all envs
module.exports = {
  entry: {
    app: PATHS.app,
    style: PATHS.stylesheets
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    rules: [
      { // Convert React code into vanilla ES5
        test: /jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { // Transpile SASS and load CSS
        test: /\.s?css$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
        include: PATHS.stylesheets
      },
      { // Transfer static files to build
        test: /\.(png)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
      { // Inline SVGs where required in components
        test: /\.svg$/,
        use: [
          'babel-loader',
          'svg-react-loader'
        ]
      }
    ]
  }
}

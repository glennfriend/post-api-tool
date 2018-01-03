const webpack           = require("webpack");
const LiveReload        = require("webpack-livereload-plugin");
const UglifyJsPlugin    = require('uglifyjs-webpack-plugin');
const config            = require("./config.js");
const buildPath         = "./public/dist";

// --------------------------------------------------------------------------------
//  start
// --------------------------------------------------------------------------------
module.exports = {
  entry: {
    'app': [
        './src/index.js',
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    public: config.host,
    hot: true,
    port: 8080,
    inline: true,
    compress: true,
    https: config.is_ssl,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
  },
  module: {
    rules: [
      //
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      // yarn add --dev css-loader style-loader
      {
        test: /\.css$/,
        use: [
            {loader: "style-loader"},   // creates style nodes from JS strings
            {loader: "css-loader"}      // translates CSS into CommonJS
        ]
      }
    ]
  },
  plugins: [
    new LiveReload(),
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        sourceMap: false
      }
    }),
  ],
  output: {
    filename: buildPath + '/[name].js',
    publicPath: config.host_url,
  }
};
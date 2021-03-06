var webpack = require("webpack");
module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname + '/builds',
    filename: "bundle.js",
    publicPath: "/builds/"
  },
  module: {
    loaders: [
        {
            test: /\.js?$/,
            exclude: /node_modules/,
            loaders: ["babel"],
            include: __dirname
        },
        {
            test: /\.css$/,
            loader: 'style!css'
        },
        {
            test: /\.woff$/,
            loader: 'url'
        }
    ]
  }
}

const { resolve, join } = require("path");
const Webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const paths = require("./paths");

const resolvedPath = fileOrDir => resolve(__dirname, fileOrDir);
const mode = process.env.NODE_ENV;
const devMode = mode === "development";

console.log({ devMode });

const config = {
  mode,

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {}
        }
      })
    ]
  },

  context: resolvedPath(paths.source),

  entry: {
    index: `./${paths.js}/main.js`
  },

  output: {
    path: resolvedPath(paths.dest),
    filename: `${paths.js}/app.js`
  },

  resolve: {
    extensions: ["*", ".mjs", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: devMode,
              localIdentName: "[local]"
            }
          }
        ]
      }
    ]
  },

  devServer: {
    contentBase: "public",
    historyApiFallback: true
  },

  watchOptions: {
    ignored: /node_modules/
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "stylesheets/app.css"
    })
  ],

  devtool: devMode ? "#cheap-module-eval-source-map" : false
};

if (devMode) {
  // Force webpack-dev-middleware to write files to the disk for metalsmith
  config.plugins.push(
    new WriteFilePlugin({
      log: false
    })
  );
}

module.exports = config;

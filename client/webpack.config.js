const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const CleanPlugin = new CleanWebpackPlugin({
  verbose: true,
  dry: false,
});

const HtmlPlugin = new HtmlWebpackPlugin({
  template: "./public/index.html",
});

const MinifyHtml = new HtmlWebpackPlugin({
  template: "./public/index.html",
  minify: {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    removeComments: true,
  },
});

const CssPlugin = new MiniCssExtractPlugin({
  filename: "[name].[chunkhash].css",
});

const MinifyCss = new OptimizeCssAssetsPlugin();

const MinifyJs = new TerserPlugin();

const devSetting = {
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/",
    // publicPath: "/dist",
  },
  mode: "development",

  devtool: "eval-cheap-module-source-map",
  // devtool: "eval",

  devServer: {
    hot: true,
    // watchContentBase: true,
    historyApiFallback: true,
    port: 8080,
    // https: true,

    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
  plugins: [CssPlugin, HtmlPlugin],
};

const prodSetting = {
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].[chunkhash].bundle.js",
    chunkFilename: "[name].[chunkhash].bundle.js",
    publicPath: "/",
    // publicPath: "/dist",
  },
  optimization: {
    minimizer: [MinifyCss, MinifyJs, MinifyHtml],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
  },
  mode: "production",
  plugins: [CssPlugin, CleanPlugin],
};

module.exports = (env) => {
  let modeSetting;
  if (env.production) {
    console.log("In Prod");
    console.log(env);
    modeSetting = prodSetting;
  } else {
    console.log("In Dev");
    console.log(env);
    modeSetting = devSetting;
  }
  let tempPlugins = modeSetting.plugins;
  modeSetting.plugins = [
    ...tempPlugins,
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(env.API_URL),
    }),
  ];
  return {
    ...modeSetting,
    entry: "./src/index.js",

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          // use: [MiniCssExtractPlugin.loader, "css-loader"],
          use: ["style-loader", "css-loader"],
        },

        { test: /\.html$/, use: ["html-loader"] },
        {
          test: /\.(svg|png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name]-[hash].[ext]",

                outputPath: "assets",
              },
            },
            {
              loader: ImageMinimizerPlugin.loader,
              options: {
                severityError: "warning",
                minimizerOptions: {
                  plugins: ["gifsicle", "jpegtran", "optipng", "svgo"],
                },
              },
            },
          ],
        },
      ],
    },
  };
};

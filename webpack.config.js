const path = require("path");
// const workboxPlugin = require("workbox-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Output Management",
      template: "./public/index.html",
    }),
    // new workboxPlugin.InjectManifest({
    //   swSrc: path.resolve(__dirname, "src") + "/serviceWorker.js",
    //   swDest: "sw.js",
    // }),
  ],
};

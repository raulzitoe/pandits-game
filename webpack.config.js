var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/js/main.js",

  output: {
    path: __dirname + "./dist",
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
        parser: {
          presets: ["es2015"],
        },
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style" },
          { loader: "css" },
          { loader: "less" },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        include: /img/,
        use: { loader: "url" },
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: "src/index.html", to: "index.html"}] }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/vendors/phaser.min.js", to: "vendors/phaser.min.js" }],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
  ],

  resolve: {
    extensions: ["", ".js", ".jsx"],
  },

  devServer: {
    static: "./dist",
    port: 5000,
  },
  mode: 'development'
};

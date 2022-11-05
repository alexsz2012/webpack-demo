let path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/bundle.[hash:8].js',
    path: path.resolve("dist"),
    // publicPath: "http://cdn/xxx"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }), // 应用html模版
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ // css提取公共
      filename: 'css/main.css'
    }),
  ],

  module: {
    rules: [
      {
        test: "/\.js$/",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"]
          },
        },
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },
      // {
      //   test: "/\.css$/",
      //   use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      // },
      // {
      //   test: "/\.less$/",
      //   use: ["style-loader", "css-loader", "less-loader"]
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
    ]
  },
  externals: { // 防止将某些包打到 bundle 文件
    jquery: "jQuery"
  },
  resolve: { //常用属性配置
    modules: [path.resolve("node_modules")], //解析时候路径寻找，
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    mainFields: ["browser", "module", "main"],
    extensions: [".js", ".json", ".vue", ".less"],
  },
}
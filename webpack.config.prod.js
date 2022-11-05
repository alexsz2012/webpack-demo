const base = require("./webpack.config.base");
const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(base, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [ // 生产环境 css压缩，js压缩 
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  },
})
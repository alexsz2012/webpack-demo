const base = require("./webpack.config.base.js");
const { merge } = require("webpack-merge");
module.exports = merge(base, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: { //server 配置
    port: 5001,
    compress: true,
    open: true,
    client: { progress: true },
    proxy: {
      "/api": {
        target: "",
        pathRewrite: {
          api: ""
        }
      }
    }
  },

  // 监听文件变化
  watch: true,
  watchOptions: {
    poll: 1000, //每秒检查一次变动
    aggregateTimeout: 600, // 防抖
    ignored: /node_modules/,
  },

  // 添加缓存
  cache: {
    type: "filesystem"
  },
})
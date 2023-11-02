const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require("terser-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  configureWebpack: (config) => {
    config.output.filename = "js/[name].[contenthash:8].js";
    config.mode = "development";
    config.devtool = "source-map";
    config.optimization = {
      minimize: true,
      minimizer: [new TerserPlugin({
        terserOptions: {
          ecma: 6,
          compress: {},
          output: {}
        }
      })],
      splitChunks:{
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
        },
      },
    }
    }
  }
})

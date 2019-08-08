/**
 * 所有webpack配置写在这里
 *
 */

module.exports = {
  publicPath: "./",
  devServer: {
    proxy: {
      "/req": {
        target: "http://fapi.mimanduo.xyz/",
        // ws: true,
        // changeOrigin: true,
        pathRewrite: {
          "^/req": ""
        }
      }
    }
  }
};

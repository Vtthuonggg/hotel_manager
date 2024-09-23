const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "https://4cf7-14-232-210-216.ngrok-free.app",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
});
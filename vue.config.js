const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "https://721f-222-252-23-195.ngrok-free.app",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
});

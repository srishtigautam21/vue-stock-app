const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, "../backend/public"),
  devServer: {
    proxy: {
      "/stock": {
        target: "http://localhost:3000",
      },
    },
  },
});

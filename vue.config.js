module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    mode: "production",
    output: {
      filename: "[name].bundle.js"
    }
  },
  publicPath: ""
};

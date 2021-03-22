module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/pokedex_vue/" : "/",
  outputDir: "docs",
  filenameHashing: false,
  transpileDependencies: ["vuetify"],
};

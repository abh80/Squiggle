const path = require("path"); //eslint-disable-line
const CopyPlugin = require("copy-webpack-plugin"); //eslint-disable-line

module.exports = {
  entry: {
    "js/background.js": "./src/background.ts",
    "js/content_script.js": "./src/content_script.ts",
  },
  output: {
    filename: "[name]",
    path: path.join(__dirname, "dist"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/html", to: "html" },
        { from: "./src/manifest.json", to: "manifest.json" },
      ],
      
    }),
  ],
};

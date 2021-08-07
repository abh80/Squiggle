const path = require("path"); //eslint-disable-line
const CopyPlugin = require("copy-webpack-plugin"); //eslint-disable-line

module.exports = {
  entry: {
    "js/background.js": "./src/ts/background.ts",
    "js/content_script.js": "./src/ts/content_script.ts",
  },
  output: {
    filename: "[name]",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
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

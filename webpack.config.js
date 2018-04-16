const webpack = require("webpack");
const path = require("path");

const root = path.resolve(__dirname);

module.exports = {
  entry: {
    main: "./src/main.ts",
    app: "./src/index.tsx",
    settings: "./src/settings.tsx"
  },
  devtool: "inline-source-map",
  mode: "development",
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    filename: "[name].js",
    path: path.resolve(root, "build")
  },
  plugins: [
    // Fix issue with isomorphic-fetch.
    // See:
    // - https://github.com/kadirahq/lokka-transport-http/issues/22,
    // - https://github.com/andris9/encoding/issues/18
    new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, "node-noop")
  ]
};

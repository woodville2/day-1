import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export default (_env, argv) => {
  const prod = argv.mode === "production";

  return {
    entry: "./src/index.jsx",
    output: {
      filename: prod ? "bundle.[contenthash].js" : "bundle.js",
      path: path.resolve("dist"),
      publicPath: "/",
      clean: true,
    },
    resolve: { extensions: [".js", ".jsx"] },
    devtool: prod ? "source-map" : "eval-cheap-module-source-map",
    devServer: {
      hot: true,
      historyApiFallback: true,
      port: 3000,
    },
    module: {
      rules: [
        // JavaScript and JSX
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              plugins: [!prod && "react-refresh/babel"].filter(Boolean),
            },
          },
        },
        // Plain CSS
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // SCSS (optional later)
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        // Images and assets
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "public/index.html" }),
      !prod && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    mode: prod ? "production" : "development",
    performance: { hints: false },
  };
};

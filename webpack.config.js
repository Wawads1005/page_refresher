import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";

process.loadEnvFile();

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    index: path.resolve("./src/index.tsx"),
    background: path.resolve("./src/background.ts"),
  },
  output: {
    path: path.resolve("./build/"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.resolve("./src"),
    },
  },
  devServer: {
    static: {
      directory: path.resolve("./public"),
    },
    watchFiles: {
      paths: ["./src/**/*", "./public/**/*"],
      options: {
        usePolling: true,
      },
    },
    hot: true,
    port: process.env.PORT,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["index"],
    }),
    new CopyPlugin({ patterns: [{ from: "public", to: "." }] }),
  ],
};

export default config;

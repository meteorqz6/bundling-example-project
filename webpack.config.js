const { resolve } = require("dns");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./main.tsx", // 어떤 파일을 진입점으로 번들링할지
  output: {
    filename: "bundle.js", // 번들로 만들어질 파일 이름
    path: path.resolve(__dirname, "dist"), // 번들 파일이 어디에 저장될지
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        ],
        exclude: /node_modules/, // 외부 모듈은 제외한다.
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // 파일을 import할 때 확장자를 생략할 수 있다. .tsx 확장자, TS, JS를 혼용하는 프로젝트에서 설정해두면 좋다.
  },
};

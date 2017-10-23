module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react", "stage-0"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loaders: [
          {
            loader: "image-trace-loader",
            options: {
              // turnPolicy: 'TURNPOLICY_MINORITY',
              // turdSize: 100,
              // alphaMax: 1,
              // optCurve: true,
              // optTolerance: 0.2,
              // threshold: 'THRESHOLD_AUTO',
              // flipColors: false,
              // color: 'COLOR_AUTO',
              // background: 'COLOR_TRANSPARENT',
              // skipTraceIfBase64: false
            }
          },
          {
            loader: "url-loader",
            options: {
              limit: 8000
            }
          }
        ]
      }
    ]
  }
};

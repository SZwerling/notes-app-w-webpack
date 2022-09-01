const path = require('path')

module.exports = {
    mode: 'production',
    entry: {
      index: path.resolve(__dirname, "src/index.js"), // could specify other entries for code splitting
      edit: path.resolve(__dirname, "src/edit.js"),
     },
     output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-bundle.js",
      
     },
     devtool: 'source-map',
     devServer: {
      static: {
          directory: path.resolve(__dirname, 'dist')
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true,  //enables GZIP Compression
      historyApiFallback: true,
     },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ],
      },
}
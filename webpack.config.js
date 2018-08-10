module.exports = {
  output: {
    path: "/var/lib/tomcat/webapps/catdv/northshore/reactdv",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
};

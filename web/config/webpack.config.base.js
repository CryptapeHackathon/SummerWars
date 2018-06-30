const path = require('path')
const webpack = require('webpack')

require('dotenv').config()


module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'scripts/[name]-[hash:5].js',
    chunkFilename: 'scripts/[name]-[hash:5].js',
  },
  module: {
    rules: [{
        test: /\.tsx?/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, './tsconfig.json'),
          },
        }, ],
        include: /src/,
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[name]-[hash].[ext]',
        },
        include: /src/,
      },
      {
        test: /\.(otf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          mimetype: 'application/font-woff',
          name: 'fonts/[name].[ext]',
        },
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        CHAIN_ID: JSON.stringify(1),
        SERVER: JSON.stringify(process.env.SERVER),
        APP_NAME: JSON.stringify(process.env.APP_NAME),
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.svg', '.png', '.jpg'],
  },
}

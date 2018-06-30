const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  entry: {
    react: ['react', 'react-dom', 'react-router-dom'],
    // styledComponents: ['styled-components'],
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name]_dll.js',
    library: '[name]_dll',
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_dll',
      path: path.resolve(__dirname, '../lib/[name]_manifest.json'),
    }),
    new ManifestPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        // NODE_ENV: JSON.stringify('production'),
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
}

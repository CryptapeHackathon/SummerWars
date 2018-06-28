const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const AutoprefixerPlugin = require('autoprefixer')

/* eslint-disable import/no-dynamic-require */
const baseConfig = require(path.resolve(__dirname, './webpack.config.base'))
const reactManifest = require(path.resolve(__dirname, '../lib/react_manifest'))
/* eslint-enable import/no-dynamic-require */

const manifest = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../lib/manifest.json')),
)
const prodConfig = {
  entry: {
    app: path.resolve(__dirname, '../src/index.tsx'),
  },
  module: {
    rules: [{
      test: /\.s?css$/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        publicPath: '../',
        use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 3,
              localIdentName: '[local]__[name]--[hash:base64:5]',
              minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: false,
              plugins: () => [AutoprefixerPlugin],
            },
          },
          'resolve-url-loader',
          'sass-loader',
        ]
      }),
      include: [
        path.resolve(__dirname, '../src/'),
        path.resolve(__dirname, '../node_modules/normalize.css'),
      ],
    }, ],
  },
  plugins: [
    new ExtractPlugin('styles/style.[contenthash:base64:5].css'),
    new SWPrecachePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        OBSERVABLE_INTERVAL: 1000,
      },
    }),
    new UglifyJSPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: reactManifest,
    }),
    new CopyPlugin([{
      from: path.resolve(__dirname, '../lib'),
      to: path.resolve(__dirname, '../dist/lib'),
    }, ]),
    new HtmlPlugin({
      title: 'Microscope',
      template: path.resolve(__dirname, '../src/templates/index.html'),
      react: `./lib/${manifest['react.js']}`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
}

module.exports = merge(baseConfig, prodConfig)

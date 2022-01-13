const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
  entry: [
    './src/www/ts/main.ts',
    './src/www/styles/main.sass'
  ],
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'esbuild-loader',
      options: {
        loader: 'ts',
        target: 'ESNext',
      },
      include: [
        path.resolve(__dirname, 'src/www/ts'),
      ],
      exclude: [
        /node_modules/,
        /cypress/,
        /old/,
      ],
    }, {
      test: /\.s[ac]ss$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'styles.min.css'
        },
      },
        'sass-loader',
      ],
      include: [
        path.resolve(__dirname, 'src/www/styles'),
      ],
    },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/www/index.html',
    }),
    // new WasmPackPlugin({
    //   crateDirectory: path.resolve(__dirname, 'src'),
    // }),
    // Have this example work in Edge which doesn't ship `TextEncoder` or
    // `TextDecoder` at this time.
    new webpack.ProvidePlugin({
      TextDecoder: ['text-encoding', 'TextDecoder'],
      TextEncoder: ['text-encoding', 'TextEncoder'],
    }),
  ],
  mode: 'development',
  experiments: {
    asyncWebAssembly: true,
  },
  watchOptions: {
    ignored: '**/node_modules',
    poll: 1000, // Check for changes every second
  },
};
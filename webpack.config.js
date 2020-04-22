const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')
const WebpackCleanPlugin = require('webpack-clean');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

// settings
const destination = 'dist';
const htmlTemplate = './src/template.html';
const htmlWebpackInlineSourcePlugin = new HtmlWebpackInlineSourcePlugin();
const webpackCleanPlugin = new WebpackCleanPlugin([
  destination + '/' + 'main.js',
]);

// Client entrypoints:
const clientEntrypoints = [
  {
    name: "Main",
    entry: "./src/main.jsx",
    filename: "main.html"
  }
];

const sharedConfigSettings = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          ie8: true,
          mangle: true,
          compress: {
            properties: true
          },
          output: {
            beautify: false
          }
        }
      })
    ]
  },
  module: {},
};

const eslintConfig = {
  enforce: 'pre',
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    cache: false,
    failOnError: false,
    fix: true
  }
};

const clientConfig = {
  ...sharedConfigSettings,
  output: {
    path: path.resolve(__dirname, destination),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      // Must be below test-utils
    }
  },
  module: {
    rules: [
      // eslintConfig,
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
};

const clientConfigs = clientEntrypoints.map((clientEntrypoint) => {
  return ({
    ...clientConfig,
    name: clientEntrypoint.name,
    entry: clientEntrypoint.entry,
    plugins: [
      new HtmlWebpackPlugin({
        template: htmlTemplate,
        filename: clientEntrypoint.filename,
        inlineSource: '.(js|css)$' // embed all javascript and css inline
      }),
      htmlWebpackInlineSourcePlugin,
      webpackCleanPlugin
    ]
  })
});

module.exports = [
  ...clientConfigs
];

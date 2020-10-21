const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const GenerateJSONPlugin = require('generate-json-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const packageInfo = require('./package.json');

delete packageInfo.husky;
delete packageInfo.scripts;
delete packageInfo.devDependencies;

const dependencies = ['react', 'redux', 'react-redux', 'reselect'];

const copyright = `
/**
 * promotively/react-redux-form
 *
 * @copyright Promotively (c) 2020
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @license MIT
 *
 * @see {@link https://promotively.com}
 * @see {@link https://github.com/promotively/react-redux-form}
 */\n\n
`;

module.exports = [
  {
    devtool: 'source-map',
    entry: {
      browser: 'src/index.js'
    },
    externals: [nodeExternals()],
    mode: 'production',
    module: {
      rules: [
        {
          exclude: [/node_modules/],
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-optional-chaining',
              [
                'module-resolver',
                {
                  root: ['./src/**']
                }
              ]
            ],
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
          test: /src\/(.*)\.js$/
        },
        {
          exclude: [/node_modules/],
          loader: 'remove-comments-loader',
          test: /src\/(.*)\.js$/
        }
      ]
    },
    output: {
      filename: '[name].js',
      library: '@promotively/react-redux-form',
      libraryTarget: 'umd',
      path: path.resolve('./dist/lib')
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: copyright,
        entryOnly: true,
        raw: true
      }),
      new GenerateJSONPlugin('package.json', {
        ...packageInfo,
        browser: 'browser.js',
        main: 'server.js'
      }),
      new CopyPlugin({ patterns: [{ from: './src/index.d.ts', to: 'index.d.ts' }] })
    ],
    resolve: {
      modules: [path.resolve('.'), path.resolve('./node_modules')]
    },
    target: 'web'
  },
  {
    devtool: 'inline-source-map',
    entry: {
      browser: 'example/with-hocs/app/browser.js'
    },
    mode: 'development',
    module: {
      rules: [
        {
          exclude: [/node_modules/],
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-optional-chaining',
              [
                'module-resolver',
                {
                  root: ['./src/**']
                }
              ]
            ],
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
          test: /(example|src)\/(.*)\.js$/
        },
        {
          exclude: [/node_modules/],
          loader: 'remove-comments-loader',
          test: /src\/(.*)\.js$/
        }
      ]
    },
    output: {
      filename: '[name].js',
      path: path.resolve('./dist/example')
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: copyright,
        entryOnly: true,
        raw: true
      }),
      new CopyPlugin({ patterns: [{ from: './example/common/index.html', to: 'index.html' }] })
    ],
    resolve: {
      modules: [path.resolve('.'), path.resolve('./node_modules'), path.resolve('../node_modules')]
    },
    target: 'web'
  },
  {
    devtool: 'source-map',
    entry: {
      server: 'src/index.js'
    },
    externals: [nodeExternals()],
    mode: 'production',
    module: {
      rules: [
        {
          exclude: [/node_modules/],
          loader: 'babel-loader',
          test: /src\/(.*)\.js$/
        },
        {
          exclude: [/node_modules/],
          loader: 'remove-comments-loader',
          test: /src\/(.*)\.js$/
        }
      ]
    },
    output: {
      filename: '[name].js',
      library: '@promotively/react-redux-form',
      libraryTarget: 'commonjs2',
      path: path.resolve('./dist/lib')
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: copyright,
        entryOnly: true,
        raw: true
      })
    ],
    resolve: {
      modules: [path.resolve('.'), path.resolve('./node_modules')]
    },
    target: 'node'
  },
  {
    devtool: 'inline-source-map',
    entry: {
      'example/server': ['source-map-support/register', 'example/with-hocs/app/server.js'],
      'lib/server': 'src/index.js'
    },
    externals: [...dependencies, 'express'],
    mode: 'development',
    module: {
      rules: [
        {
          exclude: [/node_modules/],
          loader: 'babel-loader',
          test: /(example|src)\/(.*)\.js$/
        },
        {
          exclude: [/node_modules/],
          loader: 'remove-comments-loader',
          test: /src\/(.*)\.js$/
        }
      ]
    },
    optimization: {
      nodeEnv: false
    },
    output: {
      filename: '[name].js',
      library: '@promotively/react-redux-form',
      libraryTarget: 'commonjs2',
      path: path.resolve('./dist')
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: copyright,
        entryOnly: true,
        raw: true
      })
    ],
    resolve: {
      modules: [path.resolve('.'), path.resolve('./node_modules'), path.resolve('../node_modules')]
    },
    target: 'node'
  }
];

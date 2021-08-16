/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-08-08 14:28:50
 * @LastEditors: tanwei
 * @LastEditTime: 2021-01-29 10:06:15
 * @FilePath: /open-platform/config-overrides.js
 */
const {
    override,
    addBabelPlugin,
    addLessLoader,
    // useEslintRc,
    addDecoratorsLegacy,
    addWebpackAlias,
    addBabelPlugins,
    addWebpackPlugin,
} = require('customize-cra');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require("path");
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = override(
    // useEslintRc(),
    addBabelPlugin(
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            },
            'ant',
        ],
        [
            'import',
            {
                libraryName: 'lodash',
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
            'lo',
        ],
        [
            'import',
            {
                libraryName: 'ahooks',
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
        ],
    ),
    ...addBabelPlugins(
        "@babel/plugin-proposal-do-expressions",
        "@babel/plugin-proposal-function-bind",
        "@babel/plugin-proposal-optional-chaining",
        ["@babel/plugin-syntax-dynamic-import"],
        [
            "@babel/plugin-proposal-pipeline-operator",
            {
                "proposal": "minimal"
            }
        ],
    ),
    addDecoratorsLegacy(),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                // '@primary-color': '#1890ff',
            },
        }
    }),
    addWebpackAlias({
        '@': path.resolve(__dirname, './src'),
    }),
    // addWebpackPlugin(new BundleAnalyzerPlugin())
    addWebpackPlugin(
        new FileManagerPlugin({
            events: {
                onEnd: {
                    delete: ['./build.zip'],
                    archive: [
                        { source: './build', destination: './build.zip' },
                    ],
                },
            }
        })
    )
);

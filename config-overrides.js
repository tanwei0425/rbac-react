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
const CompressionPlugin = require('compression-webpack-plugin');

// 是否是本地开发start启动的
const isBuild = process.env.NODE_ENV === 'production';

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
                    delete: ['./build/build.zip'],
                    archive: [
                        { source: './build', destination: './build/build.zip' },
                    ],
                },
            }
        }),

        isBuild &&
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(js|css)$'  //压缩 js 与 css
            ),
            threshold: 102400,// 大约100kb处理  单位b
            minRatio: 0.8
        })
    ),
    (config) => {
        // 正式环境去掉打包生产map文件
        if (isBuild) config.devtool = false;
        return config;
    }
);

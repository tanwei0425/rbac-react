/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-11-20 15:57:08
 * @LastEditors: tanwei
 * @LastEditTime: 2020-11-21 19:29:24
 * @FilePath: /open-platform/color.js
 */
const path = require('path');
const { generateTheme } = require('antd-theme-generator');

const options = {
    antDir: path.join(__dirname, './node_modules/antd'),
    stylesDir: path.join(__dirname, './src'), // all files with .less extension will be processed
    varFile: path.join(__dirname, './src/static/variables.less'), // default path is Ant Design default.less file
    themeVariables: ['@primary-color'],
    outputFilePath: path.join(__dirname, './public/color.less'), // if provided, file will be created with generated less/styles
    customColorRegexArray: [/^fade\(.*\)$/], // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
};

generateTheme(options).then(less => {
    console.log('Theme generated successfully');
})
    .catch(error => {
        console.log('Error', error);
    });
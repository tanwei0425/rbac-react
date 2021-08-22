/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-08-15 17:53:03
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-08 15:20:46
 * @FilePath: /open-platform/.env-cmdrc.js
 */
module.exports = {
    "development": {
        "REACT_APP_BASE_URL": `https://api.hellotanwei.cn`,
        "REACT_APP_ALI_OSS_URL": `https://file-api.trsafety.com`,
        "REACT_APP_SOCKET_URL": `ws://api.hellotanwei.cn`,
    },
    "test": {
        "REACT_APP_BASE_URL": `https://open-api.trsafety.com`,
        "REACT_APP_ALI_OSS_URL": `https://file-api.trsafety.com`,
        "REACT_APP_SOCKET_URL": `test:SOCKET_URL`,
    },
    "production": {
        "REACT_APP_BASE_URL": `https://api.hellotanwei.cn`,
        "REACT_APP_ALI_OSS_URL": `https://file-api.hellotanwei.cn`,
        "REACT_APP_SOCKET_URL": `ws://api.hellotanwei.cn`,
    },
}
/*
 * @Descripttion: 手动配置代理(可配置多个)
 * @Author: tanwei
 * @Date: 2020-11-01 16:09:47
 * @LastEditors: tanwei
 * @LastEditTime: 2021-02-28 17:18:12
 * @FilePath: /open-platform/src/setupProxy.js
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      '/admin/v1',
      {
        // target: 'http://127.0.0.1:7002',
        target: 'https://api.hellotanwei.cn',
        // pathRewrite: { '^/open': '/open' },
        changeOrigin: true,
      })
  );
  app.use(
    createProxyMiddleware(
      ['/open', '/ali/sms'],
      {
        target: 'https://open-api.trsafety.com',
        // pathRewrite: { '^/open': '/open' },
        changeOrigin: true,
      })
  );
  app.use(
    createProxyMiddleware(
      '/ali/oss',
      {
        target: 'https://file-api.trsafety.com',
        changeOrigin: true,
      })
  );
};

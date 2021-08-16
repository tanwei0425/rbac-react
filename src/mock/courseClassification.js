/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-11-09 16:58:42
 * @LastEditors: tanwei
 * @LastEditTime: 2020-11-14 17:28:36
 */

const Mock = require('mockjs');
const list = Mock.mock(RegExp('/open/course/classification.*'), 'get', {
    status: 'success',
    data: {
        'list|120': [{
            "key|+1": 1,
            "thumb": "/logo192.png",
            "name": '@csentence(3, 5)',
            "courseCategoryId": '1',
            "resourceCount": '@increment(100)',
            "comments": '@csentence(12, 120)'
        }],
        total: 300
    },
    message: '操作成功'
});
export {
    list
};
/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-11-09 16:58:42
 * @LastEditors: tanwei
 * @LastEditTime: 2020-11-13 17:51:46
 * @FilePath: /open-platform/src/mock/course.js
 */
const Mock = require('mockjs');
const list = Mock.mock(RegExp('/open/course/list.*'), 'get', {
    status: 'success',
    data: {
        'list|5-20': [{
            "id|+1": 1,
            "thumb": "/logo192.png",
            "name": '谭伟',
            "course_category_id": '1',
            "resource_count": 9999,
            "comments": 123
        }],
        total: 300
    },
    message: '操作成功'
});
export {
    list
};
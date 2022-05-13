/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2021-03-07 14:46:34
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-08 15:45:22
 * @FilePath: /open-platform/src/services/notes/articleRecord.js
 */

import { servicesPath } from '@/config';
const getArticleRecordTable = (data) => ({
    url: `${servicesPath}/v1/notes/articleRecord`,
    method: 'get',
    data,
});


export default {
    getArticleRecordTable,
};
/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2021-03-07 14:46:34
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-08 15:45:22
 * @FilePath: /open-platform/src/services/api.ts
 */

import { servicesPath } from '@/config';
const getApiTable = (data) => ({
    url: `${servicesPath}/v1/api`,
    method: 'get',
    data,
});
const createApi = (data) => ({
    url: `${servicesPath}/v1/api`,
    method: 'post',
    data,
});
const getApiDetail = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/api/${id}`,
    method: 'get',
    data: rest,
});
const updateApi = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/api/${id}`,
    method: 'put',
    data: rest,
});
const deleteApi = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/api/${id}`,
    method: 'delete',
    data: rest,
});


export default {
    getApiTable,
    createApi,
    getApiDetail,
    updateApi,
    deleteApi,
};
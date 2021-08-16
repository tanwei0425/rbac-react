/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2021-03-07 14:46:34
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-08 15:45:22
 * @FilePath: /open-platform/src/services/common.ts
 */
import { servicesPath } from '@/config';
const getMenuTable = (data) => ({
    url: `${servicesPath}/v1/menu`,
    method: 'get',
    data,
});
const createMenu = (data) => ({
    url: `${servicesPath}/v1/menu`,
    method: 'post',
    data,
});
const getMenuDetail = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/menu/${id}`,
    method: 'get',
    data: rest,
});
const updateMenu = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/menu/${id}`,
    method: 'put',
    data: rest,
});
const deleteMenu = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/menu/${id}`,
    method: 'delete',
    data: rest,
});


export default {
    getMenuTable,
    createMenu,
    getMenuDetail,
    updateMenu,
    deleteMenu,
};
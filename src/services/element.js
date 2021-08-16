/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2021-03-07 14:46:34
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-08 15:45:22
 * @FilePath: /open-platform/src/services/element.ts
 */
import { servicesPath } from '@/config';
const getElementTable = (data) => ({
    url: `${servicesPath}/v1/element`,
    method: 'get',
    data,
});
const createElement = (data) => ({
    url: `${servicesPath}/v1/element`,
    method: 'post',
    data,
});
const getElementDetail = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/element/${id}`,
    method: 'get',
    data: rest,
});
const updateElement = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/element/${id}`,
    method: 'put',
    data: rest,
});
const deleteElement = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/element/${id}`,
    method: 'delete',
    data: rest,
});


export default {
    getElementTable,
    createElement,
    getElementDetail,
    updateElement,
    deleteElement,
};
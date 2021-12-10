/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2021-03-07 14:46:34
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-08 15:45:22
 * @FilePath: /open-platform/src/services/dictionary.ts
 */

import { servicesPath } from '@/config';
const getDictionaryTable = (data) => ({
    url: `${servicesPath}/v1/dictionary`,
    method: 'get',
    data,
});
const createDictionary = (data) => ({
    url: `${servicesPath}/v1/dictionary`,
    method: 'post',
    data,
});
const getDictionaryDetail = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/dictionary/${id}`,
    method: 'get',
    data: rest,
});
const updateDictionary = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/dictionary/${id}`,
    method: 'put',
    data: rest,
});
const deleteDictionary = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/dictionary/${id}`,
    method: 'delete',
    data: rest,
});


export default {
    getDictionaryTable,
    createDictionary,
    getDictionaryDetail,
    updateDictionary,
    deleteDictionary,
};
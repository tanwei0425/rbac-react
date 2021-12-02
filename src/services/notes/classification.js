/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2021-03-07 14:46:34
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-08 15:45:22
 * @FilePath: /open-platform/src/services/notes/classification.js
 */

import { servicesPath } from '@/config';
const getNotesClassificationTable = (data) => ({
    url: `${servicesPath}/v1/notes/classification`,
    method: 'get',
    data,
});
const createNotesClassification = (data) => ({
    url: `${servicesPath}/v1/notes/classification`,
    method: 'post',
    data,
});
const getNotesClassificationDetail = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/notes/classification/${id}`,
    method: 'get',
    data: rest,
});
const updateNotesClassification = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/notes/classification/${id}`,
    method: 'put',
    data: rest,
});
const deleteNotesClassification = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/notes/classification/${id}`,
    method: 'delete',
    data: rest,
});
const getAllNotesClassification = (data) => ({
    url: `${servicesPath}/v1/allNotesClassification`,
    method: 'get',
    data: data,
});

export default {
    getNotesClassificationTable,
    createNotesClassification,
    getNotesClassificationDetail,
    updateNotesClassification,
    deleteNotesClassification,
    getAllNotesClassification,
};
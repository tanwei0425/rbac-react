/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2021-03-07 14:46:34
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-08 15:45:22
 * @FilePath: /open-platform/src/services/notes/article.js
 */

import { servicesPath } from '@/config';
const getNotesArticleTable = (data) => ({
    url: `${servicesPath}/v1/notes/article`,
    method: 'get',
    data,
});
const createNotesArticle = (data) => ({
    url: `${servicesPath}/v1/notes/article`,
    method: 'post',
    data,
});
const getNotesArticleDetail = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/notes/article/${id}`,
    method: 'get',
    data: rest,
});
const updateNotesArticle = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/notes/article/${id}`,
    method: 'put',
    data: rest,
});
const deleteNotesArticle = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/notes/article/${id}`,
    method: 'delete',
    data: rest,
});


export default {
    getNotesArticleTable,
    createNotesArticle,
    getNotesArticleDetail,
    updateNotesArticle,
    deleteNotesArticle,
};
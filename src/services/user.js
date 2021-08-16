/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2021-03-07 14:46:34
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-08 15:45:22
 * @FilePath: /open-platform/src/services/common.ts
 */
import { servicesPath } from '@/config';
const getUserTable = (data) => ({
    url: `${servicesPath}/v1/user`,
    method: 'get',
    data,
});
const createUser = (data) => ({
    url: `${servicesPath}/v1/user`,
    method: 'post',
    data,
});
const getUserDetail = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/user/${id}`,
    method: 'get',
    data: rest,
});
const updateUser = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/user/${id}`,
    method: 'put',
    data: rest,
});
const deleteUser = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/user/${id}`,
    method: 'delete',
    data: rest,
});
const reloadPwd = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/user/reloadPwd/${id}`,
    method: 'get',
    data: rest,
});

const getAllUser = () => ({
    url: `${servicesPath}/v1/user/all`,
    method: 'get',
});

export default {
    getUserTable,
    createUser,
    getUserDetail,
    updateUser,
    deleteUser,
    reloadPwd,
    getAllUser,
};
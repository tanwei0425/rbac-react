/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2021-03-07 14:46:34
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-08 15:45:22
 * @FilePath: /open-platform/src/services/role.ts
 */
import { servicesPath } from '@/config';
const getRoleTable = (data) => ({
    url: `${servicesPath}/v1/role`,
    method: 'get',
    data,
});
const createRole = (data) => ({
    url: `${servicesPath}/v1/role`,
    method: 'post',
    data,
});
const getRoleDetail = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/role/${id}`,
    method: 'get',
    data: rest,
});
const updateRole = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/role/${id}`,
    method: 'put',
    data: rest,
});
const deleteRole = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/role/${id}`,
    method: 'delete',
    data: rest,
});

const getAssociateUser = ({ id }) => ({
    url: `${servicesPath}/v1/role/associateUser/${id}`,
    method: 'get',
});

const updateAssociateUser = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/role/associateUser/${id}`,
    method: 'put',
    data: rest
});

const getRoleAuthDetail = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/role/auth/${id}`,
    method: 'get',
    data: rest
});

const setRoleAuth = ({ id, ...rest }) => ({
    url: `${servicesPath}/v1/role/auth/${id}`,
    method: 'put',
    data: rest
});

const allRole = (data) => ({
    url: `${servicesPath}/v1/allRole`,
    method: 'get',
    data,
});
export default {
    getRoleTable,
    createRole,
    getRoleDetail,
    updateRole,
    deleteRole,
    getAssociateUser,
    updateAssociateUser,
    getRoleAuthDetail,
    setRoleAuth,
    allRole,
};
/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2021-03-07 14:46:34
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-08 15:45:22
 * @FilePath: /open-platform/src/services/common.ts
 */

import { servicesPath } from '@/config';
const signIn = (data) => ({
    url: `${servicesPath}/v1/auth/signIn`,
    method: 'post',
    data,
});

const signOut = (data) => ({
    url: `${servicesPath}/v1/auth/signOut`,
    method: 'get',
    data
});
const getUser = () => ({
    url: `${servicesPath}/v1/auth/user`,
    method: 'get',
});

const getMenus = () => ({
    url: `${servicesPath}/v1/auth/menu`,
    method: 'get',
});

const getCaptcha = (data) => ({
    url: `${servicesPath}/v1/captcha`,
    method: 'get',
    data,
});
const getDictAll = () => ({
    url: `${servicesPath}/v1/dict`,
    method: 'get',
});
const updatePassword = (data) => ({
    url: `${servicesPath}/v1/updatePassword`,
    method: 'put',
    data: data,
});
const setSkinConfig = (data) => ({
    url: `${servicesPath}/v1/thmemUpdate`,
    method: 'put',
    data: { skin: JSON.stringify(data?.skin) },
});
const getAllMenuElementApi = () => ({
    url: `${servicesPath}/v1/allMenuElementApi`,
    method: 'get',
});

export default {
    signIn,
    getCaptcha,
    signOut,
    getUser,
    getMenus,
    getDictAll,
    setSkinConfig,
    updatePassword,
    getAllMenuElementApi
};
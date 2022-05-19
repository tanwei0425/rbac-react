/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2021-01-30 15:18:17
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-08 15:21:20
 * @FilePath: /open-platform/src/config/axios.ts
 */
import axios from 'axios';
import NProgress from 'nprogress';
import {
    getLocalStorageItem,
    setLocalStorageItem,
    clearAllLocalStorage,
} from '@/utils/utils';
// 处理导出、下载等特殊请求
import { binaryStreamUrl } from './exportAxiosUrl';
import { encryptRsa } from '@/utils/gas.jdk';

const axiosConfig = () => {
    axios.interceptors.request.use(
        (config) => {
            const token = getLocalStorageItem('token');
            token && (config.headers.common['authorization'] = token);
            config.baseURL = process.env.REACT_APP_BASE_URL || '/';
            // oss 上传 域名修改
            if (config.url === '/ali/oss/get/signature') {
                config.baseURL = process.env.REACT_APP_ALI_OSS_URL || '/';
            }
            // 二进制文件流请求更改responseType
            const binaryStreamStatus = binaryStreamUrl.findIndex(val => val === config?.url);
            binaryStreamStatus !== -1 && (config.responseType = 'blob');

            // 非对称加密,开发环境不启用
            if (
                config.data
                && process.env.NODE_ENV !== "development"
            ) {
                const str = JSON.stringify(config.data);
                config.data = encryptRsa(str);
            }
            NProgress.start(); // 设置加载进度条(开始..)
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    // axios响应拦截器
    axios.interceptors.response.use(
        (response) => {
            NProgress.done(); // 设置加载进度条(结束..)
            const { data, headers, config } = response;
            const newToken = headers?.['authorization'];
            if (newToken) {
                const oldToken = getLocalStorageItem('token');
                newToken !== oldToken && setLocalStorageItem('token', `Bearer ${newToken}`);
            }
            const binaryStreamStatus = binaryStreamUrl.findIndex(val => val === config?.url);
            if (data?.code !== 200 && binaryStreamStatus === -1) {
                window.message.error(data?.message);
            }

            if (data?.code === 901 || data?.code === 902 || data?.code === 903 || data?.code === 904) {
                clearAllLocalStorage();
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
            }

            /**
             * 特殊处理二进制文件流请求开始
             */
            if (!data?.code && binaryStreamStatus !== -1) {
                const contentDisposition = headers['content-disposition'];
                let filename = contentDisposition?.split(";")[1]?.split("filename=")[1];
                filename && (filename = decodeURIComponent(filename, "UTF-8"));
                const resData = {
                    filename,
                    data,
                };
                return resData;
            }
            // 二进制流报错的message
            if (data?.code && binaryStreamStatus !== -1) {
                window.message.error(data?.message);
            }
            /**
             * 特殊处理二进制文件流请求结束
             */
            return data;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

export default axiosConfig;
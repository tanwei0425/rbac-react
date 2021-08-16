/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-08-17 09:19:41
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-13 19:19:02
 * @FilePath: /open-platform/src/router/index.tsx
 */

import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import loadable from "@loadable/component";
import LayoutPage from '@/layouts';
import WrapperRouteComponent from '@/router/wrapperRouteComponent';
import { useSelector } from 'react-redux';

const NotFound = loadable(() => import(/* webpackChunkName: "404'"*/ '@/pages/error/404'));
const Login = loadable(() => import('@/pages/login'));

const RouteList = () => {
    const { menusList } = useSelector((state) => state.common);
    const [values, setValues] = useState([]);
    useEffect(() => {
        setValues(dynamicRouter(menusList) || []);
    }, []);
    // 动态加载router
    const dynamicRouter = (menusList) => menusList?.filter((val) =>
        val?.cmpPath &&
        val?.path &&
        val?.isRouter === '1'
    )?.map(val => {
        const RouterComp = loadable(() => import(`@/${val?.cmpPath}`).catch(err => {
            console.log(err, 'err');
        }));
        return {
            path: val.path,
            element: <WrapperRouteComponent
                auth
                element={<RouterComp />}
                title={val.name}
            />
        };
    });
    return [
        {
            path: '/login',
            element: <WrapperRouteComponent element={<Login />} title="登录" />
        },
        {
            element: <WrapperRouteComponent element={<LayoutPage />} title="" />,
            children: [...values]
        },
        {
            path: '*',
            element: <WrapperRouteComponent element={<NotFound />} auth title="404" />
        }
    ];
};
const RenderRouter = () => {
    const element = useRoutes(RouteList());
    return element;
};

export default RenderRouter;

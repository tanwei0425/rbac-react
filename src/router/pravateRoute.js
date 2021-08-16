/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-10-29 15:46:44
 * @LastEditors: tanwei
 * @LastEditTime: 2021-01-29 10:42:38
 * @FilePath: /open-platform/src/router/pravateRoute.tsx
 */
import React, { useEffect } from 'react';
import { getLocalStorageItem } from '@/utils/utils';
import { Route } from 'react-router-dom';
import useClearSysConfig from '@/hooks/useClearSysConfig';
const PrivateRoute = props => {
  const clearSysConfig = useClearSysConfig();
  const token = getLocalStorageItem('token');
  useEffect(() => {
    if (!token) {
      clearSysConfig('未登录或登录已过期,请重新登录', 'warning');
    }
  }, [token]);
  return <Route {...props} />;
};

export default PrivateRoute;

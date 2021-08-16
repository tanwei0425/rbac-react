/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-11-14 17:27:51
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-07 14:31:32
 * @FilePath: /open-platform/src/App.tsx
 */
import React, { useEffect } from 'react';
import { ConfigProvider, Spin } from "antd";
import { BrowserRouter } from "react-router-dom";
import RenderRouter from '@/router';
import { getLocalStorageItem } from '@/utils/utils';
import useGetAllConfig from '@/hooks/useGetAllConfig';
import zhCN from 'antd/es/locale/zh_CN';
import useContainerDom from '@/hooks/useContainerDom';
import useMessage from '@/hooks/useMessage';
import { useDispatch, useSelector } from 'react-redux';
import { systemLoading } from '@/stores/actions/commonAction';
const App = () => {
  const dispatch = useDispatch();
  const getContainer = useContainerDom();
  const message = useMessage();
  const token = getLocalStorageItem('token');
  const { fullScreenLoading } = useSelector(state => state.common);
  window.message = message;
  const { runFun } = useGetAllConfig();
  const getAllConfig = async () => await runFun() ? dispatch(systemLoading(false)) : dispatch(systemLoading(true));
  useEffect(() => {
    if (token) {
      getAllConfig();
    }
  }, []);
  return (
    <ConfigProvider
      /** table全屏状态下把弹出框（Select, Tooltip, Menu 等等）渲染到table上 */
      getPopupContainer={getContainer}
      locale={zhCN}
    >
      <BrowserRouter>
        {fullScreenLoading ?
          <span className={'globalSysStartUp'}>
            <Spin spinning={true} size={"large"} tip={'系统加载中，请稍等！'}><div style={{ width: '100vw', height: '100vh' }} ></div></Spin>
          </span> :
          <RenderRouter />
        }
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;

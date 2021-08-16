/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-08-08 14:21:55
 * @LastEditors: tanwei
 * @LastEditTime: 2021-01-30 18:46:51
 * @FilePath: /open-platform/src/index.tsx
 */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@/stores';
import AxiosRequestProvider from '@/components/AxiosRequestProvider';
import App from '@/App';
// import 'moment/locale/zh-cn';
import './mock';
import '@/static/index.less';
ReactDOM.render(
  <Provider store={store}>
    <AxiosRequestProvider>
      <App />
    </AxiosRequestProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


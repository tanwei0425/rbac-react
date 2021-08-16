/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-09-06 13:50:00
 * @LastEditors: tanwei
 * @LastEditTime: 2021-02-07 09:26:31
 * @FilePath: /open-platform/src/pages/404.tsx
 */
import React from "react";
import { useNavigate } from 'react-router-dom';
import { Result, Button } from "antd";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <section style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Result
        status="404"
        title="404"
        style={{ width: '100%' }}
        subTitle="丢了吧大兄弟"
        extra={
          <Button type="primary" onClick={_ => navigate('/')}>
            返回首页
        </Button>
        }
      />
    </section>
  );
};
export default Error404;
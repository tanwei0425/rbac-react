/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-09-05 19:19:29
 * @LastEditors: tanwei
 * @LastEditTime: 2021-02-07 09:28:21
 * @FilePath: /open-platform/src/pages/index/index.tsx
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Index = (props) => {
    const navigate = useNavigate();
    return (
        <Button type='primary' onClick={() => navigate('/system/permission/menu')}>跳转菜单管理</Button>
    );
};

export default Index;

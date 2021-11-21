/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-09-05 19:19:29
 * @LastEditors: tanwei
 * @LastEditTime: 2021-02-07 09:28:21
 * @FilePath: /open-platform/src/pages/index/index.tsx
 */
import React from 'react';
import { Button } from 'antd';

const Index = (props) => {
    return (
        <div style={{ height: '200vh' }}>
            <Button type='primary'>按钮1</Button>
            <Button danger type='primary'>按钮2</Button>
        </div>
    );
};

export default Index;

/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-09-05 19:19:29
 * @LastEditors: tanwei
 * @LastEditTime: 2021-02-07 09:28:21
 * @FilePath: /open-platform/src/pages/index/index.tsx
 */
import React, { useEffect } from 'react';
import { Button } from 'antd';
import io from 'socket.io-client';
import { getLocalStorageItem } from '@/utils/utils';

const Index = (props) => {
    const connectSocket = () => { };
    const closeSocket = () => { };

    useEffect(() => {
        const authorization = getLocalStorageItem('token');
        const socket = io('ws://127.0.0.1:7002/', {
            // 实际使用中可以在这里传递参数
            query: {
                authorization,
            },
        });

        socket.on('connect', () => {
            const id = socket.id;

            // 客户端接收服务端发送的测试数据
            socket.on('connectSattus', msg => {
                console.log('#connectSattus,', msg);
            });
            socket.on('resIndex', msg => {
                console.log('#resIndex,', msg);
            });

            // 向服务端发送测试数据
            // demo的控制器
            socket.emit('demo', {
                id,
                info: '测试',
            });
            // demo1的控制器
            socket.emit('demo1', {
                id,
                info: '测试1',
            });

            // 系统事件
            socket.on('disconnect', msg => {
                // 断开
                console.log('#disconnect', msg);
            });
            socket.on('disconnecting', () => {
                console.log('#disconnecting');
            });
            socket.on('error', () => {
                console.log('#error');
            });
        });
        return () => {
            console.log(111222333);
            socket.close();
        };
    }, []);

    return (
        <div>
            <Button type='primary' onClick={() => connectSocket()}>连接socket</Button>
            <Button danger type='primary' onClick={() => closeSocket()}>断开socket</Button>
        </div>
    );
};

export default Index;

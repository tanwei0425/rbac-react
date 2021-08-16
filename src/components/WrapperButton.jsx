/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-09-12 15:47:16
 * @LastEditors: tanwei
 * @LastEditTime: 2021-02-07 09:25:42
 * @FilePath: /open-platform/src/components/WrapperButton.tsx
 */
import React, { memo } from 'react';
import { Button } from 'antd';
import { authority } from '@/utils/utils';
import { useSelector } from 'react-redux';
const WrapperButton = (props) => {

    const { authButStatus, children, ...restProps } = props;
    const { userInfo } = useSelector((state) => state.common);
    return (
        authButStatus && !authority({
            dataSource: userInfo?.elements,
            target: authButStatus
        }) ?
            null :
            <Button
                {...restProps}
            >
                {children}
            </Button>
    );
};

export default memo(WrapperButton);

/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-11-22 19:06:34
 * @LastEditors: tanwei
 * @LastEditTime: 2021-02-07 09:30:47
 * @FilePath: /open-platform/src/components/WrapperTable/useWrapperTitle/tableSize.tsx
 */
import React from 'react';
import { Menu, Tooltip } from 'antd';
import {
    ColumnHeightOutlined,
} from '@ant-design/icons';
import WrapperDropdown from '@/components/WrapperDropdown';
import styles from './index.module.less';

const data = [
    { title: '紧凑', value: 'small' },
    { title: '默认', value: 'middle' },
    { title: '较大', value: 'large' },
];
const useTableSize = ({ wrapperSize, setWrapperSize }) => {
    const menu = <Menu className={styles['wrapper-title-tool-tableSize']}>
        {
            data.map(item => <Menu.Item
                className={wrapperSize === item?.value && styles['wrapper-title-tool-tableSize-target']}
                onClick={() => setWrapperSize(item?.value)}
                key={item.value}>
                {item?.title}
            </Menu.Item>)
        }
    </Menu>;
    return <Tooltip arrowPointAtCenter placement="top" title={'密度'}>
        <WrapperDropdown overlay={menu} trigger={['click']}>
            <ColumnHeightOutlined className={styles['wrapper-title-tool-icon']} />
        </WrapperDropdown>
    </Tooltip>;
};

export default useTableSize;

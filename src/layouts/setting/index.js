/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-11-18 18:05:03
 * @LastEditors: tanwei
 * @LastEditTime: 2021-02-07 09:21:23
 * @FilePath: /open-platform/src/layouts/setting/index.tsx
 */
import React, { useState } from 'react';
import { SettingOutlined, CloseOutlined } from '@ant-design/icons';
import { Drawer, Space, Divider } from 'antd';
import calssnames from 'classnames';
import OverallStyle from '@/layouts/setting/overallStyle';
import ThemeColor from '@/layouts/setting/themeColor';
import NavigationMode from '@/layouts/setting/navigationMode';
import styles from '@/layouts/setting/setting.module.less';

const Setting = (props) => {
    const [visible, setVisible] = useState(false);
    const onClick = () => setVisible(!visible);

    const onClose = () => setVisible(false);

    const TCalssnames = calssnames(
        styles['t-layout-setting'],
        visible && styles['t-layout-setting-true']
    );
    return (
        <>
            <div
                onClick={onClick}
                className={TCalssnames}
            >
                {visible ? <CloseOutlined /> : <SettingOutlined />}
            </div>
            <Drawer
                title={<h3 style={{ marginBottom: 0 }}>系统风格设置</h3>}
                placement="right"
                width={300}
                destroyOnClose={true}
                closable={false}
                zIndex={997}
                onClose={onClose}
                visible={visible}
            >
                {visible && <Space
                    className={'t-layout-setting-space'}
                    split={<Divider />}
                    direction={'vertical'}
                    align={'start'}
                    size={'large'}
                >
                    <OverallStyle />
                    <ThemeColor />
                    <NavigationMode />
                </Space>}
            </Drawer>
        </>
    );
};
export default Setting;
/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-11-19 09:50:49
 * @LastEditors: tanwei
 * @LastEditTime: 2021-02-28 18:56:38
 * @FilePath: /open-platform/src/layouts/setting/navigationMode.tsx
 */
import React from 'react';
import { List, Switch } from 'antd';
import { useSelector } from 'react-redux';
import useSetSysTheme from '@/hooks/useSetSysTheme';
import styles from '@/layouts/setting/setting.module.less';

const NavigationMode = (props) => {
    const { setSkin, loading } = useSetSysTheme();

    const { navigationMode } = useSelector((state) => state.common);
    const dataSource = [
        { key: 'menuTrigger', title: '触发器固定顶部' },
        { key: 'breadcrumb', title: '简易面包屑' },
        { key: 'fixedHeader', title: '固定 Header' },
        { key: 'watermark', title: '水印' },
    ];

    const onChange = (e, key) => setSkin(key, e, '导航模式更新成功');

    return (
        <List
            header={<h3 className={styles['t-layout-setting-navMode']}>导航模式</h3>}
            dataSource={dataSource}
            split={false}
            loading={loading}
            renderItem={(item) => {
                return <List.Item
                    className={styles['t-layout-setting-navMode-item']}
                    actions={[
                        <Switch size={'small'} checked={navigationMode[item.key]} onChange={(e) => onChange(e, item.key)} />
                    ]}
                >
                    <div>{item?.title}</div>
                </List.Item>;
            }}
        />
    );
};

export default NavigationMode;

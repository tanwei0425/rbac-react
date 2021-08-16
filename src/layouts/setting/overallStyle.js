/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-11-21 17:33:04
 * @LastEditors: tanwei
 * @LastEditTime: 2021-02-28 18:57:00
 * @FilePath: /open-platform/src/layouts/setting/overallStyle.tsx
 */
import React from 'react';
import { Tooltip, Spin } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import useSetSysTheme from '@/hooks/useSetSysTheme';
import styles from '@/layouts/setting/setting.module.less';


const OverallStyle = (props) => {
    const { setSkin, loading } = useSetSysTheme();

    const { navigationMode } = useSelector((state) => state.common);
    const data = [
        { title: '亮色菜单', theme: 'light' },
        { title: '暗色菜单', theme: 'dark' },
    ];
    const onClick = (title, theme) => setSkin('overallStyle', theme, <span>{title}风格更新成功</span>);

    const TClassnames = (theme) => {
        switch (theme) {
            case 'light':
                return styles['t-layout-setting-oveStyle-item'];
            case 'dark':
                return styles['t-layout-setting-oveStyle-itemBlack'];
            default:
                return false;
        }
    };
    return (
        <div className={styles['t-layout-setting-oveStyle']}>
            <h3 className={styles['t-layout-setting-oveStyle-title']}>整体风格设置</h3>
            <Spin spinning={loading}>
                <div className={styles['t-layout-setting-oveStyle-content']}>
                    {data.map(val => {
                        return <Tooltip placement="top" key={val?.theme} title={val?.title}>
                            <div onClick={() => onClick(val?.title, val?.theme)} className={TClassnames(val?.theme)}>
                                <span className={styles['t-layout-setting-oveStyle-item-span']}>
                                    <CheckOutlined
                                        style={navigationMode?.overallStyle !== val?.theme ? { opacity: 0 } : {}}
                                        className={styles['t-layout-setting-theme-color-tag-icon']}
                                    />
                                </span>
                            </div>
                        </Tooltip>;
                    })}
                </div>
            </Spin>
        </div>
    );
};

export default OverallStyle;

/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-11-20 14:12:50
 * @LastEditors: tanwei
 * @LastEditTime: 2021-02-28 18:48:25
 * @FilePath: /open-platform/src/layouts/setting/themeColor.tsx
 */
import React from 'react';
import { Tag, Tooltip, Spin } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import useSetSysTheme from '@/hooks/useSetSysTheme';
import styles from '@/layouts/setting/setting.module.less';

const ThemeColor = () => {
    const { setSkin, loading } = useSetSysTheme();
    const { navigationMode } = useSelector((state) => state.common);
    const data = [
        { title: '拂晓蓝（默认）', color: 'rgb(24, 144, 255)' },
        { title: '薄暮', color: 'rgb(245, 34, 45)' },
        { title: '火山', color: 'rgb(250, 84, 28)' },
        { title: '日暮', color: 'rgb(250, 173, 20)' },
        { title: '明青', color: 'rgb(19, 194, 194)' },
        { title: '极光绿', color: 'rgb(82, 196, 26)' },
        { title: '极客蓝', color: 'rgb(47, 84, 235)' },
        { title: '酱紫', color: 'rgb(114, 46, 209)' },
    ];

    const onClick = (title, color) => setSkin('themeColor', color, <><span style={{ color: color }}>{title}</span>主题色更新成功</>);

    return (
        <div className={styles['t-layout-setting-theme']}>
            <h3 className={styles['t-layout-setting-theme-title']}>主题色</h3>
            <div className={styles['t-layout-setting-theme-color']}>
                <Spin spinning={loading}>
                    {data.map(val => <Tooltip placement="top" key={val?.title} title={val?.title}>
                        <Tag onClick={() => onClick(val?.title, val?.color)} className={styles['t-layout-setting-theme-color-tag']} color={val?.color}>
                            <CheckOutlined
                                style={navigationMode?.themeColor !== val?.color ? { opacity: 0 } : {}}
                                className={styles['t-layout-setting-theme-color-tag-icon']}
                            />
                        </Tag>
                    </Tooltip>)}
                </Spin>
            </div>
        </div>
    );
};

export default ThemeColor;

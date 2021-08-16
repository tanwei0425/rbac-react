/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-11-22 18:31:47
 * @LastEditors: tanwei
 * @LastEditTime: 2021-01-31 16:39:10
 * @FilePath: /open-platform/src/components/WrapperModal/useWrapperTitle/index.tsx
 */
import React, { useMemo } from 'react';
import { Row, Col, Space, } from 'antd';
import sytles from './index.module.less';

const useWrapperTitle = (props) => {
    const { title, toolBarRender, } = props;

    let newTitle;
    let newToolBarRender = [];

    title && (newTitle = title([]));
    toolBarRender && (newToolBarRender = [...toolBarRender(), ...newToolBarRender]);

    const wrapperTitle = useMemo(() => {
        return () => <Row className={sytles['wrapper-title']} justify="space-between" align={'middle'} >
            <Col><h3 className={sytles['wrapper-title-text']}>{newTitle}</h3></Col>
            <Row className={sytles['wrapper-title-tool']} justify="end">
                <Space size={16}>
                    {newToolBarRender.map((val, index) => {
                        return <Col key={index}>{val}</Col>;
                    })}
                </Space>
            </Row>
        </Row>;
    }, [title, toolBarRender]);
    return { wrapperTitle };
};

export default useWrapperTitle;

/*
 * @Descripttion: 
 * @Author: tanwei
 * @Date: 2020-11-22 18:31:47
 * @LastEditors: tanwei
 * @LastEditTime: 2021-01-31 16:39:10
 * @FilePath: /open-platform/src/components/WrapperModal/useWrapperTitle/index.tsx
 */
import React, { useMemo, useState } from 'react';
import { Row, Col, Space, } from 'antd';
import TableSize from '@/components/WrapperTable/useWrapperTitle/tableSize';
import TableSetting from '@/components/WrapperTable/useWrapperTitle/tableSetting';
import sytles from './index.module.less';

const useWrapperTitle = ({ title, toolBarRender, size, tableSettingColumns }) => {
    const [wrapperSize, setWrapperSize] = useState(size);
    const [filterColnmnsKey, setFilterColnmnsKey] = useState(tableSettingColumns.map(val => val.value));

    const wrapperTitle = useMemo(() => {
        let newToolBarRender = [
            <TableSize setWrapperSize={setWrapperSize} wrapperSize={wrapperSize} />,
            <TableSetting setFilterColnmnsKey={setFilterColnmnsKey} filterColnmnsKey={filterColnmnsKey} columns={tableSettingColumns} />
        ];
        toolBarRender && (newToolBarRender = [...toolBarRender, ...newToolBarRender]);
        return () => <Row className={sytles['wrapper-title']} justify="space-between" align={'middle'} >
            <Col><h3 className={sytles['wrapper-title-text']}>{title && title()}</h3></Col>
            <Row className={sytles['wrapper-title-tool']} justify="end">
                <Space size={16}>
                    {newToolBarRender?.map((val, index) => {
                        return <Col key={index}>{val}</Col>;
                    })}
                </Space>
            </Row>
        </Row>;
    }, [title, toolBarRender, wrapperSize, filterColnmnsKey]);
    return { wrapperTitle, wrapperSize, filterColnmnsKey };
};

export default useWrapperTitle;

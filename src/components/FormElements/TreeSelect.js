import React from 'react';
import { TreeSelect } from 'antd';

const defaultConfig = {
    allowClear: true,
    showSearch: true,
    treeNodeFilterProp: 'title',
    placeholder: "请选择",
};

const Index = ({ children, ...filedProps }) => {
    return (
        <TreeSelect
            {...defaultConfig}
            {...filedProps}
        >
            {children}
        </TreeSelect>
    );
};


export default Index;

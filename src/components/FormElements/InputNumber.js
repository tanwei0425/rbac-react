import React from 'react';
import { InputNumber } from 'antd';
const defaultConfig = {
    autoComplete: 'off',
    placeholder: "请输入",
};
const Index = ({ style, ...filedProps }) => {
    return (
        <InputNumber
            style={{ width: '100%', ...style }}
            {...defaultConfig}
            {...filedProps}
        />
    );
};

export default Index;

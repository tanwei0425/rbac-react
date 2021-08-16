import React from 'react';
import { Radio } from 'antd';
const defaultConfig = {
    allowClear: true,
    placeholder: "请选择",
};
const Index = ({ children, options, optionType, ...filedProps }) => {
    const optionsData = children || options;
    return (
        <Radio.Group
            {...defaultConfig}
            {...filedProps}
        >
            {optionsData?.map(val => {
                return optionType === 'button' ?
                    <Radio.Button key={val?.key} disabled={val?.disabled} value={val?.key}>{val?.value}</Radio.Button> :
                    <Radio key={val?.key} disabled={val?.disabled} value={val?.key}>{val?.value}</Radio>;
            })}
        </Radio.Group>
    );
};

export default Index;

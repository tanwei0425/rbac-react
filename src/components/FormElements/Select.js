import React from 'react';
import { Select, Tooltip } from 'antd';
const { Option } = Select;
const defaultConfig = {
    allowClear: true,
    placeholder: "请选择",
};
const Index = ({ children, options, isTooltip = false, ...filedProps }) => {
    const optionsData = children || options;
    return (
        <Select  {...defaultConfig} {...filedProps}>
            {optionsData?.map(val => {
                return <Option key={val.key} disabled={val.disabled}>
                    {isTooltip ?
                        <Tooltip placement="left" title={val.value}>{val.value}</Tooltip> :
                        val.value
                    }
                </Option>;
            })}
        </Select>
    );
};


export default Index;

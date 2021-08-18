import React from 'react';
import { Input } from 'antd';
const defaultConfig = {
    autoComplete: 'off',
    allowClear: true,
    placeholder: "请输入",
    maxLength: 50,
};
const Index = (filedProps) => {
    return (
        <Input {...defaultConfig} {...filedProps} />
    );
};
const Password = (filedProps) => {
    return (
        <Input.Password {...defaultConfig} {...filedProps} />
    );
};
const TextArea = (filedProps) => {
    return (
        <Input.TextArea
            showCount={true}
            autoSize={{
                minRows: 2,
                maxRows: 5,
            }}
            {...defaultConfig}
            maxLength={500}
            {...filedProps}
        />
    );
};
const Search = (filedProps) => {
    return (
        <Input.Search  {...defaultConfig} {...filedProps} />
    );
};
const Group = ({ children, ...restFiledProps }) => {
    return (
        <Input.Group {...defaultConfig} {...restFiledProps} >
            {children}
        </Input.Group>
    );
};

Index.Password = Password;
Index.TextArea = TextArea;
Index.Search = Search;
Index.Group = Group;

export default Index;

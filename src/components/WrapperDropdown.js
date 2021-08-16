import React from 'react';
import { Dropdown } from 'antd';

const WrapperDropdown = (props) => {
    const { children, ...restProps } = props;

    return (
        <Dropdown
            trigger={['click']}
            {...restProps}
        >
            {children}
        </Dropdown>
    );
};

export default WrapperDropdown;

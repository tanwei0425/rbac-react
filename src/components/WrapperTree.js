import React from 'react';
import { Tree } from 'antd';

const WrapperTree = ({ ...restProps }) => {
    return (
        <Tree
            defaultExpandAll
            {...restProps}
        />
    );
};

export default WrapperTree;

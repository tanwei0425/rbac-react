import React from 'react';
import { Transfer } from 'antd';

const defaultConfig = {
    listStyle: {
        width: '100%',
        height: 420,
    },
    showSearch: true,
    showSelectAll: true,
};
const Index = (filedProps) => {
    return (
        <Transfer
            {...defaultConfig}
            {...filedProps}
        />
    );
};

export default Index;

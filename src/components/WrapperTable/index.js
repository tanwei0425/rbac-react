import React, { useCallback } from 'react';
import { Table } from 'antd';
import UseWrapperTitle from '@/components/WrapperTable/useWrapperTitle';
const Index = ({ title, toolBarRender, pagination, ...restProps }) => {
    const { wrapperTitle } = useCallback(
        () => UseWrapperTitle({ title, toolBarRender })
        , [title, toolBarRender]
    )();
    return (
        <div className={'t-table'}>
            <Table
                title={wrapperTitle}
                size={'small'}
                pagination={pagination === false ? pagination : {
                    size: "small",
                    showQuickJumper: true,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "80"],
                    showTotal: (total, range) => `显示${range[0]}到${range[1]}, 共 ${total} 条数据`,
                    ...pagination,
                }}
                {...restProps}
            />
        </div>

    );
};

export default Index;

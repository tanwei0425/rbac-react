import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import WrapperTable from '@/components/WrapperTable';
import SearchForm from '@/components/SearchForm';
import request from '@/services/notes/articleRecord';
import requestClassification from '@/services/notes/classification';
import FormConf from './formConf';
import { formatOptions } from '@/utils/utils';

const Index = () => {
    const [dataSource, setDataSource] = useState([]);
    const [allNotesClassData, setAllNotesClassData] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchFormData, setSearchFormData] = useState();
    const tableRequestRes = useRequest(request.getArticleRecordTable, { manual: true });
    const alllNotesClassRequestRes = useRequest(requestClassification.getAllNotesClassification, { manual: true });

    const getTableData = async () => {
        searchFormData?.classification && (searchFormData.classification = searchFormData.classification?.join());
        const data = {
            current: pagination.current,
            pageSize: pagination.pageSize,
            ...searchFormData,
        };
        const res = await tableRequestRes.run(data);
        if (res?.code === 200) {
            setDataSource(res?.data?.list || []);
            setPagination({ ...pagination, total: res?.data?.total });
        }
    };

    useEffect(() => {
        getAllNotesClass();
    }, []);

    const getAllNotesClass = async () => {
        const res = await alllNotesClassRequestRes.run();
        const { code, data = [] } = res;
        if (code === 200) {
            const newData = formatOptions(data, { title: 'name', value: 'id' }, { title: 'value', value: 'key' });
            setAllNotesClassData(newData);
        }
    };
    const onChange = (paginationConfig) => {
        setPagination({
            current: paginationConfig?.current,
            pageSize: paginationConfig?.pageSize,
        });
    };
    useEffect(() => {
        getTableData();
    }, [
        pagination?.current,
        pagination?.pageSize,
        searchFormData
    ]);

    const reset = () => {
        setPagination({ current: 1, pageSize: 10, total: 0 });
        setSearchFormData();
    };
    const onFinish = async (values) => {
        console.log(values, 'values');
        setPagination({ current: 1, pageSize: 10, total: 0 });
        setSearchFormData({ ...values });
    };
    const { searchFormSchema, columns } = FormConf(allNotesClassData);
    return (
        <>
            <SearchForm
                loading={tableRequestRes.loading}
                reset={reset}
                formSchema={searchFormSchema}
                collapseNum={3}
                formConfig={{
                    name: 'articleRecordSearchForm',
                    onFinish: onFinish
                }}
            />
            <WrapperTable
                dataSource={dataSource}
                columns={columns}
                rowKey={'id'}
                loading={tableRequestRes.loading}
                title={() => '文章访问记录列表'}
                onChange={onChange}
                pagination={pagination}
            />
        </>
    );
};

export default Index;

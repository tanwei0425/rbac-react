import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { useForm } from '@/components/FormElements';
import WrapperTable from '@/components/WrapperTable';
import WrapperButton from '@/components/WrapperButton';
import SearchForm from '@/components/SearchForm';
import request from '@/services/notes/classification';
import Operate from './operate';
import FormConf from './formConf';

const Index = () => {
    const [form] = useForm();
    const [dataSource, setDataSource] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchFormData, setSearchFormData] = useState({
        status: '1'
    });
    const [tableRecord, setTableRecord] = useState({});
    const [modalType, setModalType] = useState('');
    const iniModalConifg = {
        title: '操作',
        visible: false,
        width: 640,
    };
    const [modalConfig, setModalConfig] = useState(iniModalConifg);
    const detailsRequestRes = useRequest(request.getNotesClassificationDetail, { manual: true });
    const tableRequestRes = useRequest(request.getNotesClassificationTable, { manual: true });
    const createRequestRes = useRequest(request.createNotesClassification, { manual: true });
    const updateRequestRes = useRequest(request.updateNotesClassification, { manual: true });
    const deleteRequestRes = useRequest(request.deleteNotesClassification, { manual: true });

    const getDetail = async (id) => {
        const res = await detailsRequestRes.run({ id });
        if (res?.code === 200) {
            console.log(res?.data, 'res?.data');
            form.setFieldsValue({ ...res?.data });
        }
    };

    const modalChange = async (type, title, record) => {
        setModalType(type);
        if (type === 'update' || type === 'delete') {
            type === 'update' && getDetail(record.id);
            setTableRecord(record);
        }
        setModalConfig({ ...modalConfig, title, visible: true });
    };

    const hanleOnOk = async () => {
        if (modalType === 'create' || modalType === 'update') {
            form.validateFields()
                .then(async (values) => {
                    const request = modalType === 'update' ? updateRequestRes : createRequestRes;
                    modalType === 'update' && (values.id = tableRecord.id);
                    const res = await request.run(values);
                    if (res?.code === 200) {
                        window.message.success('操作成功');
                        hanleCancel();
                        getTableData();
                    }
                });
        } else if (modalType === 'delete') {
            const res = await deleteRequestRes.run({ id: tableRecord.id });
            if (res?.code === 200) {
                window.message.success('操作成功');
                hanleCancel();
                getTableData();
            }
        }
    };

    const hanleCancel = () => {
        setModalConfig(iniModalConifg);
        setModalType('');
        setTableRecord('');
        form?.resetFields();
    };
    const getTableData = async () => {
        const data = {
            current: pagination.current,
            pageSize: pagination.pageSize,
            ...searchFormData
        };
        const res = await tableRequestRes.run(data);
        if (res?.code === 200) {
            setDataSource(res?.data?.list || []);
            setPagination({ ...pagination, total: res?.data?.total });
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
        setSearchFormData({ status: '1' });
    };
    const onFinish = async (values) => {
        console.log(values, 'values');
        setPagination({ current: 1, pageSize: 10, total: 0 });
        setSearchFormData({ ...values });
    };
    const { formSchema, searchFormSchema, columns } = FormConf(modalChange);
    return (
        <>
            <SearchForm
                loading={tableRequestRes.loading}
                reset={reset}
                formSchema={searchFormSchema}
                formConfig={{
                    name: 'notesClassificationSearchForm',
                    onFinish: onFinish
                }}
            />
            <WrapperTable
                dataSource={dataSource}
                columns={columns}
                rowKey={'id'}
                loading={tableRequestRes.loading}
                title={() => '分类管理列表'}
                onChange={onChange}
                scroll={{ x: 'max-content' }}
                toolBarRender={[
                    <WrapperButton
                        type={'primary'}
                        onClick={() => modalChange('create', '添加分类')}
                        authButStatus='add-notes-classification'
                    >
                        添加分类
                    </WrapperButton>,
                ]}
                pagination={pagination}
            />
            <Operate
                modalType={modalType}
                formSchema={formSchema}
                tableRecord={tableRecord}
                formConfig={{
                    form,
                }}
                modalConfig={{
                    onOk: hanleOnOk,
                    onCancel: hanleCancel,
                    confirmLoading: detailsRequestRes.loading || createRequestRes.loading || updateRequestRes.loading || deleteRequestRes.loading,
                    ...modalConfig,
                }}
            />
        </>
    );
};

export default Index;

import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import BraftEditor from 'braft-editor';
import { useForm } from '@/components/FormElements';
import WrapperTable from '@/components/WrapperTable';
import WrapperButton from '@/components/WrapperButton';
import SearchForm from '@/components/SearchForm';
import request from '@/services/notes/article';
import requestClassification from '@/services/notes/classification';
import Operate from './operate';
import FormConf from './formConf';
import { formatOptions } from '@/utils/utils';
const Index = () => {
    const [form] = useForm();
    const [dataSource, setDataSource] = useState([]);
    const [allNotesClassData, setAllNotesClassData] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchFormData, setSearchFormData] = useState({
        status: '1'
    });
    const [tableRecord, setTableRecord] = useState({});
    const [modalType, setModalType] = useState('');
    const iniModalConifg = {
        title: '操作',
        visible: false,
        width: 900,
    };
    const [modalConfig, setModalConfig] = useState(iniModalConifg);
    const detailsRequestRes = useRequest(request.getNotesArticleDetail, { manual: true });
    const tableRequestRes = useRequest(request.getNotesArticleTable, { manual: true });
    const createRequestRes = useRequest(request.createNotesArticle, { manual: true });
    const updateRequestRes = useRequest(request.updateNotesArticle, { manual: true });
    const deleteRequestRes = useRequest(request.deleteNotesArticle, { manual: true });
    const alllNotesClassRequestRes = useRequest(requestClassification.getAllNotesClassification, { manual: true });

    const getDetail = async (id) => {
        const res = await detailsRequestRes.run({ id });
        if (res?.code === 200) {
            const { content, ...value } = res?.data;
            const contentVal = BraftEditor.createEditorState(content);
            form.setFieldsValue({ content: contentVal, ...value });
        }
    };

    const modalChange = async (type, title, record) => {
        setModalType(type);
        if (type === 'update' || type === 'delete') {
            type === 'update' && getDetail(record.id);
            setTableRecord(record);
        }
        setModalConfig({ ...modalConfig, width: type === 'delete' ? 640 : 900, title, visible: true });
    };

    const hanleOnOk = async () => {
        if (modalType === 'create' || modalType === 'update') {
            form.validateFields()
                .then(async (values) => {
                    const request = modalType === 'update' ? updateRequestRes : createRequestRes;
                    modalType === 'update' && (values.id = tableRecord.id);
                    values?.content && (values.content = values.content.toHTML());
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
        setModalConfig({ ...iniModalConifg, width: modalConfig.width });
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

    const reset = () => {
        setPagination({ current: 1, pageSize: 10, total: 0 });
        setSearchFormData({ status: '1' });
    };
    const onFinish = async (values) => {
        setPagination({ current: 1, pageSize: 10, total: 0 });
        setSearchFormData({ ...values });
    };

    const { formSchema, searchFormSchema, columns } = FormConf(modalChange, allNotesClassData);

    return (
        <>
            <SearchForm
                loading={tableRequestRes.loading}
                reset={reset}
                formSchema={searchFormSchema}
                formConfig={{
                    name: 'notesArticleSearchForm',
                    onFinish: onFinish
                }}
            />
            <WrapperTable
                dataSource={dataSource}
                columns={columns}
                rowKey={'id'}
                loading={tableRequestRes.loading}
                title={() => '文章管理列表'}
                onChange={onChange}
                scroll={{ x: 'max-content' }}
                toolBarRender={[
                    <WrapperButton
                        type={'primary'}
                        onClick={() => modalChange('create', '添加文章')}
                        authButStatus='add-notes-article'
                    >
                        添加文章
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

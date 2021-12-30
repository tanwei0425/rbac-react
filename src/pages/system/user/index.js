import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { DownloadOutlined } from '@ant-design/icons';
import { useForm } from '@/components/FormElements';
import WrapperTable from '@/components/WrapperTable';
import WrapperButton from '@/components/WrapperButton';
import SearchForm from '@/components/SearchForm';
import request from '@/services/user';
import roleRequest from '@/services/role';
import Operate from './operate';
import FormConf from './formConf';
import { formatOptions, exportStreamFile } from '@/utils/utils';
const Index = () => {
    const [form] = useForm();
    const [dataSource, setDataSource] = useState([]);
    const [roleAll, setRoleAll] = useState([]);

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
    const detailsRequestRes = useRequest(request.getUserDetail, { manual: true });
    const tableRequestRes = useRequest(request.getUserTable, { manual: true });
    const createRequestRes = useRequest(request.createUser, { manual: true });
    const updateRequestRes = useRequest(request.updateUser, { manual: true });
    const deleteRequestRes = useRequest(request.deleteUser, { manual: true });
    const reloadRequestRes = useRequest(request.reloadPwd, { manual: true });
    const exportUserRes = useRequest(request.exportUser, { manual: true });
    const allRoleRequestRes = useRequest(roleRequest.allRole, { manual: true });

    const getDetail = async (id) => {
        const res = await detailsRequestRes.run({ id });
        if (res.code === 200) {
            form.setFieldsValue({ ...res?.data });
        }
    };

    const getAllrole = async () => {
        const res = await allRoleRequestRes.run();
        if (res.code === 200) {
            res.data = formatOptions(res.data, { title: 'name', value: 'id' }, { title: 'value', value: 'key' }, true);
            setRoleAll(res.data || []);
        }
    };
    const modalChange = async (type, title, record) => {
        setModalType(type);
        if (type === 'create' || type === 'update') {
            getAllrole();
            type === 'update' && getDetail(record.id);
        }
        if (type === 'update' || type === 'delete' || type === 'reload') {
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
        } else if (modalType === 'reload') {
            const res = await reloadRequestRes.run({ id: tableRecord.id });
            if (res?.code === 200) {
                window.message.success('操作成功');
                hanleCancel();
                getTableData();
            }
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
        console.log(res, 'res');
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

    const exportUser = async () => {
        // window.message.warning('数据导出用时较长，请到浏览器下载列表中查看！', 6);
        const res = await exportUserRes.run(searchFormData);
        try {
            // 处理返回的文件流
            exportStreamFile(res?.data, res?.filename);
        } catch (error) {
            window.message.error('导出异常');
        }
    };

    const { formSchema, searchFormSchema, columns } = FormConf(modalChange);
    return (
        <>
            <SearchForm
                loading={tableRequestRes.loading}
                reset={reset}
                formSchema={searchFormSchema}
                formConfig={{
                    name: 'userSearchForm',
                    onFinish,
                }}
            />
            <WrapperTable
                dataSource={dataSource}
                columns={columns}
                rowKey={'id'}
                loading={tableRequestRes.loading}
                title={() => '用户管理列表'}
                onChange={onChange}
                toolBarRender={[
                    <WrapperButton
                        type={'dashed'}
                        authButStatus='export-user'
                        icon={<DownloadOutlined />}
                        onClick={exportUser}
                    >
                        导出用户
                    </WrapperButton>,
                    <WrapperButton
                        type={'primary'}
                        authButStatus='add-user'
                        onClick={() => modalChange('create', '添加用户')}
                    >
                        添加用户
                    </WrapperButton>,
                ]}
                pagination={pagination}
            />
            <Operate
                modalType={modalType}
                formSchema={formSchema}
                tableRecord={tableRecord}
                roleAll={roleAll}
                rolesLoading={allRoleRequestRes.loading}
                formConfig={{
                    form,
                    initialValues: {
                        status: '1'
                    }
                }}
                modalConfig={{
                    onOk: hanleOnOk,
                    onCancel: hanleCancel,
                    confirmLoading: detailsRequestRes.loading || createRequestRes.loading || updateRequestRes.loading || deleteRequestRes.loading || reloadRequestRes.loading,
                    ...modalConfig,
                }}
            />
        </>
    );
};

export default Index;

import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { useForm } from '@/components/FormElements';
import WrapperTable from '@/components/WrapperTable';
import WrapperButton from '@/components/WrapperButton';
import request from '@/services/menu';
import { arrayToTree, formatTreeSelect } from '@/utils/utils';
import Operate from './operate';
import FormConf from './formConf';

const Index = () => {
    const [form] = useForm();
    const [isRouterVal, setIsRouterVal] = useState();
    const [dataSource, setDataSource] = useState([]);
    const [treeData, setTreeData] = useState([]);
    const [tableRecord, setTableRecord] = useState({});
    const [modalType, setModalType] = useState('');
    const iniModalConifg = {
        title: '操作',
        visible: false,
        width: 640,
    };
    const [modalConfig, setModalConfig] = useState(iniModalConifg);
    const detailsRequestRes = useRequest(request.getMenuDetail, { manual: true });
    const tableRequestRes = useRequest(request.getMenuTable, { manual: true });
    const createRequestRes = useRequest(request.createMenu, { manual: true });
    const updateRequestRes = useRequest(request.updateMenu, { manual: true });
    const deleteRequestRes = useRequest(request.deleteMenu, { manual: true });

    const getDetail = async (id) => {
        const res = await detailsRequestRes.run({ id });
        if (res?.code === 200) {
            form.setFieldsValue({ ...res?.data });
            setIsRouterVal(res?.data?.isRouter);
        }
    };

    const modalChange = async (type, title, record) => {
        setModalType(type);
        if (type === 'update' || type === 'delete') {
            type === 'update' && getDetail(record.id);
            setTableRecord({ ...record });
        }
        setModalConfig({ ...modalConfig, title, visible: true });
    };

    const hanleOnOk = async () => {
        if (modalType === 'create' || modalType === 'update') {
            form.validateFields()
                .then(async (values) => {
                    values.cmpPath = values?.cmpPath || '';
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
        setIsRouterVal('0');
        form?.resetFields();
    };
    const getTableData = async () => {
        const res = await tableRequestRes.run();
        if (res?.code === 200) {
            const dataSource = arrayToTree(res?.data || []);
            const treeData = formatTreeSelect(dataSource, { title: 'name', value: 'id' });
            const topTreeData = [{ value: 0, title: '顶级', children: treeData }];
            setDataSource(dataSource);
            setTreeData(topTreeData);
        }
    };
    const formSchemaChange = (e) => {
        setIsRouterVal(e.target.value);
    };
    useEffect(() => {
        getTableData();
    }, []);

    const { columns, formSchema } = FormConf({ modalChange, formSchemaChange });
    return (
        <>
            {dataSource.length > 0 && <WrapperTable
                dataSource={dataSource}
                columns={columns}
                rowKey={'id'}
                loading={tableRequestRes.loading}
                title={() => '菜单管理列表'}
                toolBarRender={[
                    <WrapperButton
                        type={'primary'}
                        onClick={() => modalChange('create', '添加菜单')}
                        authButStatus='add-menu'
                    >
                        添加菜单
                    </WrapperButton>,
                ]}
                expandable={{
                    defaultExpandAllRows: true
                }}
                pagination={false}
            />}
            <Operate
                isRouterVal={isRouterVal}
                formSchema={formSchema}
                treeData={treeData}
                modalType={modalType}
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

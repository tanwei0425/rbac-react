import React, { useEffect, useState, useRef } from 'react';
import { useRequest } from 'ahooks';
import { useForm } from '@/components/FormElements';
import WrapperTable from '@/components/WrapperTable';
import WrapperModal from '@/components/WrapperModal';
import WrapperButton from '@/components/WrapperButton';
import SearchForm from '@/components/SearchForm';
import request from '@/services/role';
import userRequest from '@/services/user';
import commonRequest from '@/services/common';
import Operate from './operate';
import AssociateUser from './associateUser';
import RoleAuth from './roleAuth';
import FormConf from './formConf';
import { arrayToTree, formatTreeSelect, formatOptions } from '@/utils/utils';
const Index = () => {
    const [form] = useForm();
    const roleAuthRef = useRef();
    const [dataSource, setDataSource] = useState([]);
    const [allMenuElementApiData, setAllMenuElementApiData] = useState({});
    const [roleAuthDetailData, setRoleAuthDetailData] = useState({});
    const [userListData, setUserListData] = useState([]);
    const [userListTargetKeys, setUserListTargetKeys] = useState([]);
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
    const detailsRequest = useRequest(request.getRoleDetail, { manual: true });
    const tableRequest = useRequest(request.getRoleTable, { manual: true });
    const createRequest = useRequest(request.createRole, { manual: true });
    const updateRequest = useRequest(request.updateRole, { manual: true });
    const deleteRequest = useRequest(request.deleteRole, { manual: true });
    const getAssociateUserRequest = useRequest(request.getAssociateUser, { manual: true });
    const updateAssociateUserRequest = useRequest(request.updateAssociateUser, { manual: true });
    const roleAuthDetailRequest = useRequest(request.getRoleAuthDetail, { manual: true });
    const setRoleAuthRequest = useRequest(request.setRoleAuth, { manual: true });
    const userListRes = useRequest(userRequest.getAllUser, { manual: true });
    const allMenuElementApiRequest = useRequest(commonRequest.getAllMenuElementApi, { manual: true });


    const getDetail = async (id) => {
        const res = await detailsRequest.run({ id });
        if (res?.code === 200) form.setFieldsValue({ ...res?.data });
    };

    const modalChange = async (type, title, record) => {
        setModalType(type);
        setTableRecord(record);
        const putModalConfig = { ...modalConfig };
        if (type === 'update' || type === 'delete') {
            getDetail(record.id);
        }
        if (type === 'associateUser') {
            putModalConfig.width = 720;
            getUserListData();
            getAssociateUser(record.id);
        }
        if (type === 'roleAuth') {
            putModalConfig.width = 1100;
            getAllMenuElementApi();
            getRoleAuthDetail(record.id);
        }
        setModalConfig({ ...putModalConfig, title, visible: true });
    };

    const hanleOnOk = async () => {
        if (modalType === 'create' || modalType === 'update') {
            form.validateFields()
                .then(async (values) => {
                    const request = modalType === 'update' ? updateRequest : createRequest;
                    modalType === 'update' && (values.id = tableRecord.id);
                    const res = await request.run(values);
                    if (res?.code === 200) {
                        window.message.success('操作成功');
                        hanleCancel();
                        getTableData();
                    }
                });
        } else if (modalType === 'delete') {
            const res = await deleteRequest.run({ id: tableRecord.id });
            if (res?.code === 200) {
                window.message.success('操作成功');
                hanleCancel();
                getTableData();
            }
        } else if (modalType === 'associateUser') {
            form.validateFields()
                .then(async (values) => {
                    console.log(values, 'values');
                    const res = await updateAssociateUserRequest.run({ id: tableRecord.id, ...values });
                    if (res?.code === 200) {
                        window.message.success('操作成功');
                        hanleCancel();
                        getTableData();
                    }
                });
        } else if (modalType === 'roleAuth') {
            const current = roleAuthRef.current;
            /**
            * 菜单去掉全部的key
            */
            const menus = current?.checkableMenus?.filter(val => val !== 0);
            /**
             * 元素、接口 去掉前缀和菜单、全部的key
             */
            const elements = current?.checkableElements?.filter(val => !current?.checkableMenus?.includes(val) && val !== 0 && val !== "public");
            const apis = current?.checkableApis?.filter(val => !current?.checkableMenus?.includes(val) && val !== 0 && val !== "public");
            const res = await setRoleAuthRequest.run({
                id: tableRecord.id,
                menus,
                elements,
                apis,
            });
            if (res?.code === 200) {
                window.message.success('操作成功');
                hanleCancel();
                getTableData();
            }
            // 1.后端菜单、接口、元素  添加的时候  往权限表也同时添加一条信息
            // 2.获取权限详情的时候，需要关联一下表，在权限把菜单、接口、元素软删除和禁用的过滤掉
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
        const res = await tableRequest.run(data);
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

    const getUserListData = async () => {
        const res = await userListRes.run();
        if (res?.code === 200) setUserListData(res?.data || []);
    };
    const getAssociateUser = async (id) => {
        const res = await getAssociateUserRequest.run({ id });
        if (res?.code === 200) {
            const associateUser = res?.data || [];
            setUserListTargetKeys(associateUser);
            form.setFieldsValue({ associateUser });
        }
    };

    const getAllMenuElementApi = async () => {
        const res = await allMenuElementApiRequest.run();
        const { code, data } = res;
        if (code === 200) {
            // 添加全部顶级
            const menusTree = arrayToTree(data?.menus || []);
            const formatMenusTree = formatTreeSelect(menusTree, { title: 'name', value: 'permissionId' }, 'children', 'title', 'key', true);
            data.menus = [{
                key: 0,
                title: '全部',
                children: formatMenusTree
            }];
            data.elements = formatOptions(data.elements, { title: 'name', value: 'permissionId' }, { title: 'title', value: 'key' }, true);
            const publicElements = [];
            data.elements = data.elements?.filter(val => {
                if (val.menuId === 0) publicElements.push(val);
                return val.menuId !== 0;
            });
            data.publicElements = publicElements;
            data.apis = formatOptions(data.apis, { title: 'name', value: 'permissionId' }, { title: 'title', value: 'key' }, true);
            const publicApis = [];
            data.apis = data.apis?.filter(val => {
                if (val.menuId === 0) publicApis.push(val);
                return val.menuId !== 0;
            });
            data.publicApis = publicApis;
            console.log(data);
            setAllMenuElementApiData(data);
        }
    };
    const getRoleAuthDetail = async (id) => {
        const res = await roleAuthDetailRequest.run({ id: id, });
        const { code, data } = res;
        if (code === 200) setRoleAuthDetailData(data);
    };
    const transferChange = targetKeys => {
        console.log(targetKeys, 'targetKeys');
        setUserListTargetKeys([...targetKeys]);
    };
    const reset = () => {
        setPagination({ current: 1, pageSize: 10, total: 0 });
        setSearchFormData({ status: '1' });
    };

    const onFinish = async (values) => {
        console.log(values, 'values');
        setPagination({ current: 1, pageSize: 10, total: 0 });
        setSearchFormData({ ...values });
    };
    const { formSchema, searchFormSchema, associateUserFormSchema, columns } = FormConf(modalChange, transferChange);
    return (
        <>
            <SearchForm
                loading={tableRequest.loading}
                reset={reset}
                formSchema={searchFormSchema}
                formConfig={{
                    name: 'roleSearchForm',
                    onFinish: onFinish
                }}
            />
            <WrapperTable
                dataSource={dataSource}
                columns={columns}
                rowKey={'id'}
                loading={tableRequest.loading}
                title={() => '角色管理列表'}
                onChange={onChange}
                toolBarRender={() => [
                    <WrapperButton
                        type={'primary'}
                        onClick={() => modalChange('create', '添加角色')}
                        authButStatus='add-role'
                    >
                        添加角色
                    </WrapperButton>,
                ]}
                pagination={pagination}
            />
            <WrapperModal
                onOk={hanleOnOk}
                onCancel={hanleCancel}
                confirmLoading={detailsRequest.loading || createRequest.loading || updateRequest.loading || deleteRequest.loading || allMenuElementApiRequest.loading || setRoleAuthRequest.loading}
                {...modalConfig}
            >
                {(modalType === 'create' || modalType === 'update') &&
                    <Operate
                        formSchema={formSchema}
                        formConfig={{
                            form,
                        }}
                    />
                }
                {modalType === 'delete' && <span>是否要删除角色名称为<span style={{ color: 'red', fontSize: 16 }}>{tableRecord?.name}</span>的角色，删除后数据不可恢复，请谨慎操作。</span>}
                {modalType === 'associateUser' &&
                    <AssociateUser
                        formSchema={associateUserFormSchema}
                        userListData={userListData}
                        userListTargetKeys={userListTargetKeys}
                        formConfig={{
                            form,
                        }}
                    />
                }
                {modalType === 'roleAuth' &&
                    <RoleAuth
                        loading={allMenuElementApiRequest.loading || roleAuthDetailRequest.loading}
                        roleAuthRef={roleAuthRef}
                        allMenuElementApiData={allMenuElementApiData}
                        roleAuthDetailData={roleAuthDetailData}
                    />
                }
            </WrapperModal>
        </>
    );
};

export default Index;

import React, { memo, useState, useEffect } from 'react';
import { Row, Menu, Col, Checkbox, Spin } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SettingOutlined,
    UserOutlined,
    EditOutlined,
    LoginOutlined,
    CheckCircleOutlined,
    IdcardOutlined,
    VerifiedOutlined,
} from '@ant-design/icons';
import { HeartIcon } from '@/static/Icon';
import WrapperForm, { FormItem, useForm, FormRenderComponent } from '@/components/FormElements';
import WrapperDropdown from '@/components/WrapperDropdown';
import WrapperModal from '@/components/WrapperModal';
import { collapsedClick } from '@/stores/actions/commonAction';
import useSetSysTheme from '@/hooks/useSetSysTheme';
import useClearSysConfig from '@/hooks/useClearSysConfig';
import { useRequest } from 'ahooks';
import commonRequest from '@/services/common';
import styles from './layouts.module.less';

const UseHeader = () => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const { setSkin, loading } = useSetSysTheme();
    const clearSysConfig = useClearSysConfig();

    const { collapsed, navigationMode, userInfo } = useSelector((state) => state.common);
    const [modalType, setModalType] = useState('');
    const [menuItemData, setMenuItemData] = useState({});
    const [dropVisible, setDropVisible] = useState(false);
    const iniModalConifg = {
        title: '操作',
        visible: false,
        width: 640,
    };
    const [modalConfig, setModalConfig] = useState(iniModalConifg);
    const signOutRequest = useRequest(commonRequest.signOut, { manual: true, });
    const updatePasswordRequest = useRequest(commonRequest.updatePassword, { manual: true, });
    useEffect(() => {
        setMenuItemData({
            username: userInfo?.username,
            roles: userInfo?.roles?.map((val, index) => {
                if (index + 1 !== userInfo?.roles?.length) {
                    val.name = val?.name + '，';
                }
                return val?.name;
            }),
            orgName: userInfo?.orgName,
            name: userInfo?.name,
        });

    }, []);
    const menuActonsChange = (e) => setSkin('displaySystemConfig', e.target.checked, `系统风格设置${e.target.checked ? '开启' : '关闭'}`);
    const menu =
        <Menu>
            <Menu.Item key="0" className={styles['t-layout-item']}>
                <p className={styles['t-layout-info-header-setting-item-name']}>
                    <UserOutlined className={styles['t-layout-info-header-setting-item-icon']} />
                    用户名称：<span className={styles['t-layout-info-header-setting-item-name-text']}>{menuItemData.username}</span>
                </p>
            </Menu.Item>
            <Menu.Item key="1" className={styles['t-layout-info-header-setting-item']}>
                <p className={styles['t-layout-info-header-setting-item-name']}>
                    <IdcardOutlined className={styles['t-layout-info-header-setting-item-icon']} />
                    角色类型：<span className={styles['t-layout-info-header-setting-item-name-text']}>{menuItemData.roles}</span>
                </p>
            </Menu.Item>
            <Menu.Item key="2" className={styles['t-layout-info-header-setting-item']}>
                <p className={styles['t-layout-info-header-setting-item-name']}>
                    <VerifiedOutlined className={styles['t-layout-info-header-setting-item-icon']} />
                    组织机构：<span className={styles['t-layout-info-header-setting-item-name-text']}>{menuItemData.orgName}</span>
                </p>
            </Menu.Item>
            <Menu.Item key="3" className={styles['t-layout-info-header-setting-item']}>
                <p className={styles['t-layout-info-header-setting-item-name']}>
                    <CheckCircleOutlined className={styles['t-layout-info-header-setting-item-icon']} />
                    真实姓名：<span className={styles['t-layout-info-header-setting-item-name-text']}>{menuItemData.name}</span>
                </p>
            </Menu.Item>
            <Menu.Divider />

            <Menu.Item key="displaySystemConfig" onClick={() => menuItemClick('displaySystemConfig')}>
                <Spin spinning={loading}>
                    <Checkbox
                        className={styles['t-layout-info-header-setting-item-action']}
                        onChange={menuActonsChange}
                        checked={navigationMode?.displaySystemConfig}
                    >
                        <span className={styles['t-layout-info-header-setting-text']}>显示系统风格设置</span>
                    </Checkbox>
                </Spin>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="editPwd" onClick={() => menuItemClick('editPwd')}>
                <EditOutlined className={styles['t-layout-info-header-setting-acitonIcon']} />
                <span className={styles['t-layout-info-header-setting-text']}>修改密码</span>
            </Menu.Item>
            <Menu.Item key="logout" onClick={() => menuItemClick('logout')}>
                <LoginOutlined className={styles['t-layout-info-header-setting-acitonIcon']} />
                <span className={styles['t-layout-info-header-setting-text']}>退出登录</span>
            </Menu.Item>
        </Menu>;

    const onCollapse = () => dispatch(collapsedClick(!collapsed));

    const onVisibleChange = (visible) => setDropVisible(visible);

    const menuItemClick = (type) => {
        setModalType(type);
        if (type === 'editPwd') {
            setModalConfig({ ...modalConfig, title: '修改密码', visible: true });
        } else if (type === 'logout') {
            setModalConfig({ ...modalConfig, title: '退出登录', okText: '退出', visible: true });
        }
        if (type !== 'displaySystemConfig') {
            setDropVisible(false);
        }
    };

    const hanleOnOk = async () => {
        if (modalType === 'logout') {
            setModalConfig({ ...modalConfig, confirmLoading: true });
            const res = await signOutRequest.run();
            if (res.code === 200) {
                hanleCancel();
                // 清除系统风格配置
                clearSysConfig('退出成功');
            }
        } else if (modalType === 'editPwd') {
            form.validateFields()
                .then(async (values) => {
                    if (values.newPassword !== values.confirmPassword) {
                        form.setFields([
                            {
                                name: 'confirmPassword',
                                value: '',
                                errors: ["两次输入密码不一致"],
                            },
                        ]);
                        return;
                    }
                    delete values.confirmPassword;
                    console.log(values);
                    setModalConfig({ ...modalConfig, confirmLoading: true });
                    const res = await updatePasswordRequest.run(values);
                    if (res.code === 200) {
                        window.message.success('修改成功');
                        hanleCancel();
                    } else {
                        setModalConfig({ ...modalConfig, confirmLoading: false });
                    }
                }).catch(errorInfo => {
                    console.log(errorInfo, 'errorInfo');
                    setModalConfig({ ...modalConfig, confirmLoading: false });
                });
        }
    };

    const hanleCancel = () => {
        setModalConfig(iniModalConifg);
        form.resetFields();
    };

    const renderModalInfo = () => {
        if (modalType === 'editPwd') {
            const formSchema = [
                {
                    className: "formItem",
                    name: "password",
                    label: '旧密码',
                    rules: [{ required: true, whitespace: true, message: "旧密码不能为空！" }],
                    fieldProps: {
                        componentType: "password",
                        placeholder: "请输入旧密码",
                    },
                },
                {
                    className: "formItem",
                    name: "newPassword",
                    label: '新密码',
                    rules: [
                        { required: true, whitespace: true, message: "新密码不能为空" },
                        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '密码为8-16位数字和大小字母' },
                    ],
                    fieldProps: {
                        componentType: "password",
                        placeholder: "请输入新密码",
                    },
                },
                {
                    className: "formItem",
                    name: "confirmPassword",
                    label: '确认新密码',
                    rules: [
                        { required: true, whitespace: true, message: "确认新密码不能为空" },
                        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '密码为8-16位数字和大小字母' },
                    ],
                    fieldProps: {
                        componentType: "password",
                        placeholder: "请再次输入新密码",
                    },
                },
            ];
            return <WrapperForm
                name="editPwdForm"
                form={form}
            >
                {formSchema?.map(val => {
                    const { fieldProps, ...restFiled } = val;
                    return <FormItem
                        key={val.name}
                        {...restFiled}
                    >
                        <FormRenderComponent  {...fieldProps} />
                    </FormItem>;
                })}
            </WrapperForm>;
        } else if (modalType === 'logout') {
            return '是否确定退出登录？';
        }
    };

    return (
        <>
            <Row justify="space-between" align="middle">
                {navigationMode?.menuTrigger && <Col span={2}>
                    <span
                        className={styles['t-layout-trigger-icon']}
                        onClick={onCollapse}
                    >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </span>
                </Col>}
                <Col span={navigationMode?.menuTrigger ? 22 : 24}>
                    <Row justify="end" align="middle">
                        <HeartIcon className={styles['t-layout-info-header-name']} />
                        <span className={styles['t-layout-info-header-name']}>{menuItemData.username}</span>
                        <span
                            className={styles['t-layout-trigger-icon']}
                        >
                            <WrapperDropdown
                                overlay={menu}
                                overlayClassName={styles['t-layout-info-header-setting']}
                                visible={dropVisible}
                                onVisibleChange={onVisibleChange}
                            >
                                <SettingOutlined />
                            </WrapperDropdown>
                        </span>
                    </Row>
                </Col>
            </Row>
            <WrapperModal
                {...modalConfig}
                onOk={hanleOnOk}
                onCancel={hanleCancel}
            >
                {renderModalInfo()}
            </WrapperModal>
        </>
    );
};

export default memo(UseHeader);
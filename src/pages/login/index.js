import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import WrapperForm, { FormRenderComponent, FormItem } from '@/components/FormElements';
import WrapperButton from '@/components/WrapperButton';
import { useRequest } from 'ahooks';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { ColorChangeLogo } from '@/components/Logo';
import MeteorShowerBg from '@/components/MeteorShowerBg';
import { getLocalStorageItem } from "@/utils/utils";
import commonRequest from '@/services/common';
import styles from "./login.module.less";
import classnames from 'classnames';
import { message } from "antd";
import config from '@/config';
const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};
const Login = props => {
    const navigate = useNavigate();
    const [svgCaptcha, setSvgCaptcha] = useState('');
    const [uuid, setUuid] = useState('');
    const { loading, run } = useRequest(commonRequest.signIn, { manual: true });
    const captchaRes = useRequest(commonRequest.getCaptcha, { manual: true });
    const [formSchema] = useState([
        {
            name: "username",
            rules: [
                { required: true, message: "用户名不能为空！" },
                { max: 30, message: "用户名不能大于30位！" }
            ],
            fieldProps: {
                componentType: "input",
                prefix: <UserOutlined />,
                placeholder: "请输入用户名",
            },
        },
        {
            name: "password",
            rules: [{ required: true, message: "密码不能为空！" }],
            fieldProps: {
                componentType: "password",
                type: "password",
                prefix: <LockOutlined />,
                placeholder: "请输入密码",
            },
        },
        {
            name: "code",
            rules: [{ required: true, message: "验证码不能为空！" }],
            fieldProps: {
                componentType: "input",
                allowClear: false,
                placeholder: "请输入验证码",
            },
        }
    ]);

    useEffect(() => {
        const token = getLocalStorageItem('token');
        if (token) {
            window.message.warning('帐号已登录,请先退出');
            navigate('/');
        } else {
            getCaptcha();
        }
    }, []);

    const getCaptcha = async () => {
        const res = await captchaRes.run({
            uuid
        });
        if (res?.code === 200) {
            setSvgCaptcha(res.data.captcha);
            setUuid(res.data.uuid);
        }
    };
    const onFinish = async (values) => {
        const reqData = {
            username: values.username,
            password: values.password,
            code: values.code,
            uuid,
        };
        const res = await run(reqData);
        if (res?.code === 200) {
            // 直接href跳转，不用单独写请求用户信息了
            window.location.href = '/';
        } else {
            getCaptcha();
        }
    };

    const goRegister = () => {
        message.warning('暂未开放');
        // navigate('/register');
    };
    const loginClass = classnames(
        styles["login"], 't-login'
    );
    return (
        <MeteorShowerBg>
            <div className={loginClass}>
                <WrapperForm
                    name="loginForm"
                    {...layout}
                    className={styles["login-form"]}
                    onFinish={onFinish}
                    initialValues={{
                        username: 'ceshi',
                        password: '123456'
                    }}
                >
                    <FormItem>
                        <div className={styles['login-form-logo']}>
                            <ColorChangeLogo className={styles['login-form-logo-icon']} />
                            <span className={styles['login-form-logo-text']}>{config?.title}</span>
                        </div>
                    </FormItem>
                    {formSchema?.map(val => {
                        const { fieldProps, ...restFiled } = val;
                        if (restFiled.name === 'code') {
                            fieldProps.suffix = <span
                                className={styles['login-form-captcha']}
                                onClick={() => getCaptcha()}
                                dangerouslySetInnerHTML={{
                                    __html: svgCaptcha
                                }}>
                            </span>;
                        }
                        return <FormItem key={val?.name} {...restFiled}>
                            <FormRenderComponent {...fieldProps} />
                        </FormItem>;
                    })}
                    <FormItem>
                        <WrapperButton loading={loading} block type="primary" htmlType="submit" className={styles['login-form-button-submit']}>
                            登录
                        </WrapperButton>
                        <WrapperButton block onClick={goRegister} className={styles['login-form-button-register']}>
                            用户注册
                        </WrapperButton>
                    </FormItem>
                </WrapperForm>
            </div>
        </MeteorShowerBg>
    );
};

export default Login;


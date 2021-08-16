import React from 'react';
import { Form } from 'antd';
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

const { Item: FormItem, useForm } = Form;

const Index = ({ children, ...restProps }) => {
    return (
        <Form
            {...formItemLayout}
            name="wrapperForm"
            {...restProps}
        >
            {children}
        </Form>
    );
};

export {
    Index as default,
    FormItem,
    useForm
};

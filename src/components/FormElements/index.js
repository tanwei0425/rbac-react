/*
 * @Descripttion: 
 * @Author: tanwei
 * @LastEditors: tanwei
 * @Date: 2020-02-15 16:22:42
 * @LastEditTime: 2020-05-21 09:22:55
 */
import React from "react";
import WrapperForm, { FormItem, FormList, useForm } from '@/components/FormElements/WrapperForm';
import Input from '@/components/FormElements/Input';
import InputNumber from '@/components/FormElements/InputNumber';
import Select from '@/components/FormElements/Select';
import Radio from '@/components/FormElements/Radio';
import TreeSelect from '@/components/FormElements/TreeSelect';
import Transfer from '@/components/FormElements/Transfer';
import Color from '@/components/FormElements/Color';
import BraftEditor from '@/components/FormElements/BraftEditor';

const FormRenderComponent = ({ componentType, ...fieldProps }) => {
    switch (componentType) {
        case 'input':
            return <Input {...fieldProps} />;
        case 'password':
            return <Input.Password {...fieldProps} />;
        case 'textArea':
            return <Input.TextArea {...fieldProps} />;
        case 'inputSearch':
            return <Input.Search {...fieldProps} />;
        case 'inputGroup':
            return <Input.Group {...fieldProps} />;
        case 'inputNumber':
            return <InputNumber {...fieldProps} />;
        case 'select':
            return <Select {...fieldProps} />;
        case 'treeSelect':
            return <TreeSelect {...fieldProps} />;
        case 'transfer':
            return <Transfer {...fieldProps} />;
        case 'radio':
            return <Radio {...fieldProps} />;
        case 'color':
            return <Color {...fieldProps} />;
        case 'braftEditor':
            return <BraftEditor {...fieldProps} />;

        case 'dom':
            return fieldProps;
        default: return <span className="componentError">组件类型错误</span>;
    }
};

export {
    WrapperForm as default,
    FormRenderComponent,
    FormItem,
    FormList,
    useForm
};
import React, { useState } from 'react';
import { Space } from 'antd';
import classnames from 'classnames';
import WrapperForm, { FormItem, useForm, FormRenderComponent } from '@/components/FormElements';
import WrapperButton from '@/components/WrapperButton';
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const SearchForm = ({ formSchema = [], collapseNum = 2, moreActionDom, formConfig, loading, reset }) => {
    const [expand, setExpand] = useState(true);
    const [form] = useForm();
    const { className, ...restProps } = formConfig;
    const trigger = collapseNum && Array.isArray(formSchema) && formSchema.length > collapseNum;
    if (trigger) {
        formSchema?.forEach((val, index) => {
            if (index + 1 > collapseNum) {
                const extraStyle = { display: expand ? 'none' : 'flex' };
                val.style = val.style ? Object.assign(val.style, extraStyle) : extraStyle;
            }
        });
    }
    const searchFormClassNames = classnames(
        't-search-form-class',
        className,
    );

    const handleReset = () => {
        console.log(form, 'form');
        form.resetFields();
        reset && reset();
    };
    return (
        <WrapperForm
            name="searchFormClass"
            layout={'inline'}
            form={form}
            {...formItemLayout}
            {...restProps}
            className={searchFormClassNames}
        >
            {formSchema?.map(val => {
                const { fieldProps, ...restFiled } = val;
                return <FormItem key={val?.name} {...restFiled}>
                    <FormRenderComponent  {...fieldProps} />
                </FormItem>;
            })}
            <FormItem
                className={'searchFormBut'}
            >
                <Space>
                    <WrapperButton loading={loading} type="primary" htmlType="submit" >
                        查询
                    </WrapperButton>
                    <WrapperButton onClick={handleReset}>
                        重置
                    </WrapperButton>
                    {moreActionDom}
                    {trigger ?
                        <WrapperButton type="link" onClick={() => { setExpand(!expand); }}>
                            {expand ? '更多查询' : '收起'}
                        </WrapperButton> :
                        null
                    }
                </Space>
            </FormItem>
        </WrapperForm>
    );
};

export default SearchForm;

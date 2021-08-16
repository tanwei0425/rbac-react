import React from 'react';
import WrapperForm, { FormItem, FormRenderComponent } from '@/components/FormElements';
const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};
const Index = ({ formSchema, formConfig, userListData, userListTargetKeys }) => {
    console.log(userListTargetKeys, 'userListTargetKeys');
    return (
        <WrapperForm
            name="associateUserForm"
            {...formItemLayout}
            {...formConfig}
        >
            {formSchema?.map(val => {
                const { fieldProps, ...restFiled } = val;
                if (val?.name === 'associateUser') {
                    fieldProps.dataSource = userListData;
                    fieldProps.targetKeys = userListTargetKeys;
                    restFiled.initialValue = userListTargetKeys;
                }
                return <FormItem
                    key={val.name}
                    {...restFiled}
                >
                    <FormRenderComponent  {...fieldProps} />
                </FormItem>;
            })}
        </WrapperForm>
    );
};

export default Index;

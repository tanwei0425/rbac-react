import React from 'react';
import WrapperForm, { FormItem, FormRenderComponent } from '@/components/FormElements';


const Operate = ({ formSchema, formConfig }) => {
    return (
        <WrapperForm
            name="roleForm"
            {...formConfig}
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
        </WrapperForm>
    );
};

export default Operate;

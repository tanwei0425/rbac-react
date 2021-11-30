import React from 'react';
import WrapperForm, { FormItem, FormRenderComponent } from '@/components/FormElements';
import WrapperModal from '@/components/WrapperModal';

const Index = ({ formSchema, modalType, tableRecord, formConfig, modalConfig }) => {
    return (
        <WrapperModal
            {...modalConfig}
        >
            {(modalType === 'create' || modalType === 'update') &&
                <WrapperForm
                    name="elementForm"
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
            }
            {modalType === 'delete' && <span>是否要删除接口名称为<span style={{ color: 'red', fontSize: 16 }}>{tableRecord?.name}</span>的接口，删除后数据不可恢复，请谨慎操作。</span>}
        </WrapperModal>
    );
};

export default Index;

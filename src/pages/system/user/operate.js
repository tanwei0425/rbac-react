import React from 'react';
import WrapperForm, { FormItem, FormRenderComponent } from '@/components/FormElements';
import WrapperModal from '@/components/WrapperModal';

const Index = ({ formSchema, roleAll, rolesLoading, modalType, tableRecord, formConfig, modalConfig }) => {
    return (
        <WrapperModal
            {...modalConfig}
        >
            {(modalType === 'create' || modalType === 'update') &&
                <WrapperForm
                    name="userForm"
                    {...formConfig}
                >
                    {formSchema?.map(val => {
                        const { fieldProps, ...restFiled } = val;
                        if (val.name === 'username' && modalType === 'update') {
                            fieldProps.disabled = true;
                        }
                        if (val.name === 'roles') {
                            fieldProps.options = roleAll;
                            fieldProps.loading = rolesLoading;
                        }
                        return <FormItem
                            key={val.name}
                            {...restFiled}
                        >
                            <FormRenderComponent  {...fieldProps} />
                        </FormItem>;
                    })}
                </WrapperForm>}
            {modalType === 'reload' && <span>是否要重置该用户为初始密码？初始密码为：<span style={{ color: 'red', fontSize: 16 }}>123456</span></span>}
            {modalType === 'delete' && <span>是否要删除用户名称为<span style={{ color: 'red', fontSize: 16 }}>{tableRecord?.username}</span>的用户，删除后数据不可恢复，请谨慎操作。</span>}
        </WrapperModal>
    );
};

export default Index;

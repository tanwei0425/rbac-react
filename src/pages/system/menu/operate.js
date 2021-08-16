import React from 'react';
import WrapperForm, { FormItem, FormRenderComponent } from '@/components/FormElements';
import WrapperModal from '@/components/WrapperModal';
const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 14 },
};
const Index = ({ formSchema, isRouterVal, treeData, modalType, tableRecord, formConfig, modalConfig }) => {
    return (
        <WrapperModal
            {...modalConfig}
        >
            {(modalType === 'create' || modalType === 'update') && <WrapperForm
                name="menuForm"
                {...formItemLayout}
                {...formConfig}
            >

                {formSchema?.map((val) => {
                    const { fieldProps, ...restFiled } = val;
                    if (val.name === 'pid') {
                        fieldProps.treeData = treeData;
                    }
                    if (val.name === 'cmpPath') {
                        console.log(isRouterVal, 'isRouterVal');
                        if (isRouterVal !== '1') {
                            return null;
                        }
                    }
                    return (
                        <FormItem
                            key={val.name}
                            {...restFiled}
                        >
                            <FormRenderComponent {...fieldProps} />
                        </FormItem>
                    );
                })
                }
            </WrapperForm>}
            {modalType === 'delete' && <span>是否要删除菜单名称为<span style={{ color: 'red', fontSize: 16 }}>{tableRecord?.name}</span>的菜单，删除后数据不可恢复，请谨慎操作。</span>}
        </WrapperModal>
    );
};

export default Index;

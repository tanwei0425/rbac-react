import React from 'react';
import WrapperForm, { FormItem, FormList, FormRenderComponent } from '@/components/FormElements';
import WrapperModal from '@/components/WrapperModal';
import WrapperButton from '@/components/WrapperButton';
import { Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const formListItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const Index = ({ formSchema, modalType, tableRecord, formConfig, modalConfig }) => {
    return (
        <WrapperModal
            {...modalConfig}
        >
            {(modalType === 'create' || modalType === 'update') &&
                <WrapperForm
                    name="dictionaryForm"
                    {...formConfig}
                >
                    {formSchema?.map(val => {
                        const { fieldProps, formList, ...restFiled } = val;
                        if (formList && Array.isArray(formList)) {
                            return <FormList
                                key={val.name}
                                {...restFiled}
                            >
                                {(fields, { add, remove }) =>
                                    <>
                                        {fields.map(field =>
                                            <Space style={{ width: '84%', margin: 'auto 8%' }} key={field.key} align="baseline">
                                                {
                                                    formList?.map(item => {
                                                        console.log(fields, 'fields');
                                                        const { fieldProps, name, ...restFiled } = item;
                                                        return <FormItem
                                                            {...formListItemLayout}
                                                            {...field}
                                                            {...restFiled}
                                                            name={[field.name, name]}
                                                            fieldKey={[field.fieldKey, name]}
                                                        >
                                                            <FormRenderComponent  {...fieldProps} />
                                                        </FormItem>;
                                                    })
                                                }
                                                {fields.length > 1 && <MinusCircleOutlined onClick={() => remove(field.name)} />}
                                            </Space>
                                        )}
                                        <FormItem
                                            style={{ justifyContent: 'center', marginLeft: 29 }}
                                            {...formListItemLayout}
                                        >
                                            <WrapperButton type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                添加
                                            </WrapperButton>
                                        </FormItem>
                                    </>
                                }
                            </FormList>;
                        } else {
                            return <FormItem
                                key={val.name}
                                {...restFiled}
                            >

                                <FormRenderComponent  {...fieldProps} />
                            </FormItem>;
                        }
                    })}

                </WrapperForm>
            }
            {modalType === 'delete' && <span>是否要删除字典名称为<span style={{ color: 'red', fontSize: 16 }}>{tableRecord?.name}</span>的字典，删除后数据不可恢复，请谨慎操作。</span>}
        </WrapperModal>
    );
};

export default Index;

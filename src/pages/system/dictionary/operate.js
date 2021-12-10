import React from 'react';
import { Space, Divider } from 'antd';
import WrapperForm, { FormItem, FormList, FormRenderComponent } from '@/components/FormElements';
import WrapperModal from '@/components/WrapperModal';
import WrapperButton from '@/components/WrapperButton';
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
                        const { fieldProps, title, formList, ...restFiled } = val;
                        if (formList && Array.isArray(formList)) {
                            return <FormList
                                key={val.name}
                                {...restFiled}
                            >
                                {(fields, { add, remove }) =>
                                    <>
                                        <Divider orientation="left">{title}</Divider>
                                        {fields.map(field =>
                                            <Space style={{ width: '86%', marginLeft: '8%' }} key={field.key} align="baseline">
                                                {
                                                    formList?.map(item => {
                                                        const { fieldProps, name, label, ...restFiled } = item;
                                                        return <FormItem
                                                            {...formListItemLayout}
                                                            {...field}
                                                            {...restFiled}
                                                            label={`${label}${field.name + 1}`}
                                                            name={[field.name, name]}
                                                            fieldKey={[field.fieldKey, name]}
                                                        >
                                                            <FormRenderComponent  {...fieldProps} />
                                                        </FormItem>;
                                                    })
                                                }
                                                {fields.length > 1 && <MinusCircleOutlined style={{ fontSize: 18, marginLeft: 10, color: 'red' }} onClick={() => remove(field.name)} />}
                                            </Space>
                                        )}
                                        <FormItem
                                            style={{ justifyContent: 'center', marginLeft: 29 }}
                                            {...formListItemLayout}
                                        >
                                            <WrapperButton type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                添加字典数据
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

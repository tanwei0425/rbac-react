import { useSelector } from 'react-redux';
import { Tag } from 'antd';
import TableActionsRender from '@/components/WrapperTable/tableActionsRender';
import { EditIcon, DeleteIcon } from '@/static/Icon';
import { tableColumnToDict, dateTimeFormat } from '@/utils/utils';
const FormConf = (modalChange) => {
    const { dictAllData } = useSelector((state) => state.common);
    const formSchema = [
        {
            className: "formItem",
            name: "name",
            label: '字典名称',
            rules: [
                { required: true, whitespace: true, message: "字典名称不能为空" },
                { min: 2, max: 15, message: "字典名称长度在2到15个字符" },
            ],
            fieldProps: {
                componentType: "input",
                placeholder: "请输入字典名称",
            },
        },
        {
            className: "formItem",
            name: "code",
            label: '字典编码',
            rules: [
                { required: true, whitespace: true, message: "字典编码不能为空" },
                { min: 4, max: 35, message: "字典编码名长度在4到35个字符" },
            ],
            fieldProps: {
                componentType: "input",
                placeholder: "请输入字典编码",
            },
        },
        {
            className: "formItem",
            name: "status",
            label: '字典状态',
            rules: [{ required: true, message: "字典状态不能为空" }],
            initialValue: '1',
            fieldProps: {
                componentType: "radio",
                options: dictAllData?.status,
                placeholder: "请选择字典状态",
            },
        },
        {
            className: "formItem",
            name: "description",
            label: '字典描述',
            fieldProps: {
                componentType: "textArea",
                placeholder: "请输入字典描述",
                maxLength: 30,
            },
        },
        {
            name: "value",
            initialValue: [{ key: '', value: '' }],
            title: '字典数据',
            formList: [
                {
                    className: "formItem",
                    name: "key",
                    label: 'key',
                    rules: [
                        { required: true, whitespace: true, message: "key不能为空" },
                        { max: 15, message: "key长度不能超过15个字符" },
                    ],
                    fieldProps: {
                        componentType: "input",
                        placeholder: "请输入字典key",
                    },
                },
                {
                    className: "formItem",
                    name: "value",
                    label: 'value',
                    rules: [
                        { required: true, whitespace: true, message: "value不能为空" },
                        { max: 15, message: "value长度不能超过15个字符" },
                    ],
                    fieldProps: {
                        componentType: "input",
                        placeholder: "请输入字典value",
                    },
                },
            ]
        },
    ];
    const searchFormSchema = [
        {
            className: "serachFormItem",
            name: "name",
            label: '字典名称',
            fieldProps: {
                componentType: "input",
                placeholder: "请输入字典名称",
            },
        },
        {
            className: "serachFormItem",
            name: "code",
            label: '字典编码',
            fieldProps: {
                componentType: "input",
                placeholder: "请输入字典编码",
            },
        },
        {
            className: "serachFormItem",
            name: "status",
            label: '字典状态',
            initialValue: '1',
            fieldProps: {
                componentType: "select",
                options: dictAllData?.status,
                placeholder: "请选择字典状态",
            },
        },
    ];
    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            fixed: 'left',
            valueType: 'indexBorder',
            required: true,
            width: 80,
        },
        {
            title: '字典名称',
            dataIndex: 'name',
            fixed: 'left',
            width: 180,
            ellipsis: true,
            tip: '名称过长会自动收缩',
        },
        {
            title: '字典编码',
            dataIndex: 'code',
            ellipsis: true,
            width: 150,
            tip: '名称过长会自动收缩',
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 80,
            render(text) {
                const name = tableColumnToDict(dictAllData?.status, text);
                return <Tag color={text === '1' ? '#87d068' : '#ff4d4f'}>{name}</Tag>;
            }
        },
        {
            title: '描述',
            dataIndex: 'description',
            width: 150,
            ellipsis: true,
            tip: '名称过长会自动收缩',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            width: 180,
            render: (text) => dateTimeFormat(text)
        },
        {
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            width: 100,
            render: (text, record) => {
                const data = [
                    {
                        key: 'update',
                        icon: <EditIcon />,
                        onClick: (props) => modalChange('update', '编辑字典', props),
                        tip: '编辑字典',
                        type: "primary",
                        authButStatus: 'edit-dictionary',
                    },
                    {
                        key: 'delete',
                        icon: <DeleteIcon />,
                        onClick: (props) => modalChange('delete', '删除字典', props),
                        tip: '删除字典',
                        type: "primary",
                        danger: true,
                        authButStatus: 'delete-dictionary',
                    },
                ];
                return <TableActionsRender data={data} record={record} />;
            }
        }
    ];
    return {
        formSchema,
        searchFormSchema,
        columns,
    };

};
export default FormConf;
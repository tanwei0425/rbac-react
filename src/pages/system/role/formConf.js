import { useSelector } from 'react-redux';
import { Tag } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import TableActionsRender from '@/components/WrapperTable/tableActionsRender';
import { EditIcon, DeleteIcon, } from '@/static/Icon';
import { tableColumnToDict, dateTimeFormat } from '@/utils/utils';
const FormConf = (modalChange, transferChange) => {
    const { dictAllData } = useSelector((state) => state.common);
    const formSchema = [
        {
            className: "formItem",
            name: "name",
            label: '角色名称',
            rules: [
                { required: true, whitespace: true, message: "角色名称不能为空" },
                { min: 2, max: 18, message: "角色名称长度在2到18个字符" },
            ],
            fieldProps: {
                componentType: "input",
                placeholder: "请输入角色名称",
            },
        },
        {
            className: "formItem",
            name: "status",
            label: '角色状态',
            rules: [{ required: true, message: "角色状态不能为空" }],
            initialValue: '1',
            fieldProps: {
                componentType: "radio",
                options: dictAllData?.status,
                placeholder: "请选择角色状态",
            },
        },
        {
            className: "formItem",
            name: "description",
            label: '角色描述',
            fieldProps: {
                componentType: "textArea",
                placeholder: "请输入角色描述",
                maxLength: 30,
            },
        },
    ];
    const searchFormSchema = [
        {
            className: "serachFormItem",
            name: "name",
            label: '角色名称',
            fieldProps: {
                componentType: "input",
                placeholder: "请输入角色名称",
            },
        },
        {
            className: "serachFormItem",
            name: "status",
            label: '角色状态',
            initialValue: '1',
            fieldProps: {
                componentType: "select",
                options: dictAllData?.status,
                placeholder: "请选择角色状态",
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
            title: '角色名称',
            dataIndex: 'name',
            fixed: 'left',
            ellipsis: true,
            width: 200,
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
            title: '角色描述',
            dataIndex: 'description',
            ellipsis: true,
            width: 200,
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
            width: 160,
            render: (text, record) => {
                const data = [
                    {
                        key: 'update',
                        icon: <EditIcon />,
                        onClick: (props) => modalChange('update', '编辑角色', props),
                        tip: '编辑角色',
                        type: "primary",
                        authButStatus: 'edit-role',
                    },
                    {
                        key: 'roleAuth',
                        icon: <SafetyCertificateOutlined />,
                        onClick: (props) => modalChange('roleAuth', `${record.name} - 角色授权`, props),
                        // type: "primary",
                        tip: '角色授权',
                        authButStatus: 'permission-role',
                    },
                    {
                        key: 'delete',
                        icon: <DeleteIcon />,
                        onClick: (props) => modalChange('delete', '删除角色', props),
                        tip: '删除角色',
                        type: "primary",
                        danger: true,
                        authButStatus: 'delete-role',
                    },
                    {
                        key: 'associateUser',
                        onClick: (props) => modalChange('associateUser', `${record.name} - 关联用户`, props),
                        tip: '关联用户',
                        authButStatus: 'associateUser-role',
                    },
                ];
                return <TableActionsRender data={data} record={record} />;
            }
        }
    ];
    const associateUserFormSchema = [
        {
            className: "formItem",
            name: "associateUser",
            fieldProps: {
                componentType: "transfer",
                titles: [
                    <span style={{ color: '#1890ff' }}>未关联用户</span>,
                    <span style={{ color: '#87d068' }}>已关联用户</span>
                ],
                targetKeys: [],
                dataSource: [],
                rowKey: record => record.id,
                render: item => item.username,
                onChange: (r) => transferChange(r),
                operations: ['关联用户', '解除关联'],
                pagination: true,
            },
        },
    ];
    return {
        formSchema,
        searchFormSchema,
        columns,
        associateUserFormSchema,
    };

};
export default FormConf;
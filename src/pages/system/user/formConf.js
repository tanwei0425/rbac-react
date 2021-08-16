import { useSelector } from 'react-redux';
import { Tag } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import TableActionsRender from '@/components/WrapperTable/tableActionsRender';
import { EditIcon, DeleteIcon } from '@/static/Icon';
import { tableColumnToDict, dateTimeFormat } from '@/utils/utils';
const FormConf = (modalChange) => {
    const { dictAllData } = useSelector((state) => state.common);
    const formSchema = [
        {
            className: "formItem",
            name: "username",
            label: '用户名称',
            rules: [
                { required: true, whitespace: true, message: "用户名称不能为空" },
                { min: 4, max: 18, message: "用户名长度在4到18个字符" },
            ],
            fieldProps: {
                componentType: "input",
                placeholder: "请输入用户名称",
            },
        },
        {
            className: "formItem",
            name: "status",
            label: '用户状态',
            rules: [{ required: true, message: "用户状态不能为空" }],
            fieldProps: {
                componentType: "select",
                options: dictAllData?.status,
                placeholder: "请选择用户状态",
            },
        },
        {
            className: "formItem",
            name: "roles",
            label: '用户角色',
            rules: [{ required: true, message: "用户角色不能为空" }],
            fieldProps: {
                componentType: "select",
                mode: "multiple",
                options: [],
                placeholder: "请选择用户角色",
            },
        },
        {
            className: "formItem",
            name: "name",
            label: '真实姓名',
            fieldProps: {
                componentType: "input",
                placeholder: "请输入真实姓名",
            },
        },
        {
            className: "formItem",
            name: "phone",
            label: '手机号',
            // validateTrigger: "onBlur",
            rules: [
                // { required: true, whitespace: true, message: "用户名称不能为空" },
                { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' },
            ],
            fieldProps: {
                componentType: "input",
                placeholder: "请输入手机号",
            },
        },

    ];
    const searchFormSchema = [
        {
            className: "serachFormItem",
            name: "username",
            label: '用户名称',
            fieldProps: {
                componentType: "input",
                placeholder: "请输入用户名称",
            },
        },
        {
            className: "serachFormItem",
            name: "name",
            label: '真实姓名',
            fieldProps: {
                componentType: "input",
                placeholder: "请输入真实姓名",
            },
        },
        {
            className: "serachFormItem",
            name: "status",
            label: '用户状态',
            initialValue: '1',
            fieldProps: {
                componentType: "select",
                options: dictAllData?.status,
                placeholder: "请选择用户状态",
            },
        },
    ];
    const columns = [
        {
            title: '用户名称',
            dataIndex: 'username',
        },
        {
            title: '真实姓名',
            dataIndex: 'name',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render(text) {
                const name = tableColumnToDict(dictAllData?.status, text);
                return <Tag color={text === '1' ? '#87d068' : '#ff4d4f'}>{name}</Tag>;
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            render: (text) => dateTimeFormat(text)

        },
        {
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            width: 130,
            render: (text, record) => {
                const data = [

                    {
                        key: 'update',
                        icon: <EditIcon />,
                        onClick: (props) => modalChange('update', '编辑用户', props),
                        tip: '编辑用户',
                        type: "primary",
                        authButStatus: 'edit-user'
                    },
                    {
                        key: 'reload',
                        icon: <ReloadOutlined />,
                        onClick: (props) => modalChange('reload', '重置密码', props),
                        tip: '重置密码',
                        authButStatus: 'reloadPwd-user'
                    },
                    {
                        key: 'delete',
                        icon: <DeleteIcon />,
                        onClick: (props) => modalChange('delete', '删除用户', props),
                        tip: '删除用户',
                        type: "primary",
                        danger: true,
                        authButStatus: 'delete-user'
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
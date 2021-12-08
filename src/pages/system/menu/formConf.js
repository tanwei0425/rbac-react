import { useSelector } from 'react-redux';
import { Tag } from 'antd';
import TableActionsRender from '@/components/WrapperTable/tableActionsRender';
import { EditIcon, DeleteIcon } from '@/static/Icon';
import { tableColumnToDict, dateTimeFormat } from '@/utils/utils';
const FormConf = ({ modalChange, formSchemaChange }) => {
    const { dictAllData } = useSelector((state) => state.common);
    const formSchema = [
        {
            className: "formItem",
            name: "pid",
            label: '上级菜单',
            rules: [
                { required: true, message: "上级菜单不能为空" },
            ],
            fieldProps: {
                componentType: "treeSelect",
                placeholder: "请选择上级菜单",
            },
        },

        {
            className: "formItem",
            name: "name",
            label: '菜单名称',
            rules: [
                { required: true, whitespace: true, message: "菜单名称不能为空" },
                { min: 2, max: 15, message: "菜单名长度在2到15个字符" },
            ],
            fieldProps: {
                componentType: "input",
                placeholder: "请输入菜单名称",
            },
        },
        {
            className: "formItem",
            name: "code",
            label: '菜单编码',
            rules: [
                { required: true, whitespace: true, message: "菜单编码不能为空" },
                { min: 4, max: 35, message: "菜单编码名长度在4到35个字符" },
            ],
            fieldProps: {
                componentType: "input",
                placeholder: "请输入菜单编码",
            },
        },
        {
            className: "formItem",
            name: "isRouter",
            label: '菜单类型',
            rules: [{ required: true, message: "菜单类型不能为空" }],
            initialValue: '0',
            fieldProps: {
                componentType: "radio",
                options: dictAllData?.menuType,
                onChange: (e) => formSchemaChange(e),
                placeholder: "请选择菜单类型",
            },
        },
        {
            className: "formItem",
            name: "isShow",
            label: '是否显示',
            rules: [{ required: true, message: "是否显示不能为空" }],
            initialValue: '1',
            fieldProps: {
                componentType: "radio",
                options: dictAllData?.isShow,
                placeholder: "请选择是否显示",
            },
        },
        {
            className: "formItem",
            name: "status",
            label: '菜单状态',
            rules: [{ required: true, message: "菜单状态不能为空" }],
            initialValue: '1',
            fieldProps: {
                componentType: "radio",
                options: dictAllData?.status,
                placeholder: "请选择菜单状态",
            },
        },
        {
            className: "formItem",
            name: "path",
            label: '路由地址',
            rules: [
                { required: true, whitespace: true, message: "路由地址不能为空" },
            ],
            fieldProps: {
                componentType: "input",
                placeholder: "请输入路由地址",
            },
        },
        {
            className: "formItem",
            name: "cmpPath",
            label: '组件路径',
            rules: [{ required: true, message: "组件路径不能为空" }],
            fieldProps: {
                componentType: "input",
                placeholder: "请输入组件路径",
            },
        },
        {
            className: "formItem",
            name: "icon",
            label: '菜单图标',
            fieldProps: {
                componentType: "input",
                placeholder: "请输入菜单图标",
            },
        },
        {
            className: "formItem",
            name: "sort",
            label: '排序',
            initialValue: 99,
            rules: [
                { required: true, message: "排序不能为空" },
            ],
            fieldProps: {
                componentType: "inputNumber",
                min: 1,
                max: 999,
                placeholder: "请输入排序",
            },
        },
        {
            className: "formItem",
            name: "description",
            label: '菜单描述',
            fieldProps: {
                componentType: "textArea",
                placeholder: "请输入菜单描述",
                maxLength: 30,
            },
        },
    ];
    const columns = [
        {
            title: '菜单名称',
            dataIndex: 'name',
            ellipsis: true,
            width: 180,
            fixed: 'left',
            tip: '名称过长会自动收缩',
        },
        {
            title: '菜单编码',
            dataIndex: 'code',
            width: 120,
            ellipsis: true,
            tip: '名称过长会自动收缩',
        },
        {
            title: '菜单类型',
            dataIndex: 'isRouter',
            width: 80,
            render(text) {
                const name = tableColumnToDict(dictAllData?.menuType, text);
                return <Tag color={text === '1' ? 'rgb(24, 144, 255)' : 'rgb(47, 84, 235)'}>{name}</Tag>;
            }
        },
        {
            title: '路由地址',
            dataIndex: 'path',
            width: 180,
            ellipsis: true,
            tip: '名称过长会自动收缩',
        },
        {
            title: '组件路径',
            dataIndex: 'cmpPath',
            width: 180,
            ellipsis: true,
            tip: '名称过长会自动收缩',
        },
        {
            title: '是否显示',
            dataIndex: 'isShow',
            width: 80,
            render(text) {
                const name = tableColumnToDict(dictAllData?.isShow, text);
                return <Tag color={text === '1' ? '#87d068' : '#ff4d4f'}>{name}</Tag>;
            }
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
            title: '图标',
            dataIndex: 'icon',
            width: 120,
        },
        {
            title: '排序',
            dataIndex: 'sort',
            width: 80,
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
                        onClick: (props) => modalChange('update', '编辑菜单', props),
                        tip: '编辑菜单',
                        type: "primary",
                        authButStatus: 'edit-menu',
                    },
                    {
                        key: 'delete',
                        icon: <DeleteIcon />,
                        onClick: (props) => modalChange('delete', '删除菜单', props),
                        tip: '删除菜单',
                        type: "primary",
                        danger: true,
                        authButStatus: 'delete-menu',
                    },
                ];
                return <TableActionsRender data={data} record={record} />;
            }
        }
    ];
    return {
        formSchema,
        columns,
    };

};
export default FormConf;
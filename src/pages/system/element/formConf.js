import { useSelector } from 'react-redux';
import { Tag } from 'antd';
import TableActionsRender from '@/components/WrapperTable/tableActionsRender';
import { EditIcon, DeleteIcon } from '@/static/Icon';
import { tableColumnToDict, dateTimeFormat } from '@/utils/utils';
const FormConf = (modalChange, menuTreeData = []) => {
    const { dictAllData } = useSelector((state) => state.common);
    const formSchema = [
        {
            className: "formItem",
            name: "name",
            label: '元素名称',
            rules: [
                { required: true, whitespace: true, message: "元素名称不能为空" },
                { min: 2, max: 18, message: "元素名称长度在2到18个字符" },
            ],
            fieldProps: {
                componentType: "input",
                placeholder: "请输入元素名称",
            },
        },
        {
            className: "formItem",
            name: "code",
            label: '元素编码',
            rules: [
                { required: true, whitespace: true, message: "元素编码不能为空" },
                { min: 2, max: 18, message: "元素编码名长度在2到18个字符" },
            ],
            fieldProps: {
                componentType: "input",
                placeholder: "请输入元素编码",
            },
        },
        {
            className: "formItem",
            name: "menuId",
            label: '所属菜单',
            rules: [
                { required: true, message: "所属菜单不能为空" },
            ],
            fieldProps: {
                componentType: "treeSelect",
                placeholder: "请选择所属菜单",
            },
        },
        {
            className: "formItem",
            name: "status",
            label: '元素状态',
            rules: [{ required: true, message: "元素状态不能为空" }],
            initialValue: '1',
            fieldProps: {
                componentType: "radio",
                options: dictAllData?.status,
                placeholder: "请选择元素状态",
            },
        },
        {
            className: "formItem",
            name: "description",
            label: '元素描述',
            fieldProps: {
                componentType: "textArea",
                placeholder: "请输入元素描述",
                maxLength: 30,
            },
        },
    ];
    const searchFormSchema = [
        {
            className: "serachFormItem",
            name: "name",
            label: '元素名称',
            fieldProps: {
                componentType: "input",
                placeholder: "请输入元素名称",
            },
        },
        {
            className: "serachFormItem",
            name: "menuId",
            label: '所属菜单',
            fieldProps: {
                componentType: "treeSelect",
                treeData: menuTreeData,
                placeholder: "请选择所属菜单",
            },
        },
        {
            className: "serachFormItem",
            name: "status",
            label: '元素状态',
            initialValue: '1',
            fieldProps: {
                componentType: "select",
                options: dictAllData?.status,
                placeholder: "请选择元素状态",
            },
        },
    ];
    const columns = [
        {
            title: '元素名称',
            dataIndex: 'name',
            fixed: 'left',
        },
        {
            title: '元素编码',
            dataIndex: 'code',
        },
        {
            title: '所属菜单',
            dataIndex: 'menuName',
            render(text, record) {
                return record?.menuId === 0 ? '公共接口' : text;
            }
        },
        {
            title: '状态',
            width: 80,
            dataIndex: 'status',
            render(text) {
                const name = tableColumnToDict(dictAllData?.status, text);
                return <Tag color={text === '1' ? '#87d068' : '#ff4d4f'}>{name}</Tag>;
            }
        },
        {
            title: '创建时间',
            width: 180,
            dataIndex: 'createdAt',
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
                        onClick: (props) => modalChange('update', '编辑元素', props),
                        tip: '编辑元素',
                        type: "primary",
                        authButStatus: 'edit-element',
                    },
                    {
                        key: 'delete',
                        icon: <DeleteIcon />,
                        onClick: (props) => modalChange('delete', '删除元素', props),
                        tip: '删除元素',
                        type: "primary",
                        danger: true,
                        authButStatus: 'delete-element',
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
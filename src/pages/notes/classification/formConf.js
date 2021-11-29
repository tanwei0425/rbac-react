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
            label: '分类名称',
            rules: [
                { required: true, whitespace: true, message: "分类名称不能为空" },
                { min: 2, max: 18, message: "分类名称长度在2到18个字符" },
            ],
            fieldProps: {
                componentType: "input",
                placeholder: "请输入分类名称",
            },
        },
        {
            className: "formItem",
            name: "color",
            label: '颜色标识',
            rules: [
                { required: true, whitespace: true, message: "颜色标识不能为空" },
            ],
            fieldProps: {
                componentType: "color",
                placeholder: "请输入颜色标识",
            },
        },

        {
            className: "formItem",
            name: "status",
            label: '分类状态',
            rules: [{ required: true, message: "分类状态不能为空" }],
            initialValue: '1',
            fieldProps: {
                componentType: "radio",
                options: dictAllData?.status,
                placeholder: "请选择分类状态",
            },
        },
        {
            className: "formItem",
            name: "description",
            label: '分类描述',
            fieldProps: {
                componentType: "textArea",
                placeholder: "请输入分类描述",
                maxLength: 30,
            },
        },
    ];
    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            valueType: 'indexBorder',
            width: 80,
        },
        {
            title: '分类名称',
            dataIndex: 'name',
            ellipsis: true,
            tip: '名称过长会自动收缩',
        },
        {
            title: '颜色标识',
            dataIndex: 'color',
            ellipsis: true,
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
            title: '分类描述',
            dataIndex: 'description',
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
                        onClick: (props) => modalChange('update', '编辑分类', props),
                        tip: '编辑分类',
                        type: "primary",
                        authButStatus: 'edit-api',
                    },
                    {
                        key: 'delete',
                        icon: <DeleteIcon />,
                        onClick: (props) => modalChange('delete', '删除分类', props),
                        tip: '删除分类',
                        type: "primary",
                        danger: true,
                        authButStatus: 'delete-api',
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
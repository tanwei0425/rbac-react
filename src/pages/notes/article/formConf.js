import { useSelector } from 'react-redux';
import { Tag } from 'antd';
import TableActionsRender from '@/components/WrapperTable/tableActionsRender';
import { EditIcon, DeleteIcon } from '@/static/Icon';
import { tableColumnToDict, dateTimeFormat } from '@/utils/utils';
const FormConf = (modalChange, allNotesClassData = []) => {
    const { dictAllData, userInfo } = useSelector((state) => state.common);
    const formSchema = [
        {
            className: "formItem",
            name: "title",
            label: '文章标题',
            rules: [
                { required: true, whitespace: true, message: "文章标题不能为空" },
                { min: 1, max: 30, message: "文章标题长度在1到30个字符" },
            ],
            fieldProps: {
                componentType: "input",
                placeholder: "请输入文章标题",
            },
        },
        {
            className: "formItem",
            name: "classification",
            label: '文章分类',
            rules: [
                { required: true, message: "文章分类不能为空" },
            ],
            fieldProps: {
                componentType: "select",
                options: allNotesClassData,
                placeholder: "请选择文章分类",
            },
        },

        {
            className: "formItem",
            name: "status",
            label: '文章状态',
            rules: [{ required: true, message: "文章状态不能为空" }],
            initialValue: '1',
            fieldProps: {
                componentType: "radio",
                options: dictAllData?.status,
                placeholder: "请选择文章状态",
            },
        },
        {
            className: "formItem",
            name: "author",
            label: '文章作者',
            rules: [
                { required: true, whitespace: true, message: "文章作者不能为空" },
            ],
            fieldProps: {
                componentType: "input",
                placeholder: "请输入文章作者",
            },
        },
        {
            className: "formItem",
            name: "readNumber",
            label: '浏览次数',
            initialValue: 0,
            rules: [
                { required: true, message: "浏览次数不能为空" },
            ],
            fieldProps: {
                componentType: "inputNumber",
                min: 0,
                disabled: userInfo?.isAdmin !== 1,
                max: 9999999,
                placeholder: "请输入浏览次数",
            },
        },
        {
            className: "formItem",
            name: "content",
            label: '文章内容',
            validateTrigger: 'onBlur',
            rules: [
                {
                    required: true,
                    validator: (_, value, callback) => {
                        if (!value || value.isEmpty()) {
                            callback('文章内容不能为空');
                        } else {
                            callback();
                        }
                    }
                }
            ],
            fieldProps: {
                componentType: "braftEditor",
                placeholder: "请输入文章内容",
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
    const searchFormSchema = [
        {
            className: "serachFormItem",
            name: "title",
            label: '文章标题',
            fieldProps: {
                componentType: "input",
                placeholder: "请输入文章标题",
            },
        },
        {
            className: "serachFormItem",
            name: "classification",
            label: '文章分类',
            fieldProps: {
                mode: "multiple",
                componentType: "select",
                options: allNotesClassData,
                placeholder: "请选择文章分类",
            },
        },
        {
            className: "serachFormItem",
            name: "status",
            label: '文章状态',
            initialValue: '1',
            fieldProps: {
                componentType: "select",
                options: dictAllData?.status,
                placeholder: "请选择文章状态",
            },
        },
        {
            className: "serachFormItem",
            name: "author",
            label: '文章作者',
            fieldProps: {
                componentType: "input",
                placeholder: "请输入文章作者",
            },
        },
        {
            className: "serachFormItem",
            name: "createUserName",
            label: '发布用户',
            fieldProps: {
                componentType: "input",
                placeholder: "请输入发布用户",
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
            title: '文章标题',
            dataIndex: 'title',
            fixed: 'left',
            width: 180,
            ellipsis: true,
            tip: '名称过长会自动收缩',
        },
        {
            title: '文章分类',
            dataIndex: 'classification',
            width: 150,
            render(text) {
                return tableColumnToDict(allNotesClassData, text);
            }
        },
        {
            title: '文章状态',
            dataIndex: 'status',
            width: 100,
            render(text) {
                const name = tableColumnToDict(dictAllData?.status, text);
                return <Tag color={text === '1' ? '#87d068' : '#ff4d4f'}>{name}</Tag>;
            }
        },
        {
            title: '文章作者',
            dataIndex: 'author',
            width: 100,
            ellipsis: true,
            tip: '名称过长会自动收缩',
        },
        {
            title: '发布用户',
            dataIndex: 'createUserName',
            width: 100,
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
            title: '修改时间',
            dataIndex: 'updatedAt',
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
                        onClick: (props) => modalChange('update', '编辑文章', props),
                        tip: '编辑文章',
                        type: "primary",
                        authButStatus: 'edit-notes-article',
                    },
                    {
                        key: 'delete',
                        icon: <DeleteIcon />,
                        onClick: (props) => modalChange('delete', '删除文章', props),
                        tip: '删除文章',
                        type: "primary",
                        danger: true,
                        authButStatus: 'delete-notes-article',
                    },
                ];
                return <TableActionsRender data={data} record={record} />;
            }
        }
    ];
    // columns[2].render = (text) => {

    //     console.log(allNotesClassData, 'allNotesClassData');
    //     const name = tableColumnToDict(allNotesClassData, text);
    //     console.log(name, 'name');
    //     return name;
    // };

    return {
        formSchema,
        searchFormSchema,
        columns,
    };

};
export default FormConf;
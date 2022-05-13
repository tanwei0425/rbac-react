import { tableColumnToDict, dateTimeFormat } from '@/utils/utils';

const FormConf = (allNotesClassData = []) => {
    const searchFormSchema = [
        {
            className: "serachFormItem",
            name: "title",
            label: '文章名称',
            fieldProps: {
                componentType: "input",
                placeholder: "请输入文章名称",
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
            name: "ip",
            label: 'IP地址',
            fieldProps: {
                componentType: "input",
                placeholder: "请输入IP地址",
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
            title: '文章名称',
            dataIndex: 'title',
            fixed: 'left',
            width: 180,
            ellipsis: true,
            tip: '文章名称过长会自动收缩',
        },
        {
            title: '文章分类',
            dataIndex: 'classification',
            width: 120,
            ellipsis: true,
            render(text) {
                return tableColumnToDict(allNotesClassData, text);
            }
        },
        {
            title: '文章作者',
            dataIndex: 'author',
            width: 100,
            ellipsis: true,
        },

        {
            title: 'IP地址',
            dataIndex: 'ip',
            width: 120,
        },
        {
            title: '设备',
            dataIndex: 'os',
            width: 280,
            ellipsis: true,
        },
        {
            title: '浏览器',
            dataIndex: 'browser',
            width: 280,
            ellipsis: true,
        },
        {
            title: '访问时间',
            dataIndex: 'createdAt',
            width: 180,
            render: (text) => dateTimeFormat(text)
        },
    ];
    return {
        searchFormSchema,
        columns,
    };

};
export default FormConf;
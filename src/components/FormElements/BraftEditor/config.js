
const controls = ['undo', 'redo', 'separator',
    'font-family', 'font-size', 'line-height', 'letter-spacing', 'separator',
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'superscript', 'subscript', 'remove-styles', 'separator',
    'text-indent', 'text-align', 'separator',
    'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
    'link', 'separator',
    'hr', 'emoji', 'separator',
    'clear', 'fullscreen',];

const fontFamilies = [
    {
        name: '宋体',
        family: 'SimSun'
    },
    {
        name: '黑体',
        family: 'SimHei'
    },
    {
        name: '楷体',
        family: 'KaiTi'
    },
    {
        name: '仿宋',
        family: 'FangSong'
    },
    {
        name: '新宋体',
        family: 'NSimSun'
    },
    {
        name: 'Araial',
        family: 'Arial, Helvetica, sans-serif'
    }, {
        name: 'Georgia',
        family: 'Georgia, serif'
    }, {
        name: 'Impact',
        family: 'Impact, serif'
    }, {
        name: 'Monospace',
        family: '"Courier New", Courier, monospace'
    }, {
        name: 'Tahoma',
        family: 'tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif'
    }
];

export {
    controls,
    fontFamilies
};
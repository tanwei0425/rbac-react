
import BraftEditor from 'braft-editor';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import 'braft-extensions/dist/code-highlighter.css';
import ColorPicker from 'braft-extensions/dist/color-picker';
import 'braft-extensions/dist/color-picker.css';

// 引入表情包组件样式文件
// import Emoticon, { defaultEmoticons } from 'braft-extensions/dist/emoticon';
// import 'braft-extensions/dist/emoticon.css';
// 也可以使用自己的表情包资源
// const emoticons = defaultEmoticons.map(item => require(`braft-extensions/dist/assets/${item}`));
// const emoticons = ['http://path/to/emoticon-1.png', 'http://path/to/emoticon-2.png', 'http://path/to/emoticon-3.png', 'http://path/to/emoticon-4.png', ...]

const useBraftExtensions = (id) => {
    const braftExtensions = () => {
        // 高亮代码
        BraftEditor.use(CodeHighlighter({
            includeEditors: [id],
            syntaxs: [
                {
                    name: 'JavaScript',
                    syntax: 'javascript'
                }, {
                    name: 'HTML',
                    syntax: 'html'
                }, {
                    name: 'CSS',
                    syntax: 'css'
                }, {
                    name: 'Java',
                    syntax: 'java',
                }, {
                    name: 'PHP',
                    syntax: 'php'
                }
            ]
        }));

        // 高级取色器
        BraftEditor.use(ColorPicker({
            includeEditors: [id],
            theme: 'light' // 支持dark和light两种主题，默认为dark
        }));

        // 自定义表情包
        // BraftEditor.use(Emoticon({
        //     includeEditors: [id],
        //     emoticons: emoticons
        // }));
    };
    return braftExtensions;
};

export default useBraftExtensions;
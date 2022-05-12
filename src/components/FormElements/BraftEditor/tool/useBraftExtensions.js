
import BraftEditor from 'braft-editor';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';

// import 'prismjs/components/prism-markup.min.js';
// import 'prismjs/components/prism-css.min.js';
// import 'prismjs/components/prism-less.min.js';
// import 'prismjs/components/prism-javascript.min.js';
// import 'prismjs/components/prism-jsx.min.js';
// import 'prismjs/components/prism-typescript.min.js';
// import 'prismjs/components/prism-tsx.min.js';

import ColorPicker from 'braft-extensions/dist/color-picker';
import Prism from 'prismjs';
import MaxLength from 'braft-extensions/dist/max-length';

const useBraftExtensions = ({ id, maxLengthNum }) => {
    const braftExtensions = () => {
        // 高亮代码
        BraftEditor.use(CodeHighlighter({
            includeEditors: [id],
            syntaxs: [
                { name: 'JavaScript', syntax: 'javascript' },
            ]
        }));

        // 高级取色器
        BraftEditor.use(ColorPicker({
            includeEditors: [id],
            theme: 'light' // 支持dark和light两种主题，默认为dark
        }));

        // 默认最大值
        BraftEditor.use(MaxLength({
            defaultValue: maxLengthNum, // 指定默认限制数，如不指定则为Infinity(无限)
            includeEditors: [id],
        }));
    };
    Prism.hooks.add(id, function (env) {
        env.element.innerHTML = env.element.innerHTML.replace(/<br\s*\/?>/g, '\n');
        env.code = env.element.textContent.replace(/^(?:\r?\n|\r)/, '');
    });
    Prism.highlightAll();
    return braftExtensions;
};

export default useBraftExtensions;
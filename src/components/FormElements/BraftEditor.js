import React, { useEffect } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import './BraftEditor.less';


const TBraftEditor = ({ ...restProps }) => {
    // 预览填充页面
    const buildPreviewHtml = () => {
        return `
      <!Doctype html>
      <html>
        <head>
          <title>预览效果</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">预览</div>
         
        </body>
      </html>
    `;
    };
    // <div class="container">${getFieldValue(fieldName).toHTML()}</div>
    const preview = () => {
        window.previewWindow && window.previewWindow.close();
        window.previewWindow = window.open();
        window.previewWindow.document.write(buildPreviewHtml());
        window.previewWindow.document.close();
    };
    const controls = ['undo', 'redo', 'separator',
        'font-family', 'font-size', 'line-height', 'letter-spacing', 'separator',
        'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
        'superscript', 'subscript', 'remove-styles', 'separator', 'text-indent', 'text-align', 'separator',
        'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
        'link', 'separator', 'hr', 'separator',
        'separator', 'clear', 'fullscreen', 'media'];
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
    const extendControls = [
        {
            key: 'custom-button',
            type: 'component',
            component:
                <button type="button" className="control-item button upload-button" data-title="预览">
                    <span onClick={preview}>预览</span>
                </button>

        },
    ];
    useEffect(() => {
        setTimeout(() => {
            // setFieldsValue({
            // [fieldName]: BraftEditor.createEditorState(formDataIni[fieldName])
            // });
        }, 0);
        // 返回一个函数代表清除
    }, []);
    return (
        <BraftEditor
            className="braft-editor"
            extendControls={extendControls}
            controls={controls}
            fontFamilies={fontFamilies}
            media={{
                accepts: {
                    // image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
                    image: 'image/png,image/jpeg,image/gif',
                    video: 'video/mp4',
                    audio: false,
                },
                externals: {
                    audio: false,
                    video: false,
                    image: false
                }
            }}
            placeholder="请输入正文内容"
        // {...componentProperties}
        />
    );
};

export default TBraftEditor;

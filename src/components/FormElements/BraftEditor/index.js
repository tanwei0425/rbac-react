import React from 'react';
import BraftEditor from 'braft-editor';
import { message } from 'antd';
import { controls, fontFamilies } from './config';
import usePreview from './tool/usePreview';
import useBraftExtensions from './tool/useBraftExtensions';

import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import 'braft-extensions/dist/color-picker.css';
import './index.less';



const TBraftEditor = ({ id, maxLength, value, onChange, ...restProps }) => {

  const preview = usePreview(value);
  const braftExtensions = useBraftExtensions({ id, maxLengthNum: maxLength });

  const extendControls = [
    preview, // 自定义预览功能
  ];

  // 扩展
  braftExtensions();

  const braftEditorChange = (data) => {
    onChange?.(data);
  };

  return (
    <BraftEditor
      className="braft-editor"
      controls={controls}
      fontFamilies={fontFamilies}
      extendControls={extendControls}
      onReachMaxLength={() => message.warning(`最大输入不能超过${maxLength}`)}
      {...restProps}
      value={value}
      onChange={(data) => braftEditorChange(data)}
      id={id}
    />
  );
};
export default TBraftEditor;

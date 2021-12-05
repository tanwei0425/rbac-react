import React, { useEffect } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { controls, fontFamilies } from './config';
import usePreview from './tool/usePreview';
import useBraftExtensions from './tool/useBraftExtensions';
import './index.less';

const TBraftEditor = ({ id, value, onChange, ...restProps }) => {

  const preview = usePreview(value);
  const braftExtensions = useBraftExtensions(id);

  const extendControls = [
    preview, // 自定义预览功能
  ];

  useEffect(() => {
    braftExtensions();
  }, []);

  const braftEditorChange = (data) => {
    onChange?.(data);
  };

  return (
    <BraftEditor
      className="braft-editor"
      controls={controls}
      fontFamilies={fontFamilies}
      extendControls={extendControls}
      {...restProps}
      value={value}
      onChange={(data) => braftEditorChange(data)}
      id={id}
    />
  );
};
export default TBraftEditor;

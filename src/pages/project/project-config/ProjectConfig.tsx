import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { InputNumber } from 'antd';
import Page from './page/Page';
import Main from './main/Main';
import Control from './control/Control';

import './ProjectConfig.less';

const ProjectConfig = () => {
  // 画布样式
  const [canvasStyle, setCanvasStyle] = useState({ width: 700, height: 500 });
  const location = useLocation();
  const id = location.state?.id;

  const changeCanvasStyle = (value: number, type: string) => {
    const cStyle = { ...canvasStyle, [type]: value };
    setCanvasStyle(cStyle);
  };

  return (
    <div className="edit-project-wrapper">
      <div className="edit-project-header">
        <span className="pull-left mr-10">头部</span>
        <InputNumber
          placeholder="请输入宽度"
          value={canvasStyle.width}
          style={{ width: 120 }}
          onChange={(value) => changeCanvasStyle(value ?? 0, 'width')}
        />
        <InputNumber
          placeholder="请输入高度"
          value={canvasStyle.height}
          style={{ width: 120, marginLeft: '10px' }}
          onChange={(value) => changeCanvasStyle(value ?? 0, 'height')}
        />
      </div>
      <div className="edit-project-main">
        <div className="edit-project-left">
          <Page />
        </div>
        <div className="edit-project-center">
          <Main />
        </div>
        <div className="edit-project-right">
          <Control />
        </div>
      </div>
    </div>
  );
};

export default ProjectConfig;

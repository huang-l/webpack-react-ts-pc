import React, { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { InputNumber } from 'antd';
import Page from './page/Page';
import Main from './main/Main';
import Control from './control/Control';

import styles from './ProjectConfig.less';

const ProjectConfig = () => {
  const location = useLocation();
  const id = location.state?.id;

  const [canvasStyle, setCanvasStyle] = useState({ width: 700, height: 500 }); // 画布样式
  const [pageId, setPageId] = useState(''); //选中的页面
  const [componentList, setComponentList] = useState([]); //当前选中页面所有组件集合

  // 修改画布样式
  const changeCanvasStyle = (value: number, type: string) => {
    const cStyle = { ...canvasStyle, [type]: value };
    setCanvasStyle(cStyle);
  };

  // 修改选中页面方法
  const changePageId = useCallback(() => (val: string) => setPageId(val), []);

  return (
    <div className={styles['edit-project-wrapper']}>
      <div className={styles['edit-project-header']}>
        <span className="float-left mr-10">头部</span>
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
      <div className={styles['edit-project-main']}>
        <div className={styles['edit-project-left']}>
          <Page changePageId={changePageId} />
        </div>
        <div className={styles['edit-project-center']}>
          <Main canvasStyle={canvasStyle} componentList={componentList} />
        </div>
        <div className={styles['edit-project-right']}>
          <Control />
        </div>
      </div>
    </div>
  );
};

export default ProjectConfig;

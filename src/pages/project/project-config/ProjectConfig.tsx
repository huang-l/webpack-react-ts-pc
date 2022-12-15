import React, { useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { InputNumber } from "antd";
import { compObject } from "@/interface/project";
import { cloneDeep } from "lodash";
import { boxConfigList, contentConfigList } from "./components/config";
import Page from "./page/Page";
import Main from "./main/Main";
import Control from "./control/Control";

import styles from "./ProjectConfig.less";

const ProjectConfig = () => {
  const location = useLocation();
  const id = location.state?.id;

  // 在一些点击事件逻辑中使用
  const tempCompList = useRef<Array<compObject>>([]); // 暂存组件列表数据
  const tempCompKey = useRef(""); // 暂存选中组件数据

  const [canvasStyle, setCanvasStyle] = useState({ width: 700, height: 500 }); // 画布样式
  const [pageId, setPageId] = useState(""); // 选中的页面
  const [compList, setCompList] = useState<Array<compObject>>([]); // 当前选中页面所有组件集合
  const [compKey, setCompKey] = useState(""); // 选中的组件
  const [rightKey, setRightKey] = useState("comp"); //右侧选中tab

  // 修改画布样式
  const changeCanvasStyle = (value: number, type: string) => {
    const cStyle = { ...canvasStyle, [type]: value };
    setCanvasStyle(cStyle);
  };

  // 修改选中页面方法
  const changePageId = useCallback((val: string) => setPageId(val), []);
  // 修改选中组件方法
  const changeCompKey = useCallback((val: string) => {
    tempCompKey.current = val;
    setCompKey(val);
  }, []);
  // 修改当前选中组件容器配置
  const changeBoxConfig = useCallback((val: any) => {
    const newList = tempCompList.current.map((comp) => {
      if (comp.key === tempCompKey.current) {
        comp = { ...comp, boxConfig: { ...val } };
      }
      return comp;
    });
    tempCompList.current = newList;
    setCompList(newList);
  }, []);

  // 修改当前选中组件内容配置
  const changeContentConfig = useCallback((val: any) => {
    const newList = tempCompList.current.map((comp) => {
      if (comp.key === tempCompKey.current) {
        comp = { ...comp, contentConfig: cloneDeep(val) };
      }
      return comp;
    });
    tempCompList.current = newList;
    setCompList(newList);
  }, []);

  // 修改右侧选中tab
  const changeRightKey = useCallback((val: string) => setRightKey(val), []);

  // 拖动组件放下
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const compKey = e.dataTransfer.getData("compKey");
    const component = boxConfigList.find((item) => item.key === compKey);
    if (!component?.key) return;
    const compLeft = e.dataTransfer.getData("compLeft");
    const compTop = e.dataTransfer.getData("compTop");
    const mainContent = document.getElementById("project-main-content");
    const editorRectInfo = mainContent?.getBoundingClientRect();
    let left = 0,
      top = 0;
    if (editorRectInfo) {
      left = e.clientX - editorRectInfo.x - compLeft;
      top = e.clientY - editorRectInfo.y - compTop;
    }
    const sameCompsIndex = compList
      .filter((c) => c.key.split("_")[0] === component.key)
      .map((item) => Number(item.key.split("_")[1]));
    const index = sameCompsIndex.length ? Math.max(...sameCompsIndex) + 1 : 0;
    const title = `${component.title}_${index + 1}`;
    const { width, height } = component;
    const newComponent = {
      key: `${compKey}_${index}`,
      boxConfig: { title, left, top, width, height },
      contentConfig:
        contentConfigList.find((item) => item.key === compKey)?.config || {},
    };
    const newList = compList.concat(newComponent);
    tempCompList.current = newList;
    setCompList(newList);
  };

  return (
    <div className={styles["edit-project-wrapper"]}>
      <div className={styles["edit-project-header"]}>
        <span className="float-left mr-10">头部</span>
        <InputNumber
          placeholder="请输入宽度"
          value={canvasStyle.width}
          style={{ width: 120 }}
          onChange={(value) => changeCanvasStyle(value ?? 0, "width")}
        />
        <InputNumber
          placeholder="请输入高度"
          value={canvasStyle.height}
          style={{ width: 120, marginLeft: "10px" }}
          onChange={(value) => changeCanvasStyle(value ?? 0, "height")}
        />
      </div>
      <div className={styles["edit-project-main"]}>
        <div className={styles["edit-project-left"]}>
          <Page changePageId={changePageId} />
        </div>
        <div className={styles["edit-project-center"]}>
          <div
            className={styles["main-wrapper"]}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <Main
              canvasStyle={canvasStyle}
              compList={compList}
              compKey={compKey}
              changeCompKey={changeCompKey}
              changeBoxConfig={changeBoxConfig}
            />
          </div>
        </div>
        <div className={styles["edit-project-right"]}>
          <Control
            pageId={pageId}
            rightKey={rightKey}
            compKey={compKey}
            compList={compList}
            changeRightKey={changeRightKey}
            changeBoxConfig={changeBoxConfig}
            changeContentConfig={changeContentConfig}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectConfig;

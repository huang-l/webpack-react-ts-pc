import React, { useRef, useState, useCallback, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";
import cookieService from "@/util/cookieService";
import { boxConfigList, contentConfigList } from "./components/config";
import ConfigHeader from "./header/ConfigHeader";
import Page from "./page/Page";
import Main from "./main/Main";
import Control from "./control/Control";

import styles from "./ProjectConfig.less";

const ProjectConfig = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [canvasStyle, setCanvasStyle] = useState({ width: 700, height: 500 }); // 画布样式
  const [pageId, setPageId] = useState(0); // 选中的页面

  // 在一些点击事件逻辑中使用
  const tempCompList = useRef<
    Array<{
      key: string;
      boxConfig: {
        left: number;
        top: number;
        width: number;
        height: number;
      };
      contentConfig: any;
    }>
  >([]); // 暂存组件列表数据
  const tempCompKey = useRef(""); // 暂存选中组件数据
  const [compList, setCompList] = useState<
    Array<{
      key: string;
      boxConfig: {
        left: number;
        top: number;
        width: number;
        height: number;
      };
      contentConfig: any;
    }>
  >([]); // 当前选中页面所有组件集合
  const [compKey, setCompKey] = useState(""); // 选中的组件
  const [rightKey, setRightKey] = useState("comp"); //右侧选中tab

  useLayoutEffect(() => {
    const token = cookieService.getCookie("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  // 修改画布样式
  const changeCanvasStyle = useCallback(
    (cStyle: { width: number; height: number }) => setCanvasStyle(cStyle),
    []
  );
  // 修改选中页面方法
  const changePageId = useCallback((val: number) => setPageId(val), []);
  // 修改右侧选中tab
  const changeRightKey = useCallback((val: string) => setRightKey(val), []);

  // 拖动组件放下
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const compKey = e.dataTransfer.getData("compKey");
    const component = boxConfigList.find(
      (item: { key: string }) => item.key === compKey
    );
    if (!component?.key) return;
    const compLeft = e.dataTransfer.getData("compLeft");
    const compTop = e.dataTransfer.getData("compTop");
    const mainContent = document.getElementById("project-main-content");
    const editorRectInfo = mainContent?.getBoundingClientRect();
    let left = 0,
      top = 0;
    const { width, height } = component;
    if (editorRectInfo) {
      left = e.clientX - editorRectInfo.x - compLeft;
      top = e.clientY - editorRectInfo.y - compTop;
      left < 0 && (left = 0);
      top < 0 && (top = 0);
      const maxLeft = canvasStyle.width - width;
      const maxTop = canvasStyle.height - height;
      left > maxLeft && (left = maxLeft);
      top > maxTop && (top = maxTop);
    }
    const sameCompsIndex = compList
      .filter((c) => c.key.split("_")[0] === component.key)
      .map((item) => Number(item.key.split("_")[1]));
    const index = sameCompsIndex.length ? Math.max(...sameCompsIndex) + 1 : 0;
    const title = `${component.text}_${index + 1}`;
    const newComponent = {
      key: `${compKey}_${index}`,
      boxConfig: { title, left, top, width, height },
      contentConfig:
        contentConfigList.find((item: { key: string }) => item.key === compKey)
          ?.config || {},
    };
    const newList = compList.concat(newComponent);
    tempCompList.current = newList;
    setCompList(newList);
  };

  // 修改选中组件方法
  const changeCompKey = useCallback((val: string) => {
    tempCompKey.current = val;
    setCompKey(val);
    setRightKey("config");
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

  // 删除当前选中容器
  const deleteComp = useCallback(() => {
    const newList = tempCompList.current.filter(
      (c) => c.key !== tempCompKey.current
    );
    tempCompList.current = newList;
    setCompList(newList);
    tempCompKey.current = "";
    setCompKey("");
    setRightKey("comp");
  }, []);

  return (
    <div className={styles["edit-project-wrapper"]}>
      <ConfigHeader
        id={params.id}
        canvasStyle={canvasStyle}
        changeCanvasStyle={changeCanvasStyle}
      />
      <div className={styles["edit-project-main"]}>
        <div className={styles["edit-project-left"]}>
          <Page projectId={params.id} changePageId={changePageId} />
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
              deleteComp={deleteComp}
            />
          </div>
        </div>
        <div className={styles["edit-project-right"]}>
          <Control
            canvasStyle={canvasStyle}
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

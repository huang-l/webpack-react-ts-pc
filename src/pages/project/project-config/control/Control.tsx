import React, { memo } from "react";
import { Tabs } from "antd";
import { compSvgList } from "../components/config";
import Config from "./Config";
import styles from "./Control.less";

const Control = (props: any) => {
  const { pageId, rightKey, compKey, compList, canvasStyle } = props;
  const svgList = pageId ? compSvgList : [];

  // 拖拽组件存储数据
  const handleDragStart = (e: any, key: string) => {
    const { offsetX, offsetY } = e.nativeEvent;
    e.dataTransfer.setData("compKey", key);
    e.dataTransfer.setData("compLeft", offsetX);
    e.dataTransfer.setData("compTop", offsetY);
  };

  const changeKey = (key: string) => {
    props.changeRightKey(key);
  };

  let comp;
  if (compKey) {
    comp = compList.find((c: { key: string }) => c.key === compKey);
  }

  const items = [
    {
      key: "comp",
      label: "控件",
      children: (
        <div className={styles["comp-wrapper"]}>
          {svgList.map((item) => {
            return (
              <img
                className={styles["comp-image"]}
                draggable="true"
                key={item.key}
                src={item.src}
                onDragStart={(e) => handleDragStart(e, item.key)}
              />
            );
          })}
        </div>
      ),
    },
    {
      key: "config",
      label: "配置",
      children: comp ? (
        <Config
          canvasStyle={canvasStyle}
          comp={comp}
          changeBoxConfig={props.changeBoxConfig}
          changeContentConfig={props.changeContentConfig}
        />
      ) : (
        "请选择组件"
      ),
    },
  ];

  return (
    <div className={styles["control"]}>
      <Tabs
        activeKey={rightKey}
        className={styles["right-tab"]}
        items={items}
        onChange={changeKey}
      />
    </div>
  );
};

export default memo(Control);

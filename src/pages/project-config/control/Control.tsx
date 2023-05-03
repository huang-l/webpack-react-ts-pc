import React, { memo } from "react";
import { Tabs } from "antd";
import { compTextList } from "../components/config";
import Config from "./Config";
import styles from "./Control.less";

const Control = (props: any) => {
  const { pageId, rightKey, compKey, compList, canvasStyle } = props;
  const textList = pageId ? compTextList : [];
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
          {textList.map((item: { key: string; text: string }) => {
            return (
              <div
                className={styles["comp-text"]}
                key={item.key}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, item.key)}
              >
                {item.text}
              </div>
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
    <Tabs
      activeKey={rightKey}
      className={styles["right-tab"]}
      items={items}
      onChange={changeKey}
    />
  );
};

export default memo(Control);

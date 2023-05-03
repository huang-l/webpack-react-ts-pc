import React, { createElement, memo } from "react";
import { Collapse, InputNumber } from "antd";
import MyTextConfig from "../components/text/Config";
import MyTextData from "../components/text/Data";
import styles from "./Config.less";

const Config = (props: any) => {
  const { comp, canvasStyle } = props;
  const { boxConfig, contentConfig } = comp;

  // 修改容器样式
  const changeBox = (value: number, attr: string) => {
    boxConfig[attr] = value;
    props.changeBoxConfig(boxConfig);
  };

  let styleConfig;
  let dataConfig;
  switch (comp.key.split("_")[0]) {
    case "MyText":
      styleConfig = MyTextConfig;
      dataConfig = MyTextData;
      break;
    default:
      break;
  }

  return (
    <Collapse defaultActiveKey={["1"]}>
      <Collapse.Panel header="容器配置" key="1">
        <div className={styles["comp-title"]}>{boxConfig.title}</div>
        {[
          ["left", "top"],
          ["width", "height"],
        ].map((item, index) => {
          const arr = [
            ["x", "y"],
            ["w", "h"],
          ];
          return (
            <div className="mb-10" key={index}>
              {item.map((ite, ind) => {
                let min = 0;
                ["width", "height"].includes(ite) && (min = 30);
                const maxObj: { [x: string]: number } = {
                  left: canvasStyle.width - boxConfig.width,
                  top: canvasStyle.height - boxConfig.height,
                  width: canvasStyle.width - boxConfig.left,
                  height: canvasStyle.height - boxConfig.top,
                };
                return (
                  <div className={styles["comp-pos"]} key={ite}>
                    <span className={styles["pos-label"]}>
                      {arr[index][ind]} :
                    </span>
                    <InputNumber
                      className="width-80"
                      value={boxConfig[ite]}
                      min={min}
                      max={maxObj[ite]}
                      onChange={(value) =>
                        changeBox(Math.trunc(value ?? min), ite)
                      }
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </Collapse.Panel>
      {styleConfig && (
        <Collapse.Panel header="样式配置" key="2">
          {createElement(styleConfig, {
            contentConfig,
            changeContentConfig: props.changeContentConfig,
          })}
        </Collapse.Panel>
      )}
      {dataConfig && (
        <Collapse.Panel header="数据配置" key="3">
          {createElement(dataConfig, {
            contentConfig,
            changeContentConfig: props.changeContentConfig,
          })}
        </Collapse.Panel>
      )}
    </Collapse>
  );
};

export default memo(Config);

import React, { memo } from "react";
import { cameraTypes } from "@/pages/three/businessTypes";
import { Select, InputNumber } from "antd";
import CommonBox from "@/common/CommonBox";
import { cloneDeep } from "lodash";

const Camera = (props: { [x: string]: any }) => {
  const { camera, cConfig } = props.config;
  const changeConfig = (val: number, type: string) => {
    const newConfig = cloneDeep(cConfig);
    newConfig[type] = val;
    props.changeConfig(newConfig, "cConfig");
  };
  return (
    <>
      <CommonBox
        label="模型类型"
        value={
          <Select
            className="width-140"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            placeholder="请选择模型类型"
            value={camera}
            onChange={(val) => props.changeConfig(val, "camera")}
          >
            {cameraTypes.map((item) => (
              <Select.Option key={item.key} value={item.key} title={item.value}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        }
      />
      {camera === "OrthographicCamera" && (
        <CommonBox
          label="系数"
          value={
            <InputNumber
              className="width-140"
              value={cConfig.ratio}
              onChange={(val) => changeConfig(val ?? 0, "ratio")}
            />
          }
        />
      )}
      {camera === "PerspectiveCamera" && (
        <CommonBox
          label="视场"
          value={
            <InputNumber
              className="width-140"
              value={cConfig.fov}
              onChange={(val) => changeConfig(val ?? 0, "fov")}
            />
          }
        />
      )}
    </>
  );
};

export default memo(Camera);

import React, { memo } from "react";
import { Select } from "antd";
import {
  modelTypes,
  geometryTypes,
  materialTypes,
} from "@/pages/three/businessTypes";
import CommonBox from "@/common/CommonBox";
import { geometryConfig, materialConfig } from "./config";

const Model = (props: any) => {
  const { config } = props;
  const { model, geometry, material, gConfig, mConfig } = config;

  return (
    <>
      <CommonBox
        label="模型类型"
        value={
          <Select
            className="width-140"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            placeholder="请选择模型类型"
            value={model}
            onChange={(val) => props.changeConfig(val, "model")}
          >
            {modelTypes.map((item) => (
              <Select.Option key={item.key} value={item.key} title={item.value}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        }
      />
      <CommonBox
        label="几何体类型"
        value={
          <Select
            className="width-140"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            placeholder="请选择几何体类型"
            value={geometry}
            onChange={(val) => props.changeConfig(val, "geometry")}
          >
            {geometryTypes.map((item) => (
              <Select.Option key={item.key} value={item.key} title={item.value}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        }
      />
      {geometry &&
        geometryConfig[geometry] &&
        React.createElement(geometryConfig[geometry], {
          gConfig,
          changeConfig: props.changeConfig,
        })}
      <CommonBox
        label="材质类型"
        value={
          <Select
            className="width-140"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            placeholder="请选择材质类型"
            value={material}
            onChange={(val) => props.changeConfig(val, "material")}
          >
            {materialTypes
              .filter((item) => item.key.toLocaleLowerCase().includes(model))
              .map((item) => (
                <Select.Option
                  key={item.key}
                  value={item.key}
                  title={item.value}
                >
                  {item.value}
                </Select.Option>
              ))}
          </Select>
        }
      />
      {materialConfig &&
        materialConfig[material] &&
        React.createElement(materialConfig[material], {
          mConfig,
          changeConfig: props.changeConfig,
        })}
    </>
  );
};

export default memo(Model);

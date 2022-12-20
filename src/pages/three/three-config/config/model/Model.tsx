import React, { memo, useState } from "react";
import { Select } from "antd";
import {
  modelTypes,
  geometryTypes,
  materialTypes,
} from "@/pages/three/businessTypes";
import CommonBox from "@/common/CommonBox";
import { geometryConfig, materialConfig } from "./config";
import { Radio } from "antd";

const Model = (props: any) => {
  const [showType, setShowType] = useState("geometry");

  const { model, geometry, material, gConfig, mConfig } = props.config;

  const options = [
    { label: "几何体", value: "geometry" },
    { label: "材质", value: "material" },
  ];

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
      <CommonBox
        label="配置"
        value={
          <Radio.Group
            options={options}
            onChange={(e) => setShowType(e.target.value)}
            value={showType}
            optionType="button"
            buttonStyle="solid"
          />
        }
      />
      {showType === "geometry" &&
        geometry &&
        geometryConfig[geometry] &&
        React.createElement(geometryConfig[geometry], {
          gConfig,
          changeConfig: props.changeConfig,
        })}
      {showType === "material" &&
        materialConfig &&
        materialConfig[material] &&
        React.createElement(materialConfig[material], {
          mConfig,
          changeConfig: props.changeConfig,
        })}
    </>
  );
};

export default memo(Model);

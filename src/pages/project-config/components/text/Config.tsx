import React, { memo } from "react";
import { InputNumber, Select, Input, Checkbox } from "antd";
import { fontWeights } from "@/pages/project-config/businessTypes";
import CommonBox from "@/common/CommonBox";

const HlTextConfig = (props: any) => {
  const { contentConfig } = props;

  // 修改内容配置
  const changeContentConfig = (
    val: number | string | boolean,
    attr: string
  ) => {
    contentConfig[attr] = val;
    props.changeContentConfig(contentConfig);
  };

  const { fontSize, fontWeight, color, ellipsis } = contentConfig;
  return (
    <>
      <CommonBox
        label="文字大小"
        value={
          <InputNumber
            className="width-140"
            min={12}
            value={fontSize}
            placeholder="请输入文字大小"
            onChange={(val) =>
              changeContentConfig(Math.trunc(val ?? 12), "fontSize")
            }
          />
        }
      />
      <CommonBox
        label="文字粗细"
        value={
          <Select
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            className="width-140"
            placeholder="请选择文字粗细"
            onChange={(val) => changeContentConfig(val, "fontWeight")}
            value={fontWeight}
          >
            {fontWeights.map((item) => (
              <Select.Option key={item.key} value={item.key} title={item.value}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        }
      />
      <CommonBox
        label="文字颜色"
        value={
          <Input
            type="color"
            value={color}
            onChange={(e) => changeContentConfig(e.target.value, "color")}
          />
        }
      />
      <CommonBox
        label="选项"
        value={
          <Checkbox
            checked={ellipsis}
            onChange={(e) => changeContentConfig(e.target.checked, "ellipsis")}
          >
            溢出隐藏
          </Checkbox>
        }
      />
    </>
  );
};

export default memo(HlTextConfig);

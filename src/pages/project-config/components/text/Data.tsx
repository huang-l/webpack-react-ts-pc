import React, { memo } from "react";
import { dataTypes } from "@/pages/project-config/businessTypes";
import { Radio, Input } from "antd";
import CommonBox from "@/common/CommonBox";

const HlTextData = (props: any) => {
  const { contentConfig } = props;

  // 修改内容配置
  const changeContentConfig = (val: number | string, attr: string) => {
    contentConfig[attr] = val;
    props.changeContentConfig(contentConfig);
  };

  const { dataType, value } = contentConfig;
  const options = dataTypes.map((item) => ({
    value: item.key,
    label: item.value,
  }));

  return (
    <>
      <CommonBox
        label="数据类型"
        value={
          <Radio.Group
            options={options}
            onChange={(e) => changeContentConfig(e.target.value, "dataType")}
            value={dataType}
            optionType="button"
            buttonStyle="solid"
          />
        }
      />
      {dataType === "static" && (
        <>
          <CommonBox
            label="显示数据"
            value={
              <Input
                placeholder="请输入显示数据"
                value={value}
                onChange={(e) => changeContentConfig(e.target.value, "value")}
              />
            }
          />
        </>
      )}
      {dataType === "dynamic" && <>请求接口数据显示。。。</>}
    </>
  );
};

export default memo(HlTextData);

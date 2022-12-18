import React, { memo } from "react";
import CommonBox from "@/common/CommonBox";
import { Input } from "antd";
import { cloneDeep } from "lodash";

const MeshBasicMaterial = (props: { [x: string]: any }) => {
  const { mConfig } = props;
  const changeConfig = (val: string, type: string) => {
    const newConfig = cloneDeep(mConfig);
    newConfig[type] = val;
    props.changeConfig(newConfig, "mConfig");
  };

  return (
    <>
      <CommonBox
        label="颜色"
        value={
          <Input
            className="width-140"
            type="color"
            value={mConfig.color}
            onChange={(e) => changeConfig(e.target.value, "color")}
          />
        }
      />
    </>
  );
};

export default { MeshBasicMaterial: memo(MeshBasicMaterial) };

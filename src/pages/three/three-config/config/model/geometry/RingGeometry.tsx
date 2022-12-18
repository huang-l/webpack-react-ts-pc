import React, { memo } from "react";
import CommonBox from "@/common/CommonBox";
import { InputNumber } from "antd";
import { cloneDeep } from "lodash";

const RingGeometry = (props: { [x: string]: any }) => {
  const { gConfig } = props;
  const changeConfig = (val: number, type: string) => {
    const newConfig = cloneDeep(gConfig);
    newConfig[type] = val;
    props.changeConfig(newConfig, "gConfig");
  };

  return (
    <>
      {["innerRadius", "outerRadius", "thetaSegments", "phiSegments"].map(
        (item) => (
          <CommonBox
            key={item}
            label={item}
            value={
              <InputNumber
                className="width-140"
                value={gConfig[item]}
                min={1}
                onChange={(val) => changeConfig(val ?? 1, item)}
              />
            }
          />
        )
      )}
    </>
  );
};

export default { RingGeometry: memo(RingGeometry) };

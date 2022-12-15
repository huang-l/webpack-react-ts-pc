import React, { memo } from "react";
import styles from "./Index.less";

const HlText = (props: any) => {
  const { contentConfig } = props;

  const { value, fontSize, fontWeight, color, ellipsis } = contentConfig;
  return (
    <div
      className={`${styles["hl-text"]} ${ellipsis ? `text-ellipsis` : ""}`}
      style={{ fontSize: `${fontSize}px`, fontWeight, color }}
    >
      {value}
    </div>
  );
};

export default { key: "HlText", component: memo(HlText) };

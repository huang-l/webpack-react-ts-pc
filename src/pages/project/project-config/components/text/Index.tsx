import React, { memo } from "react";
import styles from "./Index.less";

const HlText = (props: any) => {
  const { contentConfig } = props;

  const { value, fontSize, fontWeight, color, ellipsis, move } = contentConfig;
  return (
    <div
      className={`${styles["hl-text"]} ${
        ellipsis ? `text-ellipsis ${move ? styles["move"] : ""}` : ""
      }`}
      style={{ fontSize: `${fontSize}px`, fontWeight, color }}
    >
      {value}
    </div>
  );
};

export default { key: "HlText", component: memo(HlText) };

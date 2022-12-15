import React, { memo } from "react";
import styles from "./CommonBox.less";

const CommonBox = (props: any) => {
  return (
    <div className="mb-10">
      <div className={styles["edit-label"]}>{props.label}</div>
      <div className={styles["edit-value"]}>{props.value}</div>
    </div>
  );
};

export default memo(CommonBox);

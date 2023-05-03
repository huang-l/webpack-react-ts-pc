import React, { memo } from "react";
import styles from "./Index.less";

const MyButton = (props: any) => {
  const { contentConfig } = props;

  const { value } = contentConfig;
  return <div className={styles["my-button"]}>{value}</div>;
};

export default { key: "MyButton", component: memo(MyButton) };

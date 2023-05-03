import React, { memo } from "react";
import styles from "./ContextMenu.less";
const ContextMenu = (props: any) => {
  const { menuPos } = props;
  const onItemClick = (key: string) => {
    switch (key) {
      case "delete":
        props.deleteComp();
        break;
      default:
        break;
    }
    props.changeShowMenu(false);
  };
  return (
    <div
      className={styles["context-menu"]}
      style={{ left: menuPos.left, top: menuPos.top }}
    >
      <div
        className={styles["menu-item"]}
        onClick={() => onItemClick("delete")}
      >
        删除
      </div>
    </div>
  );
};

export default memo(ContextMenu);

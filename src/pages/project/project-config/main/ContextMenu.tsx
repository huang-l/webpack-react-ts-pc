import React, { memo, useMemo } from "react";
import { Menu } from "antd";
import styles from "./ContextMenu.less";
const ContextMenu = (props: any) => {
  const { menuPos } = props;
  const items = useMemo(() => [{ label: "删除", key: "delete" }], []);
  const onMenuClick = (e: { key: string }) => {
    const { key } = e;
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
      <Menu items={items} mode="inline" onClick={onMenuClick} />
    </div>
  );
};

export default memo(ContextMenu);

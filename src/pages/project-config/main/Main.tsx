import React, { createElement, memo, useState } from "react";
import ContextMenu from "./ContextMenu";
import Container from "./Container";
import MyText from "../components/text/Index";
import MyButton from "../components/button/Index";

import styles from "./Main.less";

const Main = (props: any) => {
  const { canvasStyle, compList, compKey } = props;
  const { width, height } = canvasStyle;

  // 右键菜单
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ left: 0, top: 0 });

  const changeShowMenu = (val: boolean) => setIsShowMenu(val);
  const changeMenuPos = (val: { left: number; top: number }) => setMenuPos(val);

  return (
    <div
      id="project-main-content"
      className={styles["project-main-content"]}
      style={{ width: `${width}px`, height: `${height}px` }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="smallGrid"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 8 0 L 0 0 0 8"
              fill="none"
              stroke="gray"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <rect width="80" height="80" fill="url(#smallGrid)" />
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="gray"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {compList.map((comp: any) => {
        const key = comp.key.split("_")[0];
        let component;
        switch (key) {
          case "MyText":
            component = MyText.component;
            break;
          case "MyButton":
            component = MyButton.component;
            break;
          default:
            break;
        }
        if (!component) return null;
        return (
          <Container
            key={comp.key}
            active={compKey === comp.key}
            compKey={comp.key}
            canvasStyle={canvasStyle}
            boxConfig={comp.boxConfig}
            changeCompKey={props.changeCompKey}
            changeBoxConfig={props.changeBoxConfig}
            changeShowMenu={changeShowMenu}
            changeMenuPos={changeMenuPos}
            child={
              <>
                {createElement(component, {
                  contentConfig: comp.contentConfig,
                })}
              </>
            }
          ></Container>
        );
      })}
      {isShowMenu && (
        <ContextMenu
          menuPos={menuPos}
          changeShowMenu={changeShowMenu}
          deleteComp={props.deleteComp}
        />
      )}
    </div>
  );
};

export default memo(Main);

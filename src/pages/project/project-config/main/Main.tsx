import React, { createElement, memo, useState } from "react";
import ContextMenu from "./ContextMenu";
import Container from "./Container";
import HlText from "../components/text/Index";
import HlButton from "../components/button/Index";

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
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {isShowMenu && (
        <ContextMenu
          menuPos={menuPos}
          changeShowMenu={changeShowMenu}
          deleteComp={props.deleteComp}
        />
      )}
      {compList.map((comp: any) => {
        const key = comp.key.split("_")[0];
        let component;
        switch (key) {
          case "HlText":
            component = HlText.component;
            break;
          case "HlButton":
            component = HlButton.component;
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
    </div>
  );
};

export default memo(Main);

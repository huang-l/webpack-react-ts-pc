import React, { createElement, memo } from "react";
import Container from "./Container";
import HlText from "../components/text/Index";
import HlButton from "../components/button/Index";

const Main = (props: any) => {
  const { canvasStyle, compList, compKey } = props;
  const { width, height } = canvasStyle;

  return (
    <div
      id="project-main-content"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
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
            boxConfig={comp.boxConfig}
            changeCompKey={props.changeCompKey}
            changeBoxConfig={props.changeBoxConfig}
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

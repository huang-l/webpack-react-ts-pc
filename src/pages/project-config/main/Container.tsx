import React, { memo, useRef } from "react";
import styles from "./Container.less";

const Container = (props: any) => {
  const { active, compKey, boxConfig, canvasStyle } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  // 鼠标按下 选中当前组件进行拖拽
  const handleMouseDownOnShape = (e: any) => {
    props.changeShowMenu(false);
    !active && props.changeCompKey(compKey);
    e.preventDefault();
    e.stopPropagation();
    const { clientX, clientY } = e;
    const { left, top, width, height } = boxConfig;
    let hasMove = false;
    let lastLeft = left;
    let lastTop = top;
    const move = (moveEvent: any) => {
      hasMove = true;
      lastLeft = left + moveEvent.clientX - clientX;
      lastTop = top + moveEvent.clientY - clientY;
      lastLeft < 0 && (lastLeft = 0);
      lastTop < 0 && (lastTop = 0);
      const maxLeft = canvasStyle.width - width;
      const maxTop = canvasStyle.height - height;
      lastLeft > maxLeft && (lastLeft = maxLeft);
      lastTop > maxTop && (lastTop = maxTop);
      if (containerRef.current) {
        containerRef.current.style.left = `${lastLeft}px`;
        containerRef.current.style.top = `${lastTop}px`;
      }
    };
    const up = () => {
      if (hasMove) {
        boxConfig.left = lastLeft;
        boxConfig.top = lastTop;
        props.changeBoxConfig(boxConfig);
      }
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  // 右键点击
  const handleRightClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const { offsetX, offsetY } = e.nativeEvent;
    const menuPos = {
      left: offsetX + boxConfig.left,
      top: offsetY + boxConfig.top,
    };
    props.changeShowMenu(true);
    props.changeMenuPos(menuPos);
  };

  // 通过控制点完成缩放
  const handleMouseDownOnPoint = (e: any, point: string) => {
    e.preventDefault();
    e.stopPropagation();
    props.changeShowMenu(false);
    const { clientX, clientY } = e;
    const { width, height, top, left } = boxConfig;
    let hasMove = false;
    let lastLeft = left;
    let lastTop = top;
    let lastWidth = width;
    let lastHeight = height;
    const move = (moveEvent: any) => {
      hasMove = true;
      const fixedTop = top + height;
      const fixedLeft = left + width;
      const moveY = moveEvent.clientY - clientY;
      const moveX = moveEvent.clientX - clientX;
      switch (point) {
        case "n":
          lastHeight = height - moveY;
          lastHeight < 30 && (lastHeight = 30);
          lastHeight > fixedTop && (lastHeight = fixedTop);
          lastTop = fixedTop - lastHeight;
          break;
        case "e":
          lastWidth = width + moveX;
          lastWidth < 30 && (lastWidth = 30);
          lastWidth > canvasStyle.width - left &&
            (lastWidth = canvasStyle.width - left);
          break;
        case "s":
          lastHeight = height + moveY;
          lastHeight < 30 && (lastHeight = 30);
          lastHeight > canvasStyle.height - top &&
            (lastHeight = canvasStyle.height - top);
          break;
        case "w":
          lastWidth = width - moveX;
          lastWidth < 30 && (lastWidth = 30);
          lastWidth > fixedLeft && (lastWidth = fixedLeft);
          lastLeft = fixedLeft - lastWidth;
          break;
        case "nw":
          lastHeight = height - moveY;
          lastHeight < 30 && (lastHeight = 30);
          lastHeight > fixedTop && (lastHeight = fixedTop);
          lastTop = fixedTop - lastHeight;
          lastWidth = width - moveX;
          lastWidth < 30 && (lastWidth = 30);
          lastWidth > fixedLeft && (lastWidth = fixedLeft);
          lastLeft = fixedLeft - lastWidth;
          break;
        case "ne":
          lastHeight = height - moveY;
          lastHeight < 30 && (lastHeight = 30);
          lastHeight > fixedTop && (lastHeight = fixedTop);
          lastTop = fixedTop - lastHeight;
          lastWidth = width + moveX;
          lastWidth < 30 && (lastWidth = 30);
          lastWidth > canvasStyle.width - left &&
            (lastWidth = canvasStyle.width - left);
          break;
        case "sw":
          lastHeight = height + moveY;
          lastHeight < 30 && (lastHeight = 30);
          lastHeight > canvasStyle.height - top &&
            (lastHeight = canvasStyle.height - top);
          lastWidth = width - moveX;
          lastWidth < 30 && (lastWidth = 30);
          lastWidth > fixedLeft && (lastWidth = fixedLeft);
          lastLeft = fixedLeft - lastWidth;
          break;
        case "se":
          lastHeight = height + moveY;
          lastHeight < 30 && (lastHeight = 30);
          lastHeight > canvasStyle.height - top &&
            (lastHeight = canvasStyle.height - top);
          lastWidth = width + moveX;
          lastWidth < 30 && (lastWidth = 30);
          lastWidth > canvasStyle.width - left &&
            (lastWidth = canvasStyle.width - left);
          break;
        default:
          break;
      }
      if (containerRef.current) {
        containerRef.current.style.left = `${lastLeft}px`;
        containerRef.current.style.top = `${lastTop}px`;
        containerRef.current.style.width = `${lastWidth}px`;
        containerRef.current.style.height = `${lastHeight}px`;
      }
    };
    const up = () => {
      if (hasMove) {
        boxConfig.left = lastLeft;
        boxConfig.top = lastTop;
        boxConfig.width = lastWidth;
        boxConfig.height = lastHeight;
        props.changeBoxConfig(boxConfig);
      }
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  // 八个控制点 缩放
  const pointList = ["n", "e", "s", "w", "nw", "ne", "sw", "se"];

  // 每个点的样式
  const getPointStyle = (point: string) => {
    const hasT = /n/.test(point);
    const hasB = /s/.test(point);
    const hasL = /w/.test(point);
    const hasR = /e/.test(point);
    let newLeft = "0";
    let newTop = "0";
    if (point.length === 2) {
      newLeft = hasL ? "0" : "100%";
      newTop = hasT ? "0" : "100%";
    } else {
      if (hasT || hasB) {
        newLeft = "50%";
        newTop = hasT ? "0" : "100%";
      }
      if (hasL || hasR) {
        newLeft = hasL ? "0" : "100%";
        newTop = "50%";
      }
    }
    return {
      top: newTop,
      left: newLeft,
      cursor: `${point}-resize`,
    };
  };

  const { left, top, width, height } = boxConfig;

  return (
    <div
      ref={containerRef}
      className={`${styles["container"]} ${
        active ? styles["container-active"] : ""
      }`}
      style={{ left, top, width: `${width}px`, height: `${height}px` }}
      onMouseDown={handleMouseDownOnShape}
      onContextMenu={handleRightClick}
    >
      {active &&
        pointList.map((item) => (
          <div
            key={item}
            className={styles["container-point"]}
            style={getPointStyle(item)}
            onMouseDown={(e) => handleMouseDownOnPoint(e, item)}
          ></div>
        ))}
      {props.child}
    </div>
  );
};

export default memo(Container);

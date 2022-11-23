import React, { memo, useRef } from 'react';
import styles from './Container.less';

const Container = (props: any) => {
  const { active, compKey, boxConfig } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  // 鼠标按下 选中当前组件进行拖拽
  const handleMouseDownOnShape = (e: any) => {
    props.changeCompKey(compKey);
    e.preventDefault();
    e.stopPropagation();
    const { clientX, clientY } = e;
    const { left, top } = boxConfig;
    let hasMove = false;
    let lastLeft = left;
    let lastTop = top;
    const move = (moveEvent: any) => {
      hasMove = true;
      lastLeft = left + moveEvent.clientX - clientX;
      lastTop = top + moveEvent.clientY - clientY;
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
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  // 通过控制点完成缩放
  const handleMouseDownOnPoint = (e: any, point: string) => {
    e.preventDefault();
    e.stopPropagation();
    const { clientX, clientY } = e;
    const { width, height, top, left } = boxConfig;
    let hasMove = false;
    let lastLeft = left;
    let lastTop = top;
    let lastWidth = width;
    let lastHeight = height;
    const move = (moveEvent: any) => {
      hasMove = true;
      switch (point) {
        case 'n':
          lastTop = top + moveEvent.clientY - clientY;
          lastHeight = height - moveEvent.clientY + clientY;
          break;
        case 'e':
          lastWidth = width + moveEvent.clientX - clientX;
          break;
        case 's':
          lastHeight = height + moveEvent.clientY - clientY;
          break;
        case 'w':
          lastLeft = left + moveEvent.clientX - clientX;
          lastWidth = width - moveEvent.clientX + clientX;
          break;
        case 'nw':
          lastTop = top + moveEvent.clientY - clientY;
          lastHeight = height - moveEvent.clientY + clientY;
          lastLeft = left + moveEvent.clientX - clientX;
          lastWidth = width - moveEvent.clientX + clientX;
          break;
        case 'ne':
          lastTop = top + moveEvent.clientY - clientY;
          lastHeight = height - moveEvent.clientY + clientY;
          lastWidth = width + moveEvent.clientX - clientX;
          break;
        case 'sw':
          lastHeight = height + moveEvent.clientY - clientY;
          lastLeft = left + moveEvent.clientX - clientX;
          lastWidth = width - moveEvent.clientX + clientX;
          break;
        case 'se':
          lastHeight = height + moveEvent.clientY - clientY;
          lastWidth = width + moveEvent.clientX - clientX;
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
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  // 八个控制点 缩放
  const pointList = ['n', 'e', 's', 'w', 'nw', 'ne', 'sw', 'se'];

  // 每个点的样式
  const getPointStyle = (point: string) => {
    const hasT = /n/.test(point);
    const hasB = /s/.test(point);
    const hasL = /w/.test(point);
    const hasR = /e/.test(point);
    let newLeft = '0';
    let newTop = '0';
    if (point.length === 2) {
      newLeft = hasL ? '0' : '100%';
      newTop = hasT ? '0' : '100%';
    } else {
      if (hasT || hasB) {
        newLeft = '50%';
        newTop = hasT ? '0' : '100%';
      }
      if (hasL || hasR) {
        newLeft = hasL ? '0' : '100%';
        newTop = '50%';
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
      className={`${styles['container']} ${
        active ? styles['container-active'] : ''
      }`}
      style={{ left, top, width: `${width}px`, height: `${height}px` }}
      onMouseDown={handleMouseDownOnShape}
    >
      {active &&
        pointList.map((item) => (
          <div
            key={item}
            className={styles['container-point']}
            style={getPointStyle(item)}
            onMouseDown={(e) => handleMouseDownOnPoint(e, item)}
          ></div>
        ))}
      {props.child}
    </div>
  );
};

export default memo(Container);

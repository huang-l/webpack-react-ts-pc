import React, { memo } from 'react';
import styles from './Main.less';

const Main = (props: any) => {
  const { canvasStyle } = props;
  const { width, height } = canvasStyle;
  return (
    <div className={styles['main-wrapper']}>
      <div style={{ width: `${width}px`, height: `${height}px` }}>amin</div>
    </div>
  );
};

export default memo(Main);

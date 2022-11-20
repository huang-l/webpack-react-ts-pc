import React, { memo } from 'react';
import styles from './Index.less';

const HlText = (props: any) => {
  const { contentConfig } = props;

  const { value } = contentConfig;
  return <div className={styles['hl-text']}>{value}</div>;
};

export default { key: 'HlText', component: memo(HlText) };

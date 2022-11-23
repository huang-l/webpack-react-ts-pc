import React, { memo } from 'react';
import styles from './Index.less';

const HlButton = (props: any) => {
  const { contentConfig } = props;

  const { value } = contentConfig;
  return <div className={styles['hl-button']}>{value}</div>;
};

export default { key: 'HlButton', component: memo(HlButton) };

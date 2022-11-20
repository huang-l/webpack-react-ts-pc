import React, { memo } from 'react';
import { Collapse, InputNumber } from 'antd';
import styles from './Config.less';

const Config = (props: any) => {
  const { comp } = props;
  const { boxConfig } = comp;

  // 修改容器样式
  const changeBox = (value: number, attr: string) => {
    boxConfig[attr] = value;
    props.changeBoxConfig(boxConfig);
  };

  return (
    <Collapse defaultActiveKey={['1']}>
      <Collapse.Panel header="容器配置" key="1">
        <div className={styles['comp-attr']}>
          <div className={styles['comp-title']}>{boxConfig.title}</div>
          {[
            ['left', 'top'],
            ['width', 'height'],
          ].map((item, index) => {
            const arr = [
              ['x', 'y'],
              ['w', 'h'],
            ];
            return (
              <div className="mb-10" key={index}>
                {item.map((ite, ind) => (
                  <div className={styles['comp-pos']} key={ite}>
                    <span className={styles['pos-label']}>
                      {arr[index][ind]} :
                    </span>
                    <InputNumber
                      className="width-80"
                      value={boxConfig[ite]}
                      onChange={(value) => changeBox(value, ite)}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default memo(Config);

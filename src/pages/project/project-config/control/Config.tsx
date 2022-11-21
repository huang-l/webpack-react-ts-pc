import React, { createElement, memo } from 'react';
import { Collapse, InputNumber } from 'antd';
import HlTextConfig from '../components/text/Config';
import HlTextData from '../components/text/Data';
import styles from './Config.less';

const Config = (props: any) => {
  const { comp } = props;
  const { boxConfig, contentConfig } = comp;

  // 修改容器样式
  const changeBox = (value: number, attr: string) => {
    boxConfig[attr] = value;
    props.changeBoxConfig(boxConfig);
  };

  let styleConfig;
  let dataConfig;
  switch (comp.key.split('_')[0]) {
    case 'HlText':
      styleConfig = HlTextConfig;
      dataConfig = HlTextData;
      break;
    default:
      break;
  }

  return (
    <Collapse defaultActiveKey={['1']}>
      <Collapse.Panel header="容器配置" key="1">
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
      </Collapse.Panel>
      {styleConfig && (
        <Collapse.Panel header="样式配置" key="2">
          {createElement(styleConfig, {
            contentConfig,
            changeContentConfig: props.changeContentConfig,
          })}
        </Collapse.Panel>
      )}
      {dataConfig && (
        <Collapse.Panel header="数据配置" key="3">
          {createElement(dataConfig, {
            contentConfig,
            changeContentConfig: props.changeContentConfig,
          })}
        </Collapse.Panel>
      )}
    </Collapse>
  );
};

export default memo(Config);

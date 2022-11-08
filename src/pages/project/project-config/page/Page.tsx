import React, { FC, memo, useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CatalogAddModal from './CatalogAddModal';
import PageAddModal from './PageAddModal';
import useModal from '@/hook/useModal';
import styles from './Page.less';

const Page = () => {
  const handleClick = (e: { key: string }) => {
    const { key } = e;
    console.log(key);
  };

  /*
    一个平台 有目录、页面 
    目录可以是页面(用以当几个页面的父级页面) 可以是非页面(仅仅用来做菜单显示模块) 
    页面也可分为菜单页(点左侧菜单栏直接跳转)和非菜单页(左侧菜单栏不存在)
    弹窗也需要做成页面
  */
  const items = [
    { key: 'catalog', label: '目录' },
    { key: 'page', label: '页面' },
  ];
  const pageMenu = <Menu items={items} onClick={handleClick}></Menu>;
  return (
    <>
      <div className={`${styles['page-header']} clearfix`}>
        <span className="float-left">页面列表</span>
        <span className="float-right">
          <Dropdown overlay={pageMenu} overlayStyle={{ width: '100px' }}>
            <a>
              <PlusOutlined />
            </a>
          </Dropdown>
        </span>
      </div>
    </>
  );
};

export default memo(Page);

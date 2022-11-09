import React, { memo } from 'react';
import { Dropdown, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CatalogAddModal from './CatalogAddModal';
import PageAddModal from './PageAddModal';
import { catalogObj, pageObj } from '@/interface/project';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCatalogList,
  changePageList,
} from '@/store/modules/project/reducer';
import styles from './Page.less';
import { useParams } from 'react-router-dom';

const Page = () => {
  const params = useParams();
  const projectId = params.id as string;
  const cList: Array<catalogObj> = useSelector(
    (state: any) => state.project.catalogList
  );
  const pList: Array<pageObj> = useSelector(
    (state: any) => state.project.pageList
  );
  const dispatch = useDispatch();
  // 目录添加成功
  const handleAddCatalogOk = (param: { name: string; isPage: boolean }) => {
    const id = cList.length ? String(Number(cList[0].id) + 1) : '1';
    const catalog = { id, ...param, projectId };
    const newList = [catalog, ...cList];
    dispatch(changeCatalogList(newList));
  };
  // 页面添加成功
  const handleAddPageOk = (param: {
    name: string;
    isMenu: boolean;
    isDialog: boolean;
  }) => {
    const id = pList.length ? String(Number(pList[0].id) + 1) : '1';
    const page = { id, ...param, projectId };
    const newList = [page, ...pList];
    dispatch(changePageList(newList));
  };
  // 添加目录、页面
  const handleClick = (e: { key: string }) => {
    const { key } = e;
    if (key === 'catalog') {
      CatalogAddModal.show('添加目录', 500, {}, handleAddCatalogOk);
    } else {
      PageAddModal.show('添加页面', 500, {}, handleAddPageOk);
    }
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

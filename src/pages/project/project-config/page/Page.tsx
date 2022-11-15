import React, { memo } from 'react';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ProfileOutlined,
  FileTextOutlined,
  FileOutlined,
  MessageOutlined,
} from '@ant-design/icons';
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

/**
 * 一个平台 有目录、页面
 * 目录可以是页面(用以当几个页面的父级页面 可以是菜单和非菜单) 可以是非页面(仅仅用来做菜单显示模块)
 * 页面也可分为菜单页(点左侧菜单栏直接跳转)和非菜单页(左侧菜单栏不存在) 弹窗需要做成页面
 */

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
  // 目录、页面添加成功
  const handleAddCatalogOk = (param: {
    name: string;
    isMenu: boolean;
    isPage: boolean;
  }) => {
    const id = cList.length ? String(Number(cList[0].id) + 1) : '1';
    const catalog = { id, ...param, projectId };
    const newList = [catalog, ...cList];
    dispatch(changeCatalogList(newList));
  };
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
  const handleClick = (val: string) => {
    if (val === 'catalog') {
      CatalogAddModal.show('添加目录', 500, {}, handleAddCatalogOk);
    } else {
      PageAddModal.show('添加页面', 500, {}, handleAddPageOk);
    }
  };
  // 编辑目录成功
  const handleEditCatalogOk = (
    param: { name: string; isMenu: boolean; isPage: boolean },
    id: string
  ) => {
    const newList = cList.map((item) => {
      if (item.id === id) {
        item.name = param.name;
        item.isMenu = param.isMenu;
        item.isPage = param.isPage;
      }
      return item;
    });
    dispatch(changeCatalogList(newList));
  };
  const handleEditPageOk = (
    param: { name: string; isMenu: boolean; isDialog: boolean },
    id: string
  ) => {
    const newList = pList.map((item) => {
      if (item.id === id) {
        item.name = param.name;
        item.isMenu = param.isMenu;
        item.isDialog = param.isDialog;
      }
      return item;
    });
    dispatch(changePageList(newList));
  };
  // 编辑目录、页面
  const handleEdit = (type: string, info: any) => {
    if (type === 'catalog') {
      CatalogAddModal.show(
        '编辑目录',
        500,
        { catalogInfo: info },
        (param: { name: string; isMenu: boolean; isPage: boolean }) =>
          handleEditCatalogOk(param, info.id)
      );
    } else {
      PageAddModal.show(
        '编辑页面',
        500,
        { pageInfo: info },
        (param: { name: string; isMenu: boolean; isDialog: boolean }) =>
          handleEditPageOk(param, info.id)
      );
    }
  };
  // 删除目录、页面
  const handleDelete = (type: string, id: string) => {
    if (type === 'catalog') {
      const newList = cList.filter((item) => item.id !== id);
      dispatch(changeCatalogList(newList));
    } else {
      const newList = pList.filter((item) => item.id !== id);
      dispatch(changePageList(newList));
    }
  };

  return (
    <>
      {['catalog', 'page'].map((type) => (
        <div key={type} className={styles['page-wrapper']}>
          <div className={`${styles['page-header']} clearfix`}>
            <span className="float-left">{`${
              type === 'page' ? '页面' : '目录'
            }列表`}</span>
            <a className="float-right" onClick={() => handleClick(type)}>
              <PlusOutlined />
            </a>
          </div>
          <div className={styles['page-content']}>
            {(type === 'page' ? pList : cList)?.map((item) => {
              let icon =
                type === 'page' ? <FileTextOutlined /> : <FileOutlined />;
              if (type === 'catalog' && item.isMenu) {
                const page = item as catalogObj;
                icon = page.isPage ? <FileTextOutlined /> : <ProfileOutlined />;
              }
              if (type === 'page' && !item.isMenu) {
                const page = item as pageObj;
                icon = page.isDialog ? <MessageOutlined /> : <FileOutlined />;
              }
              return (
                <div
                  key={item.id}
                  className={`${styles['page-item']} clearfix`}
                >
                  <span className={`text-ellipsis ${styles['page-title']}`}>
                    <span className="mr-5">{icon}</span>
                    {item.name}
                  </span>
                  <span className="float-right">
                    <a className="mr-10" onClick={() => handleEdit(type, item)}>
                      <EditOutlined />
                    </a>
                    <a onClick={() => handleDelete(type, item.id)}>
                      <DeleteOutlined />
                    </a>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <hr />
    </>
  );
};

export default memo(Page);

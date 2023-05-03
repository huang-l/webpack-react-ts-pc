import React, { memo, useEffect, useState } from "react";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileOutlined,
  FilePptOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import PageAddModal from "./PageAddModal";
import { useDispatch, useSelector } from "react-redux";
import { changePageList } from "@/store/modules/project/reducer";
import { debounce } from "lodash";

import styles from "./Page.less";

const Page = (props: any) => {
  const [pageId, setPageId] = useState(0); //选中的页面

  const pList: Array<{
    id: number;
    name: string;
    isParent: boolean;
    isDialog: boolean;
    projectId: string;
  }> = useSelector((state: any) => state.project.pageList);
  const dispatch = useDispatch();

  // 初始化操作
  useEffect(() => {
    if (!pageId && pList.length > 0) {
      setPageId(pList[0].id);
    }
  }, []);

  // 目录、页面添加成功
  const handleAddPageOk = (param: {
    name: string;
    isParent: boolean;
    isDialog: boolean;
  }) => {
    const id = pList.length ? pList[pList.length - 1].id + 1 : 1;
    const page = { id, ...param, projectId: props.projectId };
    const newList = [...pList, page];
    dispatch(changePageList(newList));
  };
  // 添加页面
  const addPage = debounce(() => {
    PageAddModal.show("添加页面", 500, {}, handleAddPageOk);
  }, 300);
  const handleEditPageOk = (
    param: { name: string; isParent: boolean; isDialog: boolean },
    id: number
  ) => {
    const newList = pList.map((item) => {
      if (item.id === id) {
        item.name = param.name;
        item.isParent = param.isParent;
        item.isDialog = param.isDialog;
      }
      return item;
    });
    dispatch(changePageList(newList));
  };
  // 编辑页面
  const editPage = debounce((pageInfo: any) => {
    PageAddModal.show(
      "编辑页面",
      500,
      { pageInfo },
      (param: { name: string; isParent: boolean; isDialog: boolean }) =>
        handleEditPageOk(param, pageInfo.id)
    );
  }, 300);
  // 删除页面
  const deletePage = debounce((id: number) => {
    const newList = pList.filter((item) => item.id !== id);
    if (id === pageId && newList.length > 0) {
      setPageId(newList[0].id);
    }
    dispatch(changePageList(newList));
  }, 300);

  // 监听选中页面变化 在页面发生变化修改父组件内状态
  useEffect(() => {
    props.changePageId(pageId);
  }, [pageId]);

  // 选中页面
  const selectPage = (id: number) => {
    if (pageId === id) return;
    setPageId(id);
  };

  return (
    <>
      <div className={styles["page-header"]}>
        <span>页面列表</span>
        <a onClick={addPage}>
          <PlusOutlined />
        </a>
      </div>
      <div className={styles["page-content"]}>
        {pList?.map((item) => {
          let icon = item.isDialog ? <MessageOutlined /> : <FileOutlined />;
          item.isParent && (icon = <FilePptOutlined />);
          return (
            <div
              key={item.id}
              className={`${styles["page-item"]} ${
                pageId === item.id ? styles["page-active"] : ""
              }`}
              onClick={() => selectPage(item.id)}
            >
              <span className={`text-ellipsis ${styles["page-title"]}`}>
                <span className="mr-5">{icon}</span>
                {item.name}
              </span>
              <span>
                <a className="mr-10" onClick={() => editPage(item)}>
                  <EditOutlined />
                </a>
                <a onClick={() => deletePage(item.id)}>
                  <DeleteOutlined />
                </a>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default memo(Page);

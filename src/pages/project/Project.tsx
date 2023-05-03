import React from "react";
import { Button, Modal, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { changeProjectList } from "@/store/modules/project/reducer";
import ProjectAddModal from "./ProjectAddModal";

import styles from "./Project.less";

const { confirm } = Modal;

const Project = () => {
  const list: Array<{ id: number; name: string }> = useSelector(
    (state: any) => state.project.projectList
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 前往项目配置页
  const goConfig = debounce((projectId: number) => {
    if (!projectId) return;
    navigate(`/projectConfig/${projectId}`);
  }, 300);

  // 添加项目
  const addProject = debounce(() => {
    ProjectAddModal.show("添加项目", 500, {}, (param: { name: string }) => {
      const id = list.length ? list[0].id + 1 : 1;
      const project = { id, ...param };
      const newList = [project, ...list];
      dispatch(changeProjectList(newList));
    });
  }, 300);

  // 编辑项目
  const editProject = debounce((project: { id: number; name: string }) => {
    ProjectAddModal.show(
      "编辑项目",
      500,
      { project },
      (param: { name: string }) => {
        const newList = list.map((p) => {
          if (p.id === project.id) {
            p.name = param.name;
          }
          return p;
        });
        dispatch(changeProjectList(newList));
      }
    );
  }, 300);

  // 删除项目
  const deleteProject = debounce((id: number) => {
    if (!id) return;
    confirm({
      title: "确定删除该项目吗?",
      icon: <ExclamationCircleFilled />,
      okText: "确认",
      cancelText: "取消",
      onOk() {
        message.success("删除项目成功!");
        const newList = list.filter((p) => p.id !== id);
        dispatch(changeProjectList(newList));
      },
      onCancel() {},
    });
  }, 300);

  return (
    <>
      <div className={`${styles["project-header"]}`}>
        <span>项目</span>
        <Button
          type="primary"
          onClick={addProject}
          disabled={list.length >= 20}
        >
          添加项目
        </Button>
      </div>
      <div className={styles["project-content"]}>
        {!list.length && <div className={styles["no-data"]}>暂无数据</div>}
        {list.length > 0 && (
          <div className={styles["project-list"]}>
            {list.map((project) => (
              <div className={styles["project-item"]} key={project.id}>
                <div
                  className={`text-ellipsis ${styles["item-title"]}`}
                  onClick={() => goConfig(project.id)}
                >
                  {project.name}
                </div>
                <div className={styles["item-oper"]}>
                  <a onClick={() => editProject(project)}>编辑</a>
                  <a onClick={() => deleteProject(project.id)}>删除</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Project;

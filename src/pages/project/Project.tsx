import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { debounce } from '@/util/commonService';
import { useSelector, useDispatch } from 'react-redux';
import { changeProjectList } from '@/store/modules/project/reducer';
import { projectObj } from '@/interface/project';
import ProjectAddModal from './ProjectAddModal';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

import styles from './Project.less';

const Project = () => {
  let [isShowModal, setIsShowModal] = useState(false);
  let [info, setInfo] = useState<projectObj>({});

  const list: Array<projectObj> = useSelector(
    (state: any) => state.project.projectList
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const componentWillUnmount = () => {
    [isShowModal, setIsShowModal] = [false, () => {}];
    [info, setInfo] = [{}, () => {}];
  };

  useEffect(() => {
    return componentWillUnmount;
  }, []);

  // 前往项目配置页
  const goConfig = (projectId: string) => {
    if (!projectId) return;
    navigate(`/projectConfig/${projectId}`);
  };

  // 添加项目
  const addProject = debounce(() => {
    setIsShowModal(true);
    setInfo({});
  }, 300);

  // 编辑项目
  const editProject = (project: projectObj) => {
    if (!project.id) return;
    setIsShowModal(true);
    setInfo(project);
  };

  // 删除项目
  const deleteProject = (id: string) => {
    if (!id) return;
    const newList = list.filter((p) => p.id !== id);
    dispatch(changeProjectList(newList));
  };

  // 关闭弹窗 看是确认还是取消
  const changeShow = (type: string, param: any) => {
    if (type === 'ok') {
      let newList = [];
      if (!info?.id) {
        const id = list.length ? String(Number(list[0].id) + 1) : '1';
        const project = { id, name: param.name };
        newList = [project, ...list];
      } else {
        newList = list.map((p) => {
          if (p.id === info.id) {
            p.name = param.name;
          }
          return p;
        });
      }
      dispatch(changeProjectList(newList));
    }
    setIsShowModal(false);
  };

  return (
    <div className={styles['project-wrapper']}>
      <div className={`${styles['project-header']} clearfix`}>
        <div className="float-left">项目</div>
        <div className="float-right">
          <Button
            type="primary"
            onClick={addProject}
            disabled={list.length >= 10}
          >
            添加项目
          </Button>
        </div>
      </div>
      <div className={`${styles['project-content']} card`}>
        {list.length > 0
          ? list.map((project) => (
              <div className={styles['project-item']} key={project.id}>
                <img className={styles['item-img']} src="/static/project.svg" />
                <div className={`${styles['item-txt']} clearfix`}>
                  <a
                    className={`ellipsis ${styles['item-name']}`}
                    onClick={() => goConfig(project.id as string)}
                  >
                    {project.name}
                  </a>
                  <span>
                    <a className="mr-5" onClick={() => editProject(project)}>
                      <EditFilled />
                    </a>
                    <a onClick={() => deleteProject(project.id as string)}>
                      <DeleteFilled />
                    </a>
                  </span>
                </div>
              </div>
            ))
          : '暂无数据'}
      </div>
      {isShowModal && (
        <ProjectAddModal
          isShowModal={isShowModal}
          info={info}
          changeShow={changeShow}
        />
      )}
    </div>
  );
};

export default Project;

import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { debounce } from '@/util/commonService';
import { useSelector, useDispatch } from 'react-redux';
import { changeProjectList } from '@/store/modules/project/reducer';
import { projectObj } from '@/interface/project';
import ProjectAddModal from './ProjectAddModal';

import './Project.less';

const Project = () => {
  let [isShowModal, setIsShowModal] = useState(false);

  const list: Array<projectObj> = useSelector(
    (state: any) => state.project.projectList
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const componentWillUnmount = () => {
    [isShowModal, setIsShowModal] = [false, () => {}];
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
  }, 300);

  // 关闭弹窗 看是确认还是取消
  const changeShow = (type: string, param: any) => {
    if (type === 'ok') {
      const id = list.length ? String(Number(list[0].id) + 1) : '1';
      const project = { id, name: param.name };
      const newList = [project].concat(list);
      dispatch(changeProjectList(newList));
    }
    setIsShowModal(false);
  };

  return (
    <div className="project-wrapper">
      <div className="project-header clearfix">
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
      <div className="project-content card">
        {list.length > 0
          ? list.map((project) => (
              <div className="project-item" key={project.id}>
                <img className="item-img" src="/static/project.svg" />
                <div className="item-txt ellipsis">
                  <a onClick={() => goConfig(project.id)}>{project.name}</a>
                </div>
              </div>
            ))
          : '暂无数据'}
      </div>
      {isShowModal && (
        <ProjectAddModal isShowModal={isShowModal} changeShow={changeShow} />
      )}
    </div>
  );
};

export default Project;

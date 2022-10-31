import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { debounce } from '@/util/commonService';
import './Project.less';

const Project = () => {
  interface projectObj {
    id: string;
    name: string;
  }
  let [list, setList] = useState<Array<projectObj>>([]);
  const navigate = useNavigate();

  const componentWillUnmount = () => {
    [list, setList] = [[], () => {}];
  };

  useEffect(() => {
    const newList = [{ id: '1', name: '123' }];
    setList(newList);
    return componentWillUnmount;
  }, []);

  // 前往项目配置页
  const goConfig = (projectId: string) => {
    if (!projectId) return;
    navigate(`/projectConfig/${projectId}`);
  };

  // 添加项目
  const addProject = debounce(() => {
    console.log(212);
  }, 300);

  return (
    <div className="project-wrapper">
      <div className="project-header clearfix">
        <div className="float-left">项目</div>
        <div className="float-right">
          <Button type="primary" onClick={addProject}>
            添加项目
          </Button>
        </div>
      </div>
      <div className="project-content card">
        {list.map((project) => (
          <div className="project-item" key={project.id}>
            <img className="item-img" src="/static/project.svg" />
            <div className="item-txt ellipsis">
              <a onClick={() => goConfig(project.id)}>{project.name}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;

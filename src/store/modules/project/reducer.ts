import { projectObj, catalogObj, pageObj } from '@/interface/project';
const defaultState = {
  projectList: [], //项目列表
  catalogList: [], //单个项目下的目录列表
  pageList: [], //单个项目下的页面列表
};

const reducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'project/projectList':
      return { ...state, projectList: action.payload };
    case 'project/catalogList':
      return { ...state, catalogList: action.payload };
    case 'project/pageList':
      return { ...state, pageList: action.payload };
    default:
      return state;
  }
};

export const changeProjectList = (payload: Array<projectObj>) => {
  return {
    type: 'project/projectList',
    payload,
  };
};

export const changeCatalogList = (payload: Array<catalogObj>) => {
  return {
    type: 'project/catalogList',
    payload,
  };
};

export const changePageList = (payload: Array<pageObj>) => {
  return {
    type: 'project/pageList',
    payload,
  };
};

export default { project: reducer };

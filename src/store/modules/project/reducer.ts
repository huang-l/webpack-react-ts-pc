const defaultState = {
  projectList: [], //项目列表
  pageList: [], //单个项目下的页面列表
};

const reducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "project/projectList":
      return { ...state, projectList: action.payload };
    case "project/pageList":
      return { ...state, pageList: action.payload };
    default:
      return state;
  }
};

export const changeProjectList = (
  payload: Array<{ id: number; name: string }>
) => {
  return {
    type: "project/projectList",
    payload,
  };
};

export const changePageList = (
  payload: Array<{
    id: number;
    name: string;
    isParent: boolean;
    isDialog: boolean;
    projectId: string;
  }>
) => {
  return {
    type: "project/pageList",
    payload,
  };
};

export default { project: reducer };

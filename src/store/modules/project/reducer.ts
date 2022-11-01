import { projectObj } from '@/interface/project';
const defaultState = {
  projectList: [],
};

const reducer = (
  state = defaultState,
  action: {
    type: string;
    payload: { projectList: Array<projectObj> };
  }
) => {
  switch (action.type) {
    case 'project/projectList':
      return { ...state, projectList: action.payload };
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

export default { project: reducer };

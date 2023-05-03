const defaultState = {
  userInfo: {},
};

const reducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "user/userInfo":
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

export const changeUserInfo = (payload: {
  account: string;
  password: string;
}) => {
  return {
    type: "user/userInfo",
    payload,
  };
};

export default { user: reducer };

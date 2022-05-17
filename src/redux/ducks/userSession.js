export const SET_SESSION = "teamly/settings/SET_SESSION";

const initialState = {
  userSession: false,
  userName: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      const { userSession, userName } = action;
      return {
        ...state,
        userSession,
        userName
      };
    default:
      return state;
  }
};

export const setUserSession = (
	userSession,
	userName = ""
) => ({
  type: SET_SESSION,
  userSession,
  userName
});

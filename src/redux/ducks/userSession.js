export const SET_SESSION = "teamly/settings/SET_SESSION";

const initialState = {
  userSession: false,
  userID: "",
  userName: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      const { userSession, userID, userName } = action;
      return {
        ...state,
        userSession,
        userID,
        userName
      };
    default:
      return state;
  }
};

export const setUserSession = (
	userSession,
  userID = "",
	userName = ""
) => ({
  type: SET_SESSION,
  userSession,
  userID,
  userName
});

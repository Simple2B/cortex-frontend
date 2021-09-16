import { AuthAction, AuthActionTypes, IAuthState } from "../../types/authTypes";

let initialState: IAuthState = (function () {
  const tokenInfo = localStorage.getItem("token");
  if (tokenInfo) {
    return {
      loggedIn: true,
    };
  } else
    return {
      loggedIn: false,
    };
})();

export const authReducer = (
  state = initialState,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
      };
    case AuthActionTypes.LOGOUT:
      return { ...state, loggedIn: false };
    case AuthActionTypes.CHECK_TOKEN:
      return { ...state, loggedIn: true };
    default:
      return state;
  }
};

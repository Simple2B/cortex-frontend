import {
  ILoginParams,
  AuthAction,
  AuthActionTypes,
  ILoginResponse,
  ILogoutResponse,
} from "../../types/authTypes";
import { Dispatch } from "redux";
import { authApi } from "../../api/authApi";

export const login = ({ password, username }: ILoginParams) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({ type: AuthActionTypes.AUTH_API_REQUEST });
      const data: ILoginResponse = await authApi.login(username, password);

      localStorage.setItem("token", data.access_token);
      const now = new Date();
      localStorage['dateNow'] = ''+now.getTime();

      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({ type: AuthActionTypes.LOGIN_FAILURE, payload: e });
    }
  };
};

// TODO: implement logout action api
export const logout = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      // const data: ILogoutResponse = await authApi.logout();
      localStorage.removeItem("token");

      dispatch({ type: AuthActionTypes.LOGOUT });
    } catch (e) {
      dispatch({ type: AuthActionTypes.LOGIN_FAILURE, payload: e });
    }
  };
};

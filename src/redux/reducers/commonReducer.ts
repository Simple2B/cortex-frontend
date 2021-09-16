import { AuthAction, AuthActionTypes } from "../../types/authTypes";
import { ICommonState } from "../../types/commonTypes";

const initialState: ICommonState = {
  isLoading: false,
  error: [],
};

export const commonReducer = (
  state = initialState,
  action: AuthAction
): ICommonState => {
  switch (action.type) {
    case AuthActionTypes.AUTH_API_REQUEST:
      return { ...state, isLoading: true };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: [],
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: [...state.error, action.payload],
      };

    default:
      return state;
  }
};

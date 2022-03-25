import { Dispatch } from "redux";
import { instance } from "../../api/axiosInstance";
import { ClientAction, ClientActionTypes } from "../../types/patientsTypes";

export const patientsData = () => {
  return async (dispatch: Dispatch<ClientAction>): Promise<any> => {
    try {
      const response = await instance().get("api/client/clients");
      console.log("!!!! patientsData: clients => ", response.data);
      dispatch({
        type: ClientActionTypes.GET_CLIENTS,
        payload: [...response.data],
      });
    } catch (e: any) {
      console.log("patientsData: error from redux -> ", e);
    }
  };
};

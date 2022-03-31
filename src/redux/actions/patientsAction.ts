import { Dispatch } from "redux";
import { instance } from "../../api/axiosInstance";
import { ClientAction, ClientActionTypes, ICurrentCarePlanId } from "../../types/patientsTypes";

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
      console.log("patientsData -> patientsData: error from redux -> ", e);
    }
  };
};

export const patientCurrentCarePlan = (id: ICurrentCarePlanId) => {
  return async (dispatch: Dispatch<ClientAction>): Promise<any> => {
    try {
      dispatch({
        type: ClientActionTypes.ADD_CURRENT_CARE_PLAN_ID,
        payload: id,
      });
    } catch (e: any) {
      console.log("patientsData -> patientCurrentCarePlan: error from redux -> ", e)
      // return e.message;
    }
  };
};

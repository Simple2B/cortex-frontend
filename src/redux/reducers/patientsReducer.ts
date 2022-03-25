import { instance } from "../../api/axiosInstance";
import { KioskAction, KioskActionTypes, IKiosk } from "../../types/kioskTypes";
import { ClientAction, ClientActionTypes, IPatient } from "../../types/patientsTypes";

export const initialPatient: IPatient[] = [{
    api_key: '',
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
}];

export const patientsReducer = (
  state = initialPatient,
  action: ClientAction
): IPatient[] => {
  switch (action.type) {
    case ClientActionTypes.GET_CLIENTS:
        return [...action.payload]
    default:
      return state;
  }
};

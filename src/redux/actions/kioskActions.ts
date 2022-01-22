import { KioskAction, KioskActionTypes, IKiosk } from "../../types/kioskTypes";
import { Dispatch } from "redux";

export const kioskStatus = (client: IKiosk) => {
  return async (dispatch: Dispatch<KioskAction>): Promise<any> => {
    try {
      dispatch({
        type: KioskActionTypes.KIOSK_STATUS,
        payload: client,
      });
    } catch (e: any) {
      console.log("kioskStatus: error from redux -> ", e);
    }
  };
};

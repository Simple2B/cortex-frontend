import { Dispatch } from "redux";
import { INextPatient, IWarpSpeed, WarpSpeedAction, WarpSpeedActionTypes } from "../../types/queueWarpSpeedType";

export const queueWarpSpeed = (type: IWarpSpeed) => {
  return async (dispatch: Dispatch<WarpSpeedAction>): Promise<any> => {
    try {
      dispatch({
        type: WarpSpeedActionTypes.WARP_SPEED,
        payload: type,
      });
    } catch (e: any) {
      console.log("queueWarpSpeed: error from redux -> ", e)
      // return e.message;
    }
  };
};


export const nextPatientInQueue = (type: INextPatient) => {
  return async (dispatch: Dispatch<WarpSpeedAction>): Promise<any> => {
    try {
      dispatch({
        type: WarpSpeedActionTypes.SET_NEXT_PATIENT,
        payload: type,
      });
    } catch (e: any) {
      console.log("nextPatientInQueue: error from redux -> ", e)
      // return e.message;
    }
  };
};
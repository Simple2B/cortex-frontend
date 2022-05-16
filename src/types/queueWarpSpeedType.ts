//   on
//   off

export type IWarpSpeed = string;
export type INextPatient = {
  api_key: string,
  first_name: string,
  place_in_queue: number | null,
}

// action types
export enum WarpSpeedActionTypes {
  WARP_SPEED = "WARP_SPEED",
  SET_NEXT_PATIENT = "SET_NEXT_PATIENT",
}

interface WarpSpeedOnOffAction {
  type: WarpSpeedActionTypes.WARP_SPEED;
  payload: IWarpSpeed;
}

interface SetNextPatientAction {
  type: WarpSpeedActionTypes.SET_NEXT_PATIENT;
  payload: INextPatient;
}

export type WarpSpeedAction = WarpSpeedOnOffAction | SetNextPatientAction;

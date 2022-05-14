import { INextPatient, IWarpSpeed, WarpSpeedAction, WarpSpeedActionTypes } from "../../types/queueWarpSpeedType";

export const initialWarpSpeed: IWarpSpeed = "off";

export const warpSpeedReducer = (
    state = initialWarpSpeed,
    action: WarpSpeedAction
): IWarpSpeed => {
    switch (action.type) {
        case WarpSpeedActionTypes.WARP_SPEED:
            return (state = action.payload);
        default:
            return state;
    }
};

export const initialNextPatientInfo: INextPatient = {
    api_key: '',
    first_name: '',
    place_in_queue: null,
};

export const setNextPatientReducer = (
    state = initialNextPatientInfo,
    action: WarpSpeedAction
): INextPatient => {
    switch (action.type) {
        case WarpSpeedActionTypes.SET_NEXT_PATIENT:
            return (state = action.payload);
        default:
            return state;
    }
};

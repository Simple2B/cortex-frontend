import { KioskAction, KioskActionTypes, IKiosk } from "../../types/kioskTypes";

export const initialKiosk: IKiosk = false;

export const kioskReducer = (
  state = initialKiosk,
  action: KioskAction
): IKiosk => {
  switch (action.type) {
    case KioskActionTypes.KIOSK_STATUS:
      return (state = action.payload);
    default:
      return state;
  }
};

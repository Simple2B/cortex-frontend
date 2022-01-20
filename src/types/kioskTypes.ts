export type IKiosk = boolean;

// action types
export enum KioskActionTypes {
  KIOSK_STATUS = "KIOSK_STATUS",
}

interface KioskStatusAction {
  type: KioskActionTypes.KIOSK_STATUS;
  payload: IKiosk;
}

export type KioskAction = KioskStatusAction;

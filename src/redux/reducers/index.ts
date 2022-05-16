import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { commonReducer } from "./commonReducer";
import { dashboardReducer } from "./dashboardReducer";
import { kioskReducer } from "./kioskReducer";
import { currentCarePlanReducer, patientsReducer } from "./patientsReducer";
import { warpSpeedReducer, setNextPatientReducer } from "./queueWarpSpeedReducer";
import { stripeReducer } from "./stripeReducer";

export const rootReducer = combineReducers({
  app: commonReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  stripe: stripeReducer,
  kiosk: kioskReducer,
  patients: patientsReducer,
  patientCurrentCarePlan: currentCarePlanReducer,
  queueWarpSpeed: warpSpeedReducer,
  setNextPatient: setNextPatientReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

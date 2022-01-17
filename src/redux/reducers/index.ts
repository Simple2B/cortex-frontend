import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { commonReducer } from "./commonReducer";
import { dashboardReducer } from "./dashboardReducer";
import { stripeReducer } from "./stripeReducer";

export const rootReducer = combineReducers({
  app: commonReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  stripe: stripeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

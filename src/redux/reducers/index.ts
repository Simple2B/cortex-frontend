import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { commonReducer } from "./commonReducer";
import { dashboardReducer } from "./dashboardReducer";

export const rootReducer = combineReducers({
  app: commonReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

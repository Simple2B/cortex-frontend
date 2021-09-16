import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { commonReducer } from "./commonReducer";

export const rootReducer = combineReducers({
  app: commonReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

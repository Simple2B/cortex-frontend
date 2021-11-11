import * as AuthActionCreators from "./authActions";
import * as DashboardActionCreator from "./dashboardActions";

export const actionsCreator = {
  ...AuthActionCreators,
  ...DashboardActionCreator
};

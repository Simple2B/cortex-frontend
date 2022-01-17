import * as AuthActionCreators from "./authActions";
import * as DashboardActionCreator from "./dashboardActions";
import * as StripeActionCreator from "./stripeActions";

export const actionsCreator = {
  ...AuthActionCreators,
  ...DashboardActionCreator,
  ...StripeActionCreator,
};

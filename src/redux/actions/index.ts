import * as AuthActionCreators from "./authActions";
import * as DashboardActionCreator from "./dashboardActions";
import * as StripeActionCreator from "./stripeActions";
import * as KioskActionCreator from "./kioskActions";

export const actionsCreator = {
  ...AuthActionCreators,
  ...DashboardActionCreator,
  ...StripeActionCreator,
  ...KioskActionCreator,
};

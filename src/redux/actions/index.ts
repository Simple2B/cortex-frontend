import * as AuthActionCreators from "./authActions";
import * as DashboardActionCreator from "./dashboardActions";
import * as StripeActionCreator from "./stripeActions";
import * as KioskActionCreator from "./kioskActions";
import * as PatientsActionCreator from "./patientsAction";
import * as QueueWarpSpeedActionCreator from './queueWarpSpeedAction';

export const actionsCreator = {
  ...AuthActionCreators,
  ...DashboardActionCreator,
  ...StripeActionCreator,
  ...KioskActionCreator,
  ...PatientsActionCreator,
  ...QueueWarpSpeedActionCreator,
};

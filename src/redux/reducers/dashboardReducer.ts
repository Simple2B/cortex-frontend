import {
  DashboardAction,
  DashboardActionTypes,
  IDashboard,
} from "../../types/dashboardTypes";

export const initialDashboard: IDashboard = "arousal";

export const dashboardReducer = (
  state = initialDashboard,
  action: DashboardAction
): IDashboard => {
  switch (action.type) {
    case DashboardActionTypes.DASHBOARD_URL:
      return (state = action.payload);
    default:
      return state;
  }
};

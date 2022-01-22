//   arousal
//   coherence
//   brainWaves

// state
// export interface IDashboardState {
//     url: string;
//   }

export type IDashboard = string;

// action types
export enum DashboardActionTypes {
  DASHBOARD_URL = "DASHBOARD_URL",
}

interface DashboardUrlAction {
  type: DashboardActionTypes.DASHBOARD_URL;
  payload: IDashboard;
}

export type DashboardAction = DashboardUrlAction;

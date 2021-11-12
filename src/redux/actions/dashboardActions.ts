import { DashboardAction, DashboardActionTypes, IDashboard } from "../../types/dashboardTypes";
  import { Dispatch } from "redux";

  export const dashboardUrl = (url: IDashboard) => {
    return async (dispatch: Dispatch<DashboardAction>): Promise<any> => {
      try {
        dispatch({
          type: DashboardActionTypes.DASHBOARD_URL,
          payload: url,
        });
      } catch (e: any) {
        console.log("dashboardUrl: error from redux -> ", e)
        // return e.message;
      }
    };
  };

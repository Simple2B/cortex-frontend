import {
  StripeAction,
  StripeActionTypes,
  IStripe,
} from "../../types/stripeTypes";
import { Dispatch } from "redux";

export const stripeStatus = (url: IStripe) => {
  return async (dispatch: Dispatch<StripeAction>): Promise<any> => {
    try {
      dispatch({
        type: StripeActionTypes.STRIPE_STATUS,
        payload: url,
      });
    } catch (e: any) {
      console.log("stripeStatus: error from redux -> ", e);
    }
  };
};

import {
  StripeAction,
  StripeActionTypes,
  IStripe,
} from "../../types/stripeTypes";

export const initialStripe: IStripe = "";

export const stripeReducer = (
  state = initialStripe,
  action: StripeAction
): IStripe => {
  switch (action.type) {
    case StripeActionTypes.STRIPE_STATUS:
      return (state = action.payload);
    default:
      return state;
  }
};

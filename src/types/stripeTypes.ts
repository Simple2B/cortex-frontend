export type IStripe = string;

// action types
export enum StripeActionTypes {
  STRIPE_STATUS = "STRIPE_STATUS",
}

interface StripeStatusAction {
  type: StripeActionTypes.STRIPE_STATUS;
  payload: IStripe;
}

export type StripeAction = StripeStatusAction;

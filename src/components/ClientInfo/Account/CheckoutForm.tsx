import { useState } from "react";
import "./account.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { clientApi } from "../../../api/clientApi";

const CARD_OPTIONS: any = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#aef7ff",
      color: "#fff",
      frontWeight: 500,
      frontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#aef7ff" },
      "::placeholder": { color: "#aef7ff" },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};
interface Props {
  amount: string;
  type: string;
  onUpdateCallback(): void;
}
export const CheckoutForm = ({ amount, type, onUpdateCallback }: Props) => {
  const [success, setSuccess] = useState<boolean>(false);
  const stripe: any = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const sessionData = {
          id: id,
          description: type,
          amount: Number(amount) * 100,
        };
        const res = await clientApi.createStripeSession(sessionData);
        if (res === "ok") {
          console.log("Successful payment");
          setSuccess(true);
          onUpdateCallback();
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log("Error message => ", error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button disabled={!stripe} className="completeBtn">
            COMPLETE
          </button>
        </form>
      ) : (
        <div>
          <h2>Done!</h2>
        </div>
      )}
    </>
  );
};

import { useState } from "react";
import "./account.css";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

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

export const CheckoutForm = () => {
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
        const res = await axios.post("http://localhost:4000/payment", {
          amount: 10,
          id: id,
        });
        if (res.data.success) {
          console.log("Successful payment");
          setSuccess(true);
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

          {/* <PaymentElement /> */}
          <button disabled={!stripe} className="btnComplete">
            COMPLETE
          </button>
        </form>
      ) : (
        <div>
          <h2></h2>
        </div>
      )}
    </>
  );
};

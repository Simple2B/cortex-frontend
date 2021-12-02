import { useState } from "react";
import "./account.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { clientApi } from "../../../api/clientApi";

const PAYMENT_OK = "Payment successful !";
const PAYMENT_FAIL = "Payment FAILED! ";

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
interface CheckoutFormProps {
  amount: string;
  type_description: string;
  onUpdateCallback(): void;
}
export const CheckoutForm = ({
  amount,
  type_description,
  onUpdateCallback,
}: CheckoutFormProps) => {
  const [success, setSuccess] = useState<boolean>(false);
  const stripe: any = useStripe();
  const elements = useElements();
  const [payment, setPayment] = useState<string>("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    onUpdateCallback();
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
          description: type_description,
          amount: Number(amount) * 100,
        };
        const res = await clientApi.createStripeSession(sessionData);
        if (res === "ok") {
          console.log("Successful payment");
          setSuccess(true);
          setPayment(PAYMENT_OK);
        }
      } catch (error) {
        setPayment(PAYMENT_FAIL);

        console.log("Error from Stripe", error);
      }
    } else {
      console.log("Error message => ", error.message);
    }
  };
  const handleCloseAlert = () => {
    setSuccess(!success);
  };
  const checkInputs = (): boolean => {
    if (!amount || !type_description) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </fieldset>
        <button
          className={`${!checkInputs() ? "completeBtnDisable" : "completeBtn"}`}
          disabled={!stripe || !checkInputs()}
        >
          Complete
        </button>
      </form>
      {success ? (
        <div
          className="alert alert-success alert-dismissible fade show "
          role="alert"
        >
          <strong> {payment}</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={handleCloseAlert}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

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
          setInterval(() => {
            setSuccess(false);
          }, 3000);
          setPayment(PAYMENT_OK);
        }
      } catch (error) {
        setPayment(PAYMENT_FAIL);
        setInterval(() => {
          setPayment("");
        }, 3000);
        console.log("Error from Stripe", error);
      }
    } else {
      console.log("Error message => ", error.message);
    }
  };

  const checkInputs = (): boolean => {
    if (!amount) {
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

        {!success && payment !== PAYMENT_FAIL ? (
          <button
            className={`${
              !checkInputs() ? "completeBtnDisable" : "completeBtn"
            }`}
            disabled={!stripe || !checkInputs()}
          >
            Complete
          </button>
        ) : (
          <div
            className={`${
              payment === PAYMENT_OK
                ? "alert alert-success alert-dismissible fade show "
                : "alert alert-danger alert-dismissible fade show "
            }`}
            role="alert"
          >
            <strong> {payment}</strong>
          </div>
        )}
      </form>
    </>
  );
};

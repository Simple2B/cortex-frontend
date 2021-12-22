import { useState } from "react";
import "./account.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { clientApi } from "../../../api/clientApi";
import { Stripe } from "@stripe/stripe-js";

const PAYMENT_OK = "Payment successful!";
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
  interval: string;
  number: string;
  onUpdateCallback(): void;
  api_key: string;
  email: string;
  name: string;
  stripe_key: Stripe | null;
  error_type: string;
}
export const CheckoutForm = ({
  amount,
  type_description,
  interval,
  number,
  onUpdateCallback,
  api_key,
  email,
  name,
  stripe_key,
  error_type,
}: CheckoutFormProps) => {
  const [success, setSuccess] = useState<boolean>(false);
  const stripe: any = useStripe();
  const elements = useElements();
  const [payment, setPayment] = useState<string>("");

  const [res, setRes] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    onUpdateCallback();
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const sessionData = {
          id: id,
          description: type_description,
          amount: Number(amount) * 100,
          api_key: api_key,
          email: email,
          name: name,
        };
        const data = {
          api_key: api_key,
          payment_method: id,
          email: email,
          amount: Number(amount) * 100,
          interval: interval,
          interval_count: number,
          name: name,
          description: type_description,

          // description: type_description,
        };

        if (type_description === "one time") {
          const createSession = async () => {
            const res = await clientApi.createStripeSession(sessionData);
            setRes(res);
            console.log("createSession", res);
          };
          createSession();
        }
        if (type_description === "requirements") {
          const createSubscription = async () => {
            const response = await clientApi.createStripeSubscription(data);
            console.log("createSubscription", response);
            setRes(response);
          };

          createSubscription();
        }

        if (res === "ok") {
          console.log("Successful payment");
          setSuccess(true);
          setInterval(() => {
            setSuccess(false);
          }, 3000);
          setPayment(PAYMENT_OK);
          setRes("");
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
    if (!amount || (!interval && type_description === "requirement")) {
      return false;
    } else {
      return true;
    }
  };

  // stripe
  //   .confirmCardPayment(stripe_key)
  //   .then(function (response: {
  //     error: any;
  //     paymentIntent: { status: string };
  //   }) {
  //     if (response.error) {
  //       // Handle error here
  //       console.log("Stripe = > response error", response.error);
  //     } else if (
  //       response.paymentIntent &&
  //       response.paymentIntent.status === "succeeded"
  //     ) {
  //       // Handle successful payment here

  //       console.log(
  //         "Stripe = > response paymentIntent status",
  //         response.paymentIntent.status
  //       );
  //     }
  //   });

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
            // className="alert alert-success alert-dismissible fade show "
          >
            <strong> {payment}</strong>
          </div>
        )}
      </form>
    </>
  );
};

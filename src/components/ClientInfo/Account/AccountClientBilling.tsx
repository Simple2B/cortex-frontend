import React, {
    ReactElement,
    useEffect,
    useState,
    useRef,
    useCallback,
  } from "react";
  import "./account.css";
  import { instance } from "../../../api/axiosInstance";
  import { Client } from "../../../api/clientApi";
  import "react-datepicker/dist/react-datepicker.css";
  import { loadStripe, Stripe } from "@stripe/stripe-js";
  import { Elements } from "@stripe/react-stripe-js";
  import { CheckoutForm } from "./CheckoutForm";
  import useGetBilling from "./useGetBilling";


  export default function AccountClientBilling(props: { api_key: string, client: Client}): ReactElement {
    const {api_key, client} = props;

    const [number, setNumber] = useState<string>("");
    const [type, setType] = useState<string>("one time");
    const [interval, setIntervalPay] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const [stripe, setStripe] = useState<Stripe | null>(null);
    const [pkStripeKey, setPKStripeKey] = useState<string>("");

    const [pageNumber, setPageNumber] = useState(1);

    const { loadingBilling, error, billingData, hasMore, total, size } =
      useGetBilling(api_key, "", pageNumber);

    const observer: any = useRef();

    const lastElementRef = useCallback(
      (node) => {
        if (loadingBilling) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            console.log("entries ", entries);
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        });
        if (node) observer.current.observe(node);
      },
      [loadingBilling, hasMore]
    );

    const intervalPay = ["2-week", "1-month"];
    const typesPay = ["one time", "recurring"];

    const setStatuses = () => {
      setAmount("");
    };

    const appearance: any = {
      theme: "night",
    };

    const options: any = {
      pkStripeKey,
      appearance,
    };

    useEffect(() => {
      if (type === "one time") {
        setNumber("1");
        setIntervalPay("");
      } else if (type === "requirement") {
        setNumber("1");
        setIntervalPay("2-week");
      } else {
        setNumber("");
      }
      if (interval !== "") {
        setNumber("");
        setType("requirements");
      }
    }, [type, interval]);

    const getStripeKey = async () => {
      const stripeKeys = await instance().get(`api/client/get_secret`);
      const res = await loadStripe(stripeKeys.data.pk_test);
      setStripe(res);
      setPKStripeKey(stripeKeys.data.pk_test);
    };

    useEffect(() => {
      getStripeKey();
    }, []);

    return (
      <>
          <div className="billing">
            <div className="clientInfo_tittle">Billing</div>
            <div className="billing_table">
              <table className="table">
                <>
                  <tr className="tableHeader">
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>

                  {billingData.map((billing, index) => {
                    if (billingData.length === index + 1 && billing.date) {
                      return (
                        <tr key={index} ref={lastElementRef}>
                          {billing.status === "succeeded" ? (
                            <td>{billing.date}</td>
                          ) : billing.status === "active" ? (
                            <td className="billingReq">
                              <sup className="req">req</sup> {billing.date}
                              <br />
                              next payment: {billing.date_next_payment_attempt}
                            </td>
                          ) : (
                            <td>{billing.date}</td>
                          )}

                          {billing.status === "succeeded" ? (
                            <td>${billing.amount}</td>
                          ) : billing.status === "active" ? (
                            <td>
                              <br />
                              <br />${billing.amount}
                            </td>
                          ) : (
                            <td>${billing.amount}</td>
                          )}

                          {billing.status === "succeeded" ? (
                            <td style={{ color: "green" }}>Paid</td>
                          ) : billing.status === "active" ? (
                            <td style={{ color: "green" }}>
                              Active
                              <br />
                              <br />
                              {billing.paid === false ? (
                                <span style={{ color: "red" }}>Failed</span>
                              ) : (
                                <span style={{ color: "green" }}>Paid</span>
                              )}
                            </td>
                          ) : (
                            <td style={{ color: "red" }}>Failed</td>
                          )}
                        </tr>
                      );
                    } else if (index !== 0 && billing.date) {
                      return (
                        <tr key={index}>
                          {billing.status === "succeeded" ? (
                            <td>{billing.date}</td>
                          ) : billing.status === "active" ? (
                            <td className="billingReq">
                              <sup className="req">req</sup> {billing.date}
                              <br />
                              next payment: {billing.date_next_payment_attempt}
                            </td>
                          ) : (
                            <td>{billing.date}</td>
                          )}

                          {billing.status === "succeeded" ? (
                            <td>${billing.amount}</td>
                          ) : billing.status === "active" ? (
                            <td>
                              <br />
                              <br />${billing.amount}
                            </td>
                          ) : (
                            <td>${billing.amount}</td>
                          )}

                          {billing.status === "succeeded" ? (
                            <td style={{ color: "green" }}>Paid</td>
                          ) : billing.status === "active" ? (
                            <td style={{ color: "green" }}>
                              Active
                              <br />
                              <br />
                              {billing.paid === false ? (
                                <span style={{ color: "red" }}>Failed</span>
                              ) : (
                                <span style={{ color: "green" }}>Paid</span>
                              )}
                            </td>
                          ) : (
                            <td style={{ color: "red" }}>Failed</td>
                          )}
                        </tr>
                      );
                    }
                  })}

                  {loadingBilling ? (
                    <tr className="tableHeader">
                      <td colSpan={3}>Loading...</td>
                    </tr>
                  ) : null}

                  {error ? (
                    <tr className="tableHeader">
                      <td colSpan={3}>Error</td>
                    </tr>
                  ) : null}
                </>
              </table>
            </div>

            <div className="visitHistory_billing">
              <div className="visitHistory_inputContainer">
                <div className="inputTitle">Number</div>
                <div className="visitHistory_inputContainer-size">
                  <input
                    type="number"
                    placeholder=""
                    maxLength={6}
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="visitHistory_inputContainer">
                <div className="inputTitle">Type</div>
                <div className="visitHistory_inputContainer-selectContainer">
                  <input
                    type="text"
                    placeholder=""
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <div className="selectContainer">
                    {typesPay.map((type, index) => {
                      return (
                        <div key={index} onClick={(_e) => setType(type)}>
                          {type}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="visitHistory_billing">
              <div className="visitHistory_inputContainer">
                <div className="inputTitle">Interval</div>
                <div className="visitHistory_inputContainer-selectContainer">
                  <input
                    type="text"
                    placeholder=""
                    value={interval}
                    onChange={(e) => setIntervalPay(e.target.value)}
                    className={error ? "error" : ""}
                  />
                  <div className="selectContainer">
                    {intervalPay.map((interval, index) => {
                      return (
                        <div
                          key={index}
                          onClick={(_e) => setIntervalPay(interval)}
                        >
                          {interval}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="visitHistory_inputContainer">
                <div className="inputTitle">Amount</div>
                <div className="visitHistory_inputContainer-size">
                  <input
                    type="number"
                    placeholder=""
                    maxLength={6}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="visitHistory_inputContainer">
              {pkStripeKey && (
                <Elements options={options} stripe={stripe}>
                  <CheckoutForm
                    onUpdateCallback={setStatuses}
                    amount={amount}
                    type_description={type}
                    interval={interval}
                    number={number}
                    api_key={api_key}
                    email={client.email}
                    name={client.firstName + " " + client.lastName}
                    stripe_key={stripe}
                    error_type={error}
                  />
                </Elements>
              )}
            </div>
          </div>
      </>
    );
  }

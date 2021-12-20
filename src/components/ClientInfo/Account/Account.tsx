import React, { ReactElement, useEffect, useState } from "react";
import "./account.css";
import { useLocation } from "react-router-dom";
import { instance } from "../../../api/axiosInstance";
import DatePicker from "react-datepicker";
import { Client, clientApi, ClientDefault } from "../../../api/clientApi";
import "react-datepicker/dist/react-datepicker.css";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";

interface IVisit {
  date: string;
  doctor_name: string;
}

interface IBilling {
  date: string;
  description: string;
  amount: string | null;
  subscription_interval: string | null;
  pay_period: string | null;
  subscription_quantity: string | null;
  client_name: string;
  doctor_name: string;
  paid: boolean | null;
  date_next_payment_attempt: string | null;
}

export default function Account(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];

  const [client, setClient] = useState<Client>(ClientDefault);

  const [visits, setVisits] = useState<Array<IVisit>>([
    { date: "", doctor_name: "" },
  ]);

  const [filterVisits, setFilterVisits] = useState<Array<IVisit>>();

  const [startTime, setStartTime] = useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);

  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [interval, setIntervalPay] = useState<string>("");

  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [pkStripeKey, setPKStripeKey] = useState<string>("");
  const [billingData, setBillingData] = useState<Array<IBilling>>([
    {
      date: "",
      description: "",
      amount: null,
      subscription_interval: null,
      pay_period: null,
      subscription_quantity: null,
      client_name: "",
      doctor_name: "",
      paid: null,
      date_next_payment_attempt: null,
    },
  ]);
  const intervalPay = ["2-week", "1-month"];
  const typesPay = ["one time", "requirement"];

  const getClient = async () => {
    try {
      const response = await instance().get(
        `api/client/client_intake/${api_key}`
      );
      setClient(response.data);
    } catch (error: any) {
      console.log("GET: error message account =>  ", error.message);
      console.log("error response data account => ", error.response.data);
      throw new Error(error.message);
    }
  };
  const getHistoryVisits = async () => {
    try {
      const response = await instance().get(
        `api/client/visit_history/${api_key}`
      );
      setVisits(response.data);
    } catch (error: any) {
      console.log("GET: error message account visits =>  ", error.message);
      console.log(
        "error response data account visits => ",
        error.response.data
      );
      throw new Error(error.message);
    }
  };

  const getBilling = async () => {
    try {
      const response = await instance().get(
        `api/client/billing_history/${api_key}`
      );
      console.log("Account: getBilling => ", response.data);
      setBillingData(response.data);
    } catch (error: any) {
      console.log("GET: error message billing history =>  ", error.message);
      console.log(
        "error response data billing history => ",
        error.response.data
      );
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getClient();
    getHistoryVisits();
  }, [api_key]);

  useEffect(() => {
    getBilling();
  }, [api_key, amount]);

  useEffect(() => {
    if (startTime && endTime) {
      const dateStart = new Date(
        startTime.toString().replace(/GMT.*$/, "GMT+0000")
      ).toISOString();
      const fullStartDate = dateStart
        .replace("T", " ")
        .replace(".", " ")
        .split(" ");
      const dStart = fullStartDate[0].split("-");
      const fullTime = fullStartDate[1];
      const startDateToBack = `${dStart[1]}/${dStart[2]}/${dStart[0]}, ${fullTime}`;

      const dateEnd = new Date(
        endTime.toString().replace(/GMT.*$/, "GMT+0000")
      ).toISOString();
      const fullEndDate = dateEnd
        .replace("T", " ")
        .replace(".", " ")
        .split(" ");
      const dEnd = fullEndDate[0].split("-");
      const fullTimeEnd = fullEndDate[1];
      const endDateToBack = `${dEnd[1]}/${dEnd[2]}/${dEnd[0]}, ${fullTimeEnd}`;

      const dataToFilterVisit = {
        api_key: api_key,
        start_time: startDateToBack,
        end_time: endDateToBack,
      };

      const filterVisits = async () => {
        const filteredVisits = await clientApi.filteredHistoryVisits(
          dataToFilterVisit
        );
        console.log("Account: filteredVisits => ", filteredVisits);
        setFilterVisits(filteredVisits);
      };
      filterVisits();
    }
  }, [startTime, endTime]);

  const getStripeKey = async () => {
    const stripeKeys = await instance().get(`api/client/get_secret`);
    // console.log("stripeKeys", stripeKeys);
    const res = await loadStripe(stripeKeys.data.pk_test);
    setStripe(res);
    setPKStripeKey(stripeKeys.data.pk_test);
  };

  useEffect(() => {
    getStripeKey();
  }, []);

  const appearance: any = {
    theme: "night",
  };
  const options: any = {
    pkStripeKey,
    appearance,
  };
  const setStatuses = () => {
    setType("");
    setAmount("");
  };

  useEffect(() => {
    if (type === "one time") {
      setNumber("1");
      setIntervalPay("");
    } else {
      setNumber("");
    }
    if (interval !== "") {
      setNumber("");
      setType("requirements");
    }
  }, [type, interval]);

  console.log("Account billingData => ", billingData);

  return (
    <>
      <div className="accountContainer">
        <div className="clientInfo">
          <div className="clientInfo_tittle">Client info</div>
          <div className="clientInfoAccount">
            <div className="infoContainer">
              <div className="info_title">Name </div>
              <div className="clientInfo_text">
                {client.firstName} {client.lastName}
              </div>
            </div>
            <div className="info">
              <div>DOB: </div>
              <div className="clientInfo_text">{client.birthday}</div>
            </div>
            <div className="info">
              <div>Address: </div>
              <div className="clientInfo_text">{client.address}</div>
            </div>
            <div className="info">
              <div>City: </div>
              <div className="clientInfo_text">{client.city}</div>
            </div>
            <div className="info">
              <div>State: </div>
              <div className="clientInfo_text">{client.state}</div>
            </div>
            <div className="info">
              <div>Zip: </div>
              <div className="clientInfo_text">{client.zip}</div>
            </div>
            <div className="info">
              <div>Phone: </div>
              <div className="clientInfo_text">{client.phone}</div>
            </div>
            <div className="info">
              <div>Email: </div>
              <div className="clientInfo_text">{client.email}</div>
            </div>
          </div>
        </div>
        <div className="visitHistory">
          <div className="clientInfo_tittle">Visit History</div>
          <div className="visitHistory_table">
            <table className="table">
              <tr className="tableHeader">
                <th className="date">Date</th>
                <th className="service">Service</th>
                <th className="practitioner">Practitioner</th>
              </tr>
              {filterVisits && startTime && endTime
                ? filterVisits.map((visit, index) => {
                    return (
                      <tr key={index}>
                        <td>{visit.date}</td>
                        <td>Upgrade</td>
                        <td>{visit.doctor_name}</td>
                      </tr>
                    );
                  })
                : visits.map((visit, index) => {
                    return (
                      <tr key={index}>
                        <td>{visit.date}</td>
                        <td>Upgrade</td>
                        <td>{visit.doctor_name}</td>
                      </tr>
                    );
                  })}
            </table>
          </div>
          <div className="visitHistory_inputs">
            <div className="visitHistory_inputsContainer">
              <div className="visitHistory_inputContainer">
                <div className="inputTitle">Start date</div>
                <div className="datetimeContainer">
                  <DatePicker
                    dateFormat="MM/dd/yyyy h:mm aa"
                    className="dataInput"
                    selected={startTime}
                    onChange={(data) => setStartTime(data)}
                    selectsStart
                    showTimeInput
                    startDate={startTime}
                    endDate={endTime}
                    isClearable
                    placeholderText="Start date"
                  />
                </div>
              </div>
              <div className="visitHistory_inputContainer">
                <div className="inputTitle">End date</div>
                <div className="datetimeContainer">
                  <DatePicker
                    dateFormat="MM/dd/yyyy h:mm aa"
                    className="dataInput"
                    selected={endTime}
                    onChange={(data) => setEndTime(data)}
                    selectsEnd
                    showTimeInput
                    startDate={startTime}
                    endDate={endTime}
                    minDate={startTime}
                    isClearable
                    placeholderText="End date"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="billing">
          <div className="clientInfo_tittle">Billing</div>
          <div className="billing_table">
            <table className="table">
              <tr className="tableHeader">
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
              {billingData[0].amount &&
                billingData.map((billing, index) => {
                  return (
                    <tr key={index}>
                      {billing.paid === false ? (
                        <td>{billing.date_next_payment_attempt}</td>
                      ) : (
                        <td>{billing.date}</td>
                      )}

                      <td>${billing.amount}</td>
                      {billing.paid === false ? (
                        <td style={{ color: "red" }}>Failed</td>
                      ) : (
                        <td style={{ color: "green" }}>Paid</td>
                      )}
                    </tr>
                  );
                })}
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
                  // onChange={(e) => setType(e.target.value)}
                />
                <div className="selectContainer">
                  {typesPay.map((type, index) => {
                    return (
                      <div key={index} onClick={(e) => setType(type)}>
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
                  // onChange={(e) => setIntervalPay(e.target.value)}
                />
                <div className="selectContainer">
                  {intervalPay.map((interval, index) => {
                    return (
                      <div
                        key={index}
                        onClick={(e) => setIntervalPay(interval)}
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
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

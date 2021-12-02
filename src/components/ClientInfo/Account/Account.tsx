import React, { ReactElement, useEffect, useState } from "react";
import "./account.css";
import { useLocation } from "react-router-dom";
import { instance } from "../../../api/axiosInstance";
import DatePicker from "react-datepicker";
import StripeCheckout from "react-stripe-checkout";
import brain from "../../../images/brain.svg";
import { Client, clientApi, ClientDefault } from "../../../api/clientApi";
import "react-datepicker/dist/react-datepicker.css";
// import { loadStripe } from "@stripe/stripe-js";

interface IVisit {
  date: string;
  doctor_name: string;
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

  const [pkStripeKey, setPKStripeKey] = useState<string>("");
  const [skStripeKey, setSKStripeKey] = useState<string>("");

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
  // const stripePromise = loadStripe(pkStripeKey);

  const getStripeKey = async () => {
    const stripeKeys = await instance().get(`api/client/get_secret`);
    console.log("stripeKeys", stripeKeys);
    // stripePromise = loadStripe(stripeKeys.data.pk_test);
    setPKStripeKey(stripeKeys.data.pk_test);
    setSKStripeKey(stripeKeys.data.sk_test);
  };

  useEffect(() => {
    getClient();
    getHistoryVisits();
  }, [api_key]);

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

  useEffect(() => {
    getStripeKey();
  }, []);

  const handleToken = (data: any): void => {
    console.log("Account: data for stripe => ", data);

    const sessionData = {
      id: data.id,
      description: type,
      amount: Number(amount) * 100,
    };

    try {
      const stripeSession = async () => {
        const session = await clientApi.createStripeSession(sessionData);
        console.log("Account: stripe session => ", session);
      };
      stripeSession();
    } catch (e: any) {
      console.log("Account: stripe error message", e.message);
    }
  };

  const appearance = {
    theme: "night",
  };
  const options: any = {
    skStripeKey,
    appearance,
  };

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
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>02/12/2020</td>
                  <td>$580</td>
                  <td>Paid</td>
                </tr>
                <tr>
                  <td>02/12/2020</td>
                  <td>$580</td>
                  <td>Failed</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={1}>
                    <div className="visitHistory_inputContainer">
                      <div className="inputTitle">Type</div>
                      <div>
                        <input
                          type="text"
                          placeholder=""
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        />
                      </div>
                    </div>
                  </td>
                  <td colSpan={2}>
                    <div className="visitHistory_inputContainer">
                      <div className="inputTitle">Amount</div>
                      <div>
                        <input
                          type="number"
                          placeholder=""
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <div className="visitHistory_inputContainer">
                      {pkStripeKey !== "" && (
                        <StripeCheckout
                          name="medical services"
                          // description="Payment for medical services"
                          image={brain}
                          ComponentClass="div"
                          panelLabel="Pay"
                          amount={Number(amount) * 100} // cents
                          currency="USD"
                          stripeKey={pkStripeKey}
                          email="info@vidhub.co"
                          token={handleToken}
                          // reconfigureOnUpdate={false}
                        >
                          {amount === "" ? (
                            <button disabled className="completeBtnDisable">
                              Pay with Card
                            </button>
                          ) : (
                            <button className="completeBtn">
                              Pay with Card
                            </button>
                          )}
                        </StripeCheckout>
                      )}
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

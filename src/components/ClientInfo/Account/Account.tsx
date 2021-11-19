import React, { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { instance } from "../../../api/axiosInstance";
import { Client, ClientDefault } from "../../../api/clientApi";
import "./account.css";

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

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const getClient = async () => {
    try {
      const response = await instance().get(
        `api/client/client_intake/${api_key}`
      );
      console.log("GET: account => ", response.data);
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
      console.log("GET: account visits=> ", response.data);
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

  useEffect(() => {
    getClient();
    getHistoryVisits();
  }, [api_key]);

  console.log("account history visits", visits);

  const dataForBack = {
    api_key: api_key,
    start_time: startTime,
    end_time: endTime,
  };

  console.log("Account history visit dataForBack", dataForBack);

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
              {/* <thead className="thead">
                <tr>
                  <th className="date">Date</th>
                  <th className="service">Service</th>
                  <th className="practitioner">Practitioner</th>
                </tr>
              </thead> */}
              {/* <tbody className="tbody"> */}
              <tr className="tableHeader">
                <th className="date">Date</th>
                <th className="service">Service</th>
                <th className="practitioner">Practitioner</th>
              </tr>
              {visits.map((visit) => {
                return (
                  <tr>
                    <td>{visit.date}</td>
                    <td>Upgrade</td>
                    <td>{visit.doctor_name}</td>
                  </tr>
                );
              })}

              {/* {visits.map((visit) => {
                return (
                  <tr>
                    <td>{visit.date}</td>
                    <td>Upgrade</td>
                    <td>{visit.doctor_name}</td>
                  </tr>
                );
              })} */}
              {/* </tbody> */}
            </table>
          </div>
          <div className="visitHistory_inputs">
            <div className="visitHistory_inputsContainer">
              <div className="visitHistory_inputContainer">
                <div className="inputTitle">Start date</div>
                <div className="datetimeContainer">
                  <input
                    type="datetime-local"
                    placeholder=""
                    value={startTime}
                    onChange={() => {
                      setStartTime(startTime);
                    }}
                  />
                </div>
              </div>
              <div className="visitHistory_inputContainer">
                <div className="inputTitle">End date</div>
                <div className="datetimeContainer">
                  <input
                    type="datetime-local"
                    placeholder=""
                    value={endTime}
                    onChange={() => {
                      setEndTime(endTime);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* <div className="visitHistory_inputContainer">
                <div className="inputTitle">Remaining</div>
                <div><input type="text" placeholder=""/></div>
              </div> */}
            <div className="btnComplete">Get visits</div>
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
                  <td>
                    <div className="visitHistory_inputContainer">
                      <div className="inputTitle">Type</div>
                      <div>
                        <input type="text" placeholder="" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="visitHistory_inputContainer">
                      <div className="inputTitle">Number</div>
                      <div>
                        <input type="text" placeholder="" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="visitHistory_inputContainer">
                      <div className="inputTitle">Amount</div>
                      <div>
                        <input type="text" placeholder="" />
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="billing_form">
            <div className="billing_formInputs">
              <div className="billing_formBlock">
                <div className="billing_formBlockInput">
                  <div className="titleAccount">Card number</div>
                  <div className="inputContainer">
                    <input type="" placeholder="" />
                  </div>
                </div>
                <div className="billing_formBlockInput">
                  <div className="titleAccount">Expiration</div>
                  <div className="inputContainer">
                    <input type="" placeholder="" />
                  </div>
                </div>
              </div>

              <div className="billing_formBlock">
                <div className="billing_formBlockInput">
                  <div className="titleAccount">CVV</div>
                  <div className="inputContainer">
                    <input type="" placeholder="" />
                  </div>
                </div>
                <div className="billing_formBlockInput">
                  <div className="titleAccount">Zip</div>
                  <div className="inputContainer">
                    <input type="" placeholder="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="btnComplete">COMPLETE</div>
          </div>
        </div>
      </div>
    </>
  );
}

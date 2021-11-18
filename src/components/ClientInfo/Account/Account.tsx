import React, { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { instance } from "../../../api/axiosInstance";
import { Client, ClientDefault } from "../../../api/clientApi";
import "./account.css";

export default function Account(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];

  const [client, setClient] = useState<Client>(ClientDefault);

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

  useEffect(() => {
    getClient();
  }, [api_key]);

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
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Service</th>
                  <th>Practitioner</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>02/12/2020</td>
                  <td>Upgrade</td>
                  <td>Trevor Colm</td>
                </tr>
                <tr>
                  <td>02/12/2020</td>
                  <td>Upgrade</td>
                  <td>Trevor Colm</td>
                </tr>
                <tr>
                  <td>02/12/2020</td>
                  <td>Upgrade</td>
                  <td>Trevor Colm</td>
                </tr>
                <tr>
                  <td>02/12/2020</td>
                  <td>Upgrade</td>
                  <td>Trevor Colm</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="visitHistory_inputs">
            <div className="visitHistory_inputContainer">
              <div className="inputTitle">Start date</div>
              <div>
                <input type="datetime-local" placeholder="" />
              </div>
            </div>
            <div className="visitHistory_inputContainer">
              <div className="inputTitle">End date</div>
              <div>
                <input type="datetime-local" placeholder="" />
              </div>
            </div>
            {/* <div className="visitHistory_inputContainer">
                <div className="inputTitle">Remaining</div>
                <div><input type="text" placeholder=""/></div>
              </div> */}
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

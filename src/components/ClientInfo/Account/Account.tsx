import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import NavBar from '../../NavBar/NavBar';
import MenuInfoPatient from '../MenuInfoPatient/MenuInfoPatient';
import { instance } from '../../../api/axiosInstance';
import './account.css';


export default function Account(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];



  useEffect(() => {
    // getClientIntake();
  }, []);


  console.log("location in ClientInfo => ", location.pathname);


  return (
    <>
        <NavBar />
        <MenuInfoPatient api_key={api_key} firstName={'client.firstName'}/>
        <div className="accountContainer">
          <div className="clientInfo">
            <div className="clientInfo_tittle">Client info</div>
            <div className="clientInfoAccount">
              <div className="info_title">Name</div>
              <div className="info"><div>DOB: </div><div className="clientInfo_text"></div></div>
              <div className="info"><div>Address: </div><div className="clientInfo_text">Street</div></div>
              <div className="info"><div>City: </div><div className="clientInfo_text"></div></div>
              <div className="info"><div>State: </div><div className="clientInfo_text"></div></div>
              <div className="info"><div>Zip: </div><div className="clientInfo_text"></div></div>
              <div className="info"><div>Phone: </div><div className="clientInfo_text"></div></div>
              <div className="info"><div>Email: </div><div className="clientInfo_text"></div></div>
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
                <div className="inputTitle">Plan</div>
                <div><input type="text" placeholder=""/></div>
              </div>
              <div className="visitHistory_inputContainer">
                <div className="inputTitle">Frequency</div>
                <div><input type="text" placeholder=""/></div>
              </div>
              <div className="visitHistory_inputContainer">
                <div className="inputTitle">Remaining</div>
                <div><input type="text" placeholder=""/></div>
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
                      <td>
                        <div className="visitHistory_inputContainer">
                          <div className="inputTitle">Type</div>
                          <div><input type="text" placeholder=""/></div>
                        </div>
                      </td>
                      <td>
                        <div className="visitHistory_inputContainer">
                          <div className="inputTitle">Number</div>
                          <div><input type="text" placeholder=""/></div>
                        </div>
                      </td>
                      <td>
                        <div className="visitHistory_inputContainer">
                          <div className="inputTitle">Amount</div>
                          <div><input type="text" placeholder=""/></div>
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
                    <div className="title">Card number</div>
                    <div className="inputContainer"><input type="" placeholder=""/></div>
                  </div>
                  <div className="billing_formBlockInput">
                    <div className="title">Expiration</div>
                    <div  className="inputContainer"><input type="" placeholder=""/></div>
                  </div>
                </div>

                <div className="billing_formBlock">
                    <div className="billing_formBlockInput">
                      <div className="title">CVV</div>
                      <div  className="inputContainer"><input type="" placeholder=""/></div>
                    </div>
                    <div className="billing_formBlockInput">
                      <div className="title">Zip</div>
                      <div  className="inputContainer"><input type="" placeholder=""/></div>
                    </div>
                </div>
              </div>
              <div className="btnComplete">
                COMPLETE
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

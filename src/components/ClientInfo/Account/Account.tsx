import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import NavBar from '../../NavBar/NavBar';
import MenuInfoPatient from '../MenuInfoPatient/MenuInfoPatient';
import { clientApi, Client } from '../../../api/clientApi';
import './account.css';



const ClientDefault = {
  api_key: "",
  firstName: "",
  lastName: "",
  birthday: "",
  address: "",
  city: "",
  state: "",
  zip: 0,
  phone: "",
  email: "",
  referring: "",
  // conditions: list[str]
  otherCondition: "",
  // diseases: list[str]
  medications: "",
  covidTestedPositive: null,
  covidVaccine:  null,
  stressfulLevel: 0,
  consentMinorChild: false,
  relationshipChild: "",
};


export default function Account(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  // const [client, setClient] = useState<Client>();


  // useEffect(() => {
  //   const clientDB = clientApi.getClient(api_key);
  //   // setClient(clientDB);
  // }, []);

  // console.log("client intake => ", client);

  console.log("location in ClientInfo => ", location.pathname);


  return (
    <>
        <NavBar />
        <MenuInfoPatient api_key={api_key} name={'client.firstName'}/>

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
                  <tr>
                    <th>Date</th>
                    <th>Service</th>
                    <th>Practitioner</th>
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
                  <tr>
                    <td>02/12/2020</td>
                    <td>Upgrade</td>
                    <td>Trevor Colm</td>
                  </tr>
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
            <div className="billing_table"></div>
            <div className="billing_inputs"></div>
            <div className="billing_form">

            </div>
          </div>

        </div>

    </>
  )
}

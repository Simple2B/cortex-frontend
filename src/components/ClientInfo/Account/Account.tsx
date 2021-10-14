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
  const [client, setClient] = useState<Client>();


  useEffect(() => {
    const clientDB = clientApi.getClient(api_key);
    // setClient(clientDB);
  }, []);

  console.log("client intake => ", client);

  console.log("location in ClientInfo => ", location.pathname);


  return (
    <>
        <NavBar />
        <MenuInfoPatient api_key={api_key} name={'client.firstName'}/>

        <div>
          Account
        </div>

    </>
  )
}

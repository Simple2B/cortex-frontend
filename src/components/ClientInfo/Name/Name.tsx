import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import NavBar from '../../NavBar/NavBar';
import MenuInfoPatient from '../MenuInfoPatient/MenuInfoPatient';
import { Client, ClientDefault } from '../../../api/clientApi';
import {instance} from '../../../api/axiosInstance';
import './name.css';
// import { ReactComponent as IntakeDashboard } from '../../../images/intake_dashboard.svg';
// import { ReactComponent as IntakeAlpha } from '../../../images/intake_alpha.svg';


export default function Intake(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<Client>(ClientDefault);
//   const [activeBtn, setActiveBtn] = useState("Health HX");

  const getClient = async () => {
    try {
      const response = await instance()
      .get(`api/client/client_intake/${api_key}`);
      console.log("GET: client_intake => ", response.data);
      setClient(response.data);
      return response.data
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log('GET: error message get_client_intake =>  ', error.message);
      console.log('error response data get_client_intake => ', error.response.data);
      throw new Error(error.message);
    };
  }

  useEffect(() => {
    getClient()
  }, []);

//   const handleChangeBtn = (e: any) => {
//     setActiveBtn(e.currentTarget.innerHTML);
//   }


  return (
    <>
        <NavBar />
        <MenuInfoPatient api_key={api_key} firstName={client.firstName}/>

    </>
  )
}

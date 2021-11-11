import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import './menuInfoPatient.css';
import { NavLink } from 'react-router-dom';
import { instance } from '../../../api/axiosInstance';
import { Client, ClientDefault } from '../../../api/clientApi';


interface MyProps {
  api_key: string,
  firstName: string,
  lastName: string,
}

export default function MenuInfoPatient(): ReactElement {
    //assigning location variable
    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

    const splitLocationForApi = location.pathname.split("/");
    const api_key = splitLocationForApi[splitLocationForApi.length - 2];
    const [client, setClient] = useState<Client>(ClientDefault);
    console.log("props.name ", client.firstName );

      const getClient = async () => {
        try {
          const response = await instance()
          .get(`api/client/client_intake/${api_key}`);
          console.log("GET: client_intake name => ", response.data);
          setClient(response.data);
          return response.data
        } catch (error: any) {
          // place to handle errors and rise custom errors
          console.log('GET: error message get_client_intake name =>  ', error.message);
          console.log('error response data get_client_intake name => ', error.response.data);
          throw new Error(error.message);
        };
      }

      useEffect(() => {
        getClient()
      }, [api_key]);

  return (
    <div className="menuInfoPatient_container">
        <div className="menuInfoPatient">
            <div className={splitLocation[splitLocation.length - 1] === `${client.firstName}` ? "active" : "menuInfoPatientItem"}>
              <NavLink to={`/${api_key}/${client.firstName}`} className="item">{ client.firstName + " " + client.lastName.split("")[0] + '.'}</NavLink>
            </div>
            <div className={splitLocation[splitLocation.length - 1] === "care_plane" ? "active" : "menuInfoPatientItem"}>
              <NavLink to={`/${api_key}/care_plane`}>Care Plan</NavLink>
            </div>
            <div className={splitLocation[splitLocation.length - 1] === "notes" ? "active" : "menuInfoPatientItem"}>
              <NavLink to={`/${api_key}/notes`}>Notes</NavLink>
            </div>
            <div className={splitLocation[splitLocation.length - 1] === 'intake' ? "active" : "menuInfoPatientItem"}>
              <NavLink to={`/${api_key}/intake`}>Intake</NavLink>
            </div>
            <div className={splitLocation[splitLocation.length - 1] === "report" ? "active" : "menuInfoPatientItem"}>
              <NavLink to={`/${api_key}/report`}>Report</NavLink>
            </div>
            <div className={splitLocation[splitLocation.length - 1] === "account" ? "active" : "menuInfoPatientItem"}>
              <NavLink to={`/${api_key}/account`}>Account</NavLink>
            </div>
        </div>
    </div>
  )
}

import React, { ReactElement, useEffect, useState } from 'react';
import "./name.css";
import { useLocation } from "react-router-dom";
import NavBar from '../../NavBar/NavBar';
import MenuInfoPatient from '../MenuInfoPatient/MenuInfoPatient';
import { Client, ClientDefault } from '../../../api/clientApi';
import {instance} from '../../../api/axiosInstance';


export default function Name(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<Client>(ClientDefault);

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
  }, []);


  return (
    <>
        <NavBar />
        <MenuInfoPatient api_key={api_key} firstName={client.firstName}/>

        <div className="nameContainer">
            <div className="nameContainer_arousal">

                <div className="title">Arousal</div>
                <div className="overAroused">
                    <div className="overAroused_tittle">
                        OVER AROUSED
                    </div>

                    <div className="overAroused_content">

                    </div>
                </div>

                <div className="containerComplete">
                    <div className="containerComplete_points">

                    </div>
                    <div className="containerComplete_btn">

                    </div>
                </div>
            </div>

            <div className="nameContainer_brain">

            </div>
        </div>

    </>
  )
}
